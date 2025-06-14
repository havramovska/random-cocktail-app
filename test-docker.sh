#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🚀 Starting Docker setup tests..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."
if ! command_exists docker; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

if ! command_exists docker-compose; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites met${NC}"

# Test development environment
echo -e "\n🔧 Testing development environment..."
docker compose build dev
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Development image built successfully${NC}"
else
    echo -e "${RED}❌ Failed to build development image${NC}"
    exit 1
fi

# Start development container in background
docker compose up -d dev
sleep 10 # Wait for container to start

# Check if development server is running
if curl -s http://localhost:4200 > /dev/null; then
    echo -e "${GREEN}✅ Development server is running${NC}"
else
    echo -e "${RED}❌ Development server is not accessible${NC}"
    docker compose down
    exit 1
fi

# Test health checks
echo -e "\n🏥 Testing health checks..."
sleep 5 # Wait for health checks to run

# Check development health
DEV_HEALTH=$(docker inspect --format='{{.State.Health.Status}}' $(docker compose ps -q dev))
if [ "$DEV_HEALTH" = "healthy" ]; then
    echo -e "${GREEN}✅ Development container is healthy${NC}"
else
    echo -e "${RED}❌ Development container health check failed: $DEV_HEALTH${NC}"
fi

# Cleanup
echo -e "\n🧹 Cleaning up..."
docker compose down
echo -e "${GREEN}✅ Cleanup completed${NC}"

echo -e "\n✨ All tests completed!" 