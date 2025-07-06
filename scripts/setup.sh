#!/bin/bash

# WePro Application Setup Script
echo "🚀 Setting up WePro Application..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "✅ .env file created. Please edit it with your configuration."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/logs
mkdir -p backend/uploads
mkdir -p web/public
mkdir -p ai-service/logs

# Set up database
echo "🗄️ Setting up database..."
docker-compose up -d postgres redis

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🔧 Running database migrations..."
docker-compose exec postgres psql -U postgres -d wepro_db -f /docker-entrypoint-initdb.d/schema.sql

echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Run 'docker-compose up' to start all services"
echo "3. Access the application at:"
echo "   - Backend API: http://localhost:3000"
echo "   - Web App: http://localhost:3001"
echo "   - AI Service: http://localhost:8000"
echo ""
echo "🔧 Development commands:"
echo "  - Start all services: docker-compose up"
echo "  - Start specific service: docker-compose up backend"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop all services: docker-compose down" 