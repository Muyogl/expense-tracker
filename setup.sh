#!/bin/bash

# Setup script untuk persiapan deployment
echo "🔧 Setting up project for Vercel deployment..."

# Make deploy script executable
chmod +x deploy.sh

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install API dependencies
echo "📦 Installing API dependencies..."
cd api
npm install
cd ..

echo "✅ Setup completed!"
echo ""
echo "Next steps:"
echo "1. Login to Vercel: npx vercel login"
echo "2. Run deployment: ./deploy.sh"
echo ""
echo "For local development:"
echo "- Backend: npm run dev"
echo "- Frontend: cd frontend && npm run dev" 
