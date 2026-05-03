# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies

**Backend:**
```bash
cd election-assistant/backend
npm install
```

**Frontend:**
```bash
cd election-assistant/frontend
npm install
```

### Step 2: Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Edit .env and add:
# - FIREBASE_PROJECT_ID
# - OPENAI_API_KEY
# - Other required keys
```

**Frontend (.env.local):**
```bash
cd ../frontend
cp .env.example .env.local
# Edit .env.local and add:
# - REACT_APP_FIREBASE_PROJECT_ID
# - REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start Development Servers

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
# Server running on http://localhost:5000
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
# App running on http://localhost:3000
```

### Step 4: Access Application

Open http://localhost:3000 in your browser!

---

## 📋 What You Get

### Backend Server (Port 5000)
- ✅ REST API with 13 endpoints
- ✅ AI chatbot integration
- ✅ Firebase Firestore connectivity
- ✅ Input validation & sanitization
- ✅ Rate limiting & security headers
- ✅ Error handling & logging

### Frontend Application
- ✅ Interactive chatbot interface
- ✅ Step-by-step election guide
- ✅ Important dates timeline
- ✅ FAQ search functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Full accessibility support (WCAG 2.1 AA)

### Features
1. **Chatbot**: Ask questions about elections
2. **Election Guide**: Learn 6 key steps
3. **Timeline**: Track important dates
4. **User Preferences**: Save language & settings
5. **Progress Tracking**: Track learning progress

---

## 📁 Key Files

### Backend Core
- `backend/src/server.ts` - Express app entry point
- `backend/src/services/aiService.ts` - Chatbot AI logic
- `backend/src/services/electionDataService.ts` - Election data
- `backend/src/controllers/` - API controllers
- `backend/src/routes/` - API endpoints

### Frontend Core
- `frontend/src/App.tsx` - Main app component
- `frontend/src/pages/HomePage.tsx` - Home page
- `frontend/src/components/Chatbot/ChatBox.tsx` - Chatbot UI
- `frontend/src/components/ElectionGuide/` - Guide component
- `frontend/src/components/Timeline/` - Timeline component
- `frontend/src/services/apiService.ts` - API client

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test              # Run all tests
npm run test:watch   # Watch mode
npm run lint         # Check code style
npm run lint:fix     # Fix errors
```

### Frontend Tests
```bash
cd frontend
npm test             # Run tests
npm run build       # Build for production
```

---

## 📡 API Quick Reference

### Chat Endpoints
```bash
# Send message to chatbot
POST /api/chat/message
{
  "message": "How do I register to vote?",
  "userId": "user-123",
  "sessionId": "session-123"
}

# Search FAQ
GET /api/chat/faq?query=voter%20registration
```

### Election Data Endpoints
```bash
# Get all election steps
GET /api/election/steps

# Get timeline
GET /api/election/timeline

# Get FAQ
GET /api/election/faq

# Find polling booths
GET /api/election/polling-booths?state=Maharashtra&city=Mumbai
```

### User Endpoints
```bash
# Save preferences
POST /api/user/preferences

# Get preferences
GET /api/user/preferences/user-123

# Get progress
GET /api/user/progress/user-123
```

---

## 🔧 Common Commands

```bash
# Backend
cd backend
npm start              # Production build
npm run dev            # Development server
npm run build          # Build TypeScript
npm test               # Run tests
npm run lint           # Lint code
npm run lint:fix       # Fix lint errors

# Frontend
cd frontend
npm start              # Development server
npm run build          # Production build
npm test               # Run tests
npm run lint           # Lint code
npm run lint:fix       # Fix lint errors
npm run format         # Format code
```

---

## 🔐 Security Checklist

✅ Input validation on all fields  
✅ XSS prevention with sanitization  
✅ CORS protection configured  
✅ Rate limiting enabled  
✅ HTTPS ready for production  
✅ Environment variables for secrets  
✅ Error messages don't leak info  
✅ Logging configured  

---

## 📱 Responsive Design

Works perfectly on:
- ✅ Desktop (1440px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)
- ✅ All modern browsers

---

## ♿ Accessibility

- ✅ WCAG 2.1 Level AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ High contrast mode
- ✅ Large text support
- ✅ Focus management

---

## 🚀 Next Steps

1. **Setup Firebase**:
   - Go to firebase.google.com
   - Create project
   - Get credentials
   - Add to .env files

2. **Setup OpenAI/Claude API**:
   - Get API key
   - Add to .env

3. **Test Application**:
   - Open localhost:3000
   - Test each feature
   - Check console for errors

4. **Deploy** (Optional):
   - See [DEPLOYMENT.md](docs/DEPLOYMENT.md)
   - Deploy to Firebase + Cloud Run
   - Set up custom domain

---

## 📖 Documentation

- [README.md](README.md) - Full overview
- [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) - API details
- [DEPLOYMENT.md](docs/DEPLOYMENT.md) - Production deployment
- [SECURITY.md](docs/SECURITY.md) - Security implementation
- [CONTRIBUTING.md](docs/CONTRIBUTING.md) - Contributing guide

---

## 🎓 Code Quality

- ✅ TypeScript with strict mode
- ✅ ESLint configured
- ✅ Prettier formatting
- ✅ Jest testing
- ✅ Comments & documentation
- ✅ Error handling
- ✅ Logging throughout

---

## 💡 Tips

- Check browser console for API errors
- Review backend logs for debugging
- Use TypeScript for type safety
- Write tests for new features
- Follow the existing code style
- Keep components small and focused
- Comment complex logic

---

## 🆘 Troubleshooting

**Backend won't start?**
```bash
# Check Node version
node --version  # Should be 16+

# Check port availability
lsof -i :5000

# Clear cache and reinstall
rm -rf node_modules
npm install
```

**Frontend won't run?**
```bash
# Check if backend is running
curl http://localhost:5000/health

# Clear React cache
rm -rf node_modules public/index.html.bak
npm install
npm start
```

**API calls failing?**
```bash
# Check .env configuration
cat .env

# Verify Firebase credentials
cat backend/.env

# Test with curl
curl -X GET http://localhost:5000/api/election/steps
```

---

## 🎉 You're Ready!

Your Election Assistant is now running! 

**Next**: Open http://localhost:3000 and explore the application.

**Questions?** Check the docs or email support@electionassistant.in

---

**Happy Coding! 🗳️**
