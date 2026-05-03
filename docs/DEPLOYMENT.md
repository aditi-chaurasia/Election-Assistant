# Deployment Guide

## Overview

This guide covers deploying the Election Assistant application to production environments.

## Deployment Architecture

```
┌─────────────────┐
│   Firebase      │
│   Hosting       │
│  (Frontend)     │
└────────┬────────┘
         │
         │ HTTPS
         │
    ┌────▼────────────┐
    │  Google Cloud   │
    │   Run Service   │
    │   (Backend)     │
    └────┬────────────┘
         │
         │ Firestore
         │ API
         │
    ┌────▼────────────┐
    │  Google Cloud   │
    │   Firestore     │
    │   Database      │
    └─────────────────┘
```

## Prerequisites

- Google Cloud Account with billing enabled
- Firebase Project
- gcloud CLI installed
- Node.js 16+ and npm 8+
- Docker (optional, for container builds)

## Step 1: Set Up Firebase Project

### 1.1 Create Firebase Project
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create new project
firebase init
```

### 1.2 Configure Firestore
```bash
# In Firebase Console:
# 1. Go to Firestore Database
# 2. Create database in production mode
# 3. Set up security rules
```

### 1.3 Set Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User document
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Public election data
    match /election_data/{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Step 2: Deploy Backend to Cloud Run

### 2.1 Create Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source
COPY dist ./dist

# Expose port
EXPOSE 5000

# Start app
CMD ["node", "dist/server.js"]
```

Create `backend/.dockerignore`:
```
node_modules
npm-debug.log
.env
.git
.env.local
```

### 2.2 Build and Push to Google Container Registry

```bash
cd backend

# Build TypeScript
npm run build

# Build Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/election-backend:latest .

# Configure gcloud
gcloud auth configure-docker

# Push to GCR
docker push gcr.io/YOUR_PROJECT_ID/election-backend:latest
```

### 2.3 Deploy to Cloud Run

```bash
gcloud run deploy election-assistant-backend \
  --image gcr.io/YOUR_PROJECT_ID/election-backend:latest \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --set-env-vars="FIREBASE_PROJECT_ID=YOUR_PROJECT_ID" \
  --set-env-vars="OPENAI_API_KEY=YOUR_API_KEY" \
  --set-env-vars="NODE_ENV=production" \
  --memory 512Mi \
  --timeout 300
```

### 2.4 Get Backend URL
```bash
gcloud run services describe election-assistant-backend --region asia-south1
```

## Step 3: Deploy Frontend to Firebase Hosting

### 3.1 Set Environment Variables

Create `.env.production`:
```
REACT_APP_API_URL=https://YOUR_BACKEND_URL
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
```

### 3.2 Build Frontend

```bash
cd frontend

# Build for production
npm run build

# Build output will be in 'build' directory
```

### 3.3 Deploy to Firebase Hosting

```bash
# Initialize Firebase in project
firebase init hosting

# Deploy to hosting
firebase deploy --only hosting
```

### 3.4 Custom Domain (Optional)

```bash
# In Firebase Console:
# 1. Go to Hosting settings
# 2. Add custom domain
# 3. Follow DNS configuration
```

## Step 4: Set Up CI/CD Pipeline

### 4.1 GitHub Actions for Backend

Create `.github/workflows/deploy-backend.yml`:
```yaml
name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Set up Google Cloud CLI
        uses: google-github-actions/setup-gcloud@v1
        with:
          project_id: ${{ secrets.GCP_PROJECT_ID }}
          service_account_key: ${{ secrets.GCP_SA_KEY }}
      
      - name: Configure Docker
        run: gcloud auth configure-docker
      
      - name: Build and push Docker image
        run: |
          cd backend
          npm ci
          npm run build
          docker build -t gcr.io/${{ secrets.GCP_PROJECT_ID }}/election-backend:${{ github.sha }} .
          docker push gcr.io/${{ secrets.GCP_PROJECT_ID }}/election-backend:${{ github.sha }}
      
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy election-assistant-backend \
            --image gcr.io/${{ secrets.GCP_PROJECT_ID }}/election-backend:${{ github.sha }} \
            --region asia-south1
```

### 4.2 GitHub Actions for Frontend

Create `.github/workflows/deploy-frontend.yml`:
```yaml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Build
        run: |
          cd frontend
          npm ci
          npm run build
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          channelId: live
          projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
          target: election-assistant
```

## Step 5: Monitoring & Logging

### 5.1 Cloud Logging

```bash
# View backend logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=election-assistant-backend" \
  --limit 50 \
  --format json
```

### 5.2 Cloud Monitoring

```bash
# View metrics
gcloud monitoring metrics-descriptors list | grep run
```

### 5.3 Set Up Alerts

```bash
gcloud alpha monitoring policies create \
  --display-name="Backend Error Rate" \
  --condition-name="high-error-rate" \
  --condition-threshold-value=0.05
```

## Step 6: Backup & Recovery

### 6.1 Firestore Backups

```bash
# Automated daily backups can be set up in Cloud Console
# Or manual backup:
gcloud firestore export gs://YOUR_BUCKET/backup-$(date +%s)
```

### 6.2 Recovery Procedure

```bash
# List available backups
gcloud firestore backups list

# Restore from backup
gcloud firestore restore BACKUP_ID
```

## Step 7: Performance Optimization

### 7.1 Frontend Optimization

- ✅ Use CDN with caching
- ✅ Minify and compress assets
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading

### 7.2 Backend Optimization

- ✅ Database indexing
- ✅ Query optimization
- ✅ Caching strategy
- ✅ Load balancing

## Step 8: Security Checklist

- ✅ Enable Cloud Armor for DDoS protect
- ✅ Set up VPC (if needed)
- ✅ Enable binary authorization
- ✅ Use secrets manager for keys
- ✅ Enable audit logging
- ✅ Set up HTTPS
- ✅ Configure CORS properly
- ✅ Enable rate limiting

## Troubleshooting

### Backend not connecting to Frontend
```bash
# Check CORS settings
# Verify API_URL in frontend
# Check Cloud Run URL
# Test with curl
curl https://YOUR_BACKEND_URL/health
```

### Database connection issues
```bash
# Check Firestore rules
# Verify firebase credentials
# Check quotas and limits
# Review error logs
```

### Slow performance
```bash
# Check Cloud Run metrics
# Review database queries
# Check frontend bundle size
# Enable caching
```

## Costs Estimation

- **Firebase Hosting**: $1/month (first 10GB free)
- **Cloud Run**: ~$6-10/month (1 million requests free)
- **Firestore**: ~$1-5/month (querying)
- **Cloud Storage**: ~$0.20/month (backups)
- **OpenAI API**: ~$5+/month (variable)

**Total Estimated**: $15-25/month

---

**Last Updated**: 2024
**Version**: 1.0
