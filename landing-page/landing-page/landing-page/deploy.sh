#!/bin/bash

# Landing Page Deployment Script
# 100000MRR Landing Page Quick Deploy

set -e

echo "==================================="
echo "  100000MRR Landing Page Deploy"
echo "==================================="
echo ""

# Configuration
REPO_NAME="100000mrr-landing"
BRANCH="main"
DEPLOY_METHOD="${1:-github}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running from correct directory
if [ ! -f "index.html" ]; then
    echo -e "${RED}Error: index.html not found${NC}"
    echo "Please run this script from the landing-page directory"
    exit 1
fi

echo -e "${YELLOW}Deploy method: ${DEPLOY_METHOD}${NC}"
echo ""

# GitHub Pages Deployment
if [ "$DEPLOY_METHOD" == "github" ] || [ "$DEPLOY_METHOD" == "all" ]; then
    echo "=== GitHub Pages Deployment ==="
    echo ""

    # Check if git is installed
    if ! command -v git &> /dev/null; then
        echo -e "${RED}Error: git is not installed${NC}"
        exit 1
    fi

    # Initialize git repo if not exists
    if [ ! -d ".git" ]; then
        echo "Initializing git repository..."
        git init
        git add index.html
        git commit -m "Initial landing page deployment"
        git branch -M $BRANCH
    fi

    # Check if remote exists
    if ! git remote | grep -q origin; then
        echo ""
        echo -e "${YELLOW}Please create a repository on GitHub:${NC}"
        echo "  https://github.com/new"
        echo "  Repository name: $REPO_NAME"
        echo "  Make it public (for free GitHub Pages)"
        echo ""
        read -p "Enter your GitHub username: " GITHUB_USER
        git remote add origin "git@github.com:${GITHUB_USER}/${REPO_NAME}.git"
    fi

    # Push to GitHub
    echo "Pushing to GitHub..."
    git push -u origin $BRANCH

    echo ""
    echo -e "${GREEN}✓ Deployed to GitHub${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://github.com/${GITHUB_USER:-yourusername}/${REPO_NAME}/settings/pages"
    echo "2. Under 'Source', select: Deploy from a branch"
    echo "3. Branch: main, Folder: / (root)"
    echo "4. Click Save"
    echo "5. Your site will be live at: https://${GITHUB_USER:-yourusername}.github.io/${REPO_NAME}/"
    echo ""
fi

# Vercel Deployment
if [ "$DEPLOY_METHOD" == "vercel" ] || [ "$DEPLOY_METHOD" == "all" ]; then
    echo "=== Vercel Deployment ==="
    echo ""

    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}Vercel CLI not found. Installing...${NC}"
        npm install -g vercel
    fi

    echo "Deploying to Vercel..."
    vercel --prod

    echo ""
    echo -e "${GREEN}✓ Deployed to Vercel${NC}"
    echo ""
fi

# Netlify Deployment (manual instructions)
if [ "$DEPLOY_METHOD" == "netlify" ] || [ "$DEPLOY_METHOD" == "all" ]; then
    echo "=== Netlify Deployment ==="
    echo ""
    echo "Netlify supports drag-and-drop deployment:"
    echo ""
    echo "1. Go to https://app.netlify.com/drop"
    echo "2. Drag the landing-page folder to the drop zone"
    echo "3. Your site will be live instantly"
    echo ""
    echo "Or use Netlify CLI:"
    echo "  npm install -g netlify-cli"
    echo "  netlify deploy --prod"
    echo ""
fi

echo "==================================="
echo -e "${GREEN}Deployment Complete!${NC}"
echo "==================================="
echo ""
echo "Post-Deployment Checklist:"
echo "□ Verify page loads on mobile and desktop"
echo "□ Test all links and CTA buttons"
echo "□ Set up analytics (Google Analytics / 百度统计)"
echo "□ Add favicon"
echo "□ Test page speed (target: <3s)"
echo ""
