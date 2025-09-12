#!/bin/bash

# Install production dependencies
echo "Installing production dependencies..."
npm install --save @upstash/redis sharp imagemin imagemin-mozjpeg imagemin-pngquant imagemin-webp imagemin-svgo

# Install development dependencies
echo "Installing development dependencies..."
npm install --save-dev @types/node @types/sharp @types/imagemin @types/imagemin-mozjpeg @types/imagemin-pngquant @types/imagemin-webp @types/imagemin-svgo

echo "Dependencies installed successfully!"
