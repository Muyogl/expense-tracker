#!/bin/bash

# Deployment script untuk Vercel
echo "🚀 Starting deployment process..."

# Install dependencies di root
echo "📦 Installing root dependencies..."
npm install

# Install dependencies di frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Build frontend
echo "🏗️ Building frontend..."
npm run build:frontend

# Deploy ke Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment completed!"
echo "🔗 Your app should be available at the URL provided by Vercel" 
