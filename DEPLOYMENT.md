# Election Assistant - Deployment Guide

## 📋 Deployment Overview

Your application will be deployed as follows:
- **Frontend**: Firebase Hosting (free tier)
- **Backend**: Heroku or Railway (recommended for Express apps)
- **Database**: Firebase Firestore (already configured)

---

## 🚀 Step 1: Deploy Frontend to Firebase Hosting

### 1.1 Build Frontend
```bash
cd frontend
npm run build
cd ..
```

### 1.2 Login to Firebase
```bash
firebase login
```
This will open your browser to authenticate with your Firebase account.

### 1.3 Deploy Frontend
```bash
firebase deploy --only hosting
```

Your frontend will be live at: `https://election-assistant-india.web.app`

---

## 🔧 Step 2: Deploy Backend

Since your backend is an Express.js app, you have two options:

### Option A: Deploy to Heroku (Easy - Free tier available)

1. **Create Heroku Account**
   - Go to https://www.heroku.com
   - Sign up (verify email)

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create Procfile** (in backend folder)
   ```
   web: npm start
   ```

5. **Update backend/package.json**
   - Change `"start": "node dist/server.js"` (already there)
   - Build TypeScript first: `npm run build`

6. **Create & Deploy App**
   ```bash
   cd backend
   heroku create election-assistant-api
   git push heroku main
   ```

7. **Set Environment Variables**
   ```bash
   heroku config:set GEMINI_API_KEY=AIzaSyCAmM41MM2ihblv5jjWdo_skSlQneTKjvU
   heroku config:set FIREBASE_PROJECT_ID=election-assistant-india
   heroku config:set NODE_ENV=production
   heroku config:set PORT=5000
   heroku config:set FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
   # Upload service account file
   ```

Your backend will be available at: `https://election-assistant-api.herokuapp.com`

### Option B: Deploy to Railway.app (Free - Simpler)

1. **Go to Railway.app** → Sign up with GitHub
2. **Create new project** → Deploy from GitHub repo
3. **Set environment variables** in Railway dashboard
4. **Deploy automatically**

---

## 🔗 Step 3: Connect Frontend to Deployed Backend

After backend deployment, update the frontend API URL:

**File**: `frontend/src/config/api.ts`

```typescript
const API_URL = process.env.REACT_APP_API_URL || 'https://election-assistant-api.herokuapp.com';

export default API_URL;
```

**File**: `frontend/.env.production`
```
REACT_APP_API_URL=https://election-assistant-api.herokuapp.com
```

Then rebuild and redeploy frontend:
```bash
cd frontend
npm run build
cd ..
firebase deploy --only hosting
```

---

## 📝 Environment Variables Checklist

### Backend (.env or Heroku Config)
- ✅ `GEMINI_API_KEY`
- ✅ `FIREBASE_PROJECT_ID`
- ✅ `FIREBASE_AUTH_DOMAIN`
- ✅ `FIREBASE_API_KEY`
- ✅ `FIREBASE_APP_ID`
- ✅ `NODE_ENV=production`
- ✅ `PORT=5000`
- ✅ `CORS_ORIGIN=https://election-assistant-india.web.app`

### Frontend (.env.production)
- ✅ `REACT_APP_API_URL=<your-backend-url>`

---

## 🧪 Testing After Deployment

1. Visit: `https://election-assistant-india.web.app`
2. Test chat functionality
3. Check browser console for errors (F12)
4. Check backend logs:
   ```bash
   heroku logs --tail  # For Heroku
   ```

---

## 🔐 Security Checklist

- [ ] Set `CORS_ORIGIN` to your frontend URL
- [ ] Remove debug console logs before production
- [ ] Use strong `JWT_SECRET`
- [ ] Keep `firebase-service-account.json` in `.gitignore`
- [ ] Use HTTPS only
- [ ] Set appropriate Firestore security rules

---

## 📊 Monitoring & Logs

### Firebase Console
- https://console.firebase.google.com

### Backend Logs
```bash
# Heroku
heroku logs --tail

# Railway
railway logs
```

---

## 💡 Next Steps

1. Deploy frontend: `firebase deploy --only hosting`
2. Deploy backend to Heroku/Railway
3. Update frontend API URL
4. Test end-to-end functionality
5. Share your live app! 🎉

For detailed help, check the individual service documentation:
- Firebase: https://firebase.google.com/docs/hosting
- Heroku: https://devcenter.heroku.com
- Railway: https://docs.railway.app
