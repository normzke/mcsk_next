#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Load environment variables
if [ -f .env.production ]; then
  echo "Loading production environment variables..."
  export $(cat .env.production | xargs)
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the application
echo "🔨 Building application..."
npm run build

# Run tests if they exist
if [ -f "package.json" ] && grep -q "\"test\":" "package.json"; then
  echo "🧪 Running tests..."
  npm test
fi

# Create deployment directory
DEPLOY_DIR="deploy"
echo "📁 Creating deployment directory..."
rm -rf $DEPLOY_DIR
mkdir -p $DEPLOY_DIR

# Copy necessary files
echo "📋 Copying files..."
cp -r .next $DEPLOY_DIR/
cp -r public $DEPLOY_DIR/
cp package.json $DEPLOY_DIR/
cp package-lock.json $DEPLOY_DIR/
cp next.config.js $DEPLOY_DIR/

# Copy environment file if it exists
if [ -f .env.production ]; then
  cp .env.production $DEPLOY_DIR/.env
fi

# Create version file
echo "📝 Creating version file..."
git rev-parse HEAD > $DEPLOY_DIR/version.txt
date >> $DEPLOY_DIR/version.txt

# Zip the deployment package
echo "🗜️ Creating deployment package..."
cd $DEPLOY_DIR
zip -r ../deploy.zip ./*
cd ..

echo "✅ Deployment package created successfully!"
echo "📦 Deploy package: deploy.zip"
echo "📄 Version information saved in version.txt"

# Optional: Upload to server
if [ ! -z "$DEPLOY_SERVER" ]; then
  echo "📤 Uploading to server..."
  scp deploy.zip $DEPLOY_SERVER:/tmp/
  ssh $DEPLOY_SERVER "cd /var/www/mcsk && \
    unzip -o /tmp/deploy.zip && \
    npm install --production && \
    pm2 restart mcsk-next"
  echo "🎉 Deployment completed!"
fi 