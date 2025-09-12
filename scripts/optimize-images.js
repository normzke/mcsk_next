const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');
const imageminSvgo = require('imagemin-svgo');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);

// Configuration
const SRC_DIR = path.join(__dirname, '../public');
const DEST_DIR = path.join(__dirname, '../public/optimized');
const QUALITY = 85; // Image quality (0-100)
const MAX_WIDTH = 1920; // Maximum width for resizing
const ENABLE_WEBP = true; // Generate WebP versions

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];

// Create optimized directory if it doesn't exist
async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }
}

// Process a single image file
async function processImage(filePath, relativePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath, ext);
  const destPath = path.join(DEST_DIR, relativePath);
  
  await ensureDir(path.dirname(destPath));
  
  try {
    // Skip if already processed
    if (fs.existsSync(`${destPath}.webp`) && fs.existsSync(destPath)) {
      console.log(`Skipping already processed: ${filePath}`);
      return;
    }
    
    console.log(`Processing: ${filePath}`);
    
    // Process with Sharp for resizing and format conversion
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if needed
    if (metadata.width > MAX_WIDTH) {
      image.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    
    // Save original format
    await image.toFile(destPath);
    
    // Optimize the image
    await imagemin([destPath], {
      destination: path.dirname(destPath),
      plugins: [
        imageminMozjpeg({ quality: QUALITY }),
        imageminPngquant({
          quality: [0.6, 0.8],
          speed: 1,
        }),
        imageminSvgo({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
            { removeDimensions: true },
          ],
        }),
      ],
    });
    
    // Generate WebP version if enabled
    if (ENABLE_WEBP && !filePath.endsWith('.svg')) {
      const webpPath = `${destPath}.webp`;
      await image.toFormat('webp', { quality: QUALITY }).toFile(webpPath);
      
      // Optimize WebP
      await imagemin([webpPath], {
        destination: path.dirname(webpPath),
        plugins: [imageminWebp({ quality: QUALITY })],
      });
    }
    
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Recursively process directory
async function processDirectory(dir, relativePath = '') {
  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await stat(filePath);
    const newRelativePath = path.join(relativePath, file);
    
    if (fileStat.isDirectory()) {
      await processDirectory(filePath, newRelativePath);
    } else if (IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())) {
      await processImage(filePath, newRelativePath);
    }
  }
}

// Main function
async function main() {
  console.log('Starting image optimization...');
  
  try {
    await ensureDir(DEST_DIR);
    await processDirectory(SRC_DIR);
    console.log('Image optimization completed successfully!');
  } catch (error) {
    console.error('Error during image optimization:', error);
    process.exit(1);
  }
}

// Run the script
main();
