# Election Assistant India 🗳️

An AI-powered, interactive web application designed to help Indian citizens understand the election process in a simple, engaging, and beginner-friendly way.

## 🌟 Features

- **Step-by-Step Election Guide**: Comprehensive walkthrough of the entire election process
- **AI Chatbot Assistant**: Powered by Claude/OpenAI for answering election-related questions
- **Interactive Timeline**: Important election dates and deadlines
- **FAQ Database**: Quick answers to common questions
- **Polling Booth Locator**: Find your designated polling station
- **User Preferences**: Customizable language and accessibility settings
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Accessibility First**: WCAG 2.1 compliant with screen reader support
- **Secure & Private**: Input validation, secure API communication, CORS protection

## 🏗️ Project Structure

```
election-assistant/
├── backend/                    # Node.js Express backend
│   ├── src/
│   │   ├── config/            # Firebase, Logger, API config
│   │   ├── controllers/        # Request handlers
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic (AI, Data)
│   │   ├── middleware/        # Custom middleware
│   │   ├── utils/             # Utilities & constants
│   │   └── server.ts          # Express app setup
│   ├── tests/                 # Test files
│   ├── package.json
│   └── tsconfig.json
├── frontend/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API & Firebase services
│   │   ├── hooks/             # Custom hooks
│   │   ├── config/            # Configuration files
│   │   ├── utils/             # Utility functions
│   │   ├── styles/            # Global styles
│   │   ├── App.tsx            # Main app component
│   │   └── index.tsx          # React entry point
│   ├── public/                # Static assets
│   ├── package.json
│   └── tsconfig.json
├── docs/                       # Documentation
├── .env.example               # Environment template
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm 8+
- Firebase account with Firestore database
- OpenAI or Claude API key
- Git

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/election-assistant.git
cd election-assistant
```

#### 2. Set up Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your API keys and configuration

# Install dependencies
npm install

# Build TypeScript
npm run build

# Run local development
npm run dev
```

#### 3. Set up Frontend

```bash
cd ../frontend
cp .env.example .env.local
# Edit .env.local with your configuration

# Install dependencies
npm install

# Start development server
npm start
```

## 🔧 Configuration

### Backend (.env)

```
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
```

## 📚 API Endpoints

### Chat API
- `POST /api/chat/message` - Send message to chatbot
- `GET /api/chat/faq?query=...` - Search FAQ
- `POST /api/chat/clear-history` - Clear chat history

### Election Data API
- `GET /api/election/steps` - Get all election steps
- `GET /api/election/steps/:stepId` - Get specific step
- `GET /api/election/timeline` - Get election dates
- `GET /api/election/faq` - Get FAQ
- `GET /api/election/polling-booths?state=...&city=...` - Find polling booths
- `GET /api/election/statistics` - Get election stats

### User API
- `POST /api/user/preferences` - Save user preferences
- `GET /api/user/preferences/:userId` - Get preferences
- `GET /api/user/progress/:userId` - Get user progress

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run lint              # Lint code
npm run lint:fix          # Fix linting errors
```

### Frontend Tests
```bash
cd frontend
npm test                  # Run tests
npm run build            # Create production build
npm run lint             # Lint code
```

## ♿ Accessibility Features

- **WCAG 2.1 Level AA** compliance
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Optimized**: Proper ARIA labels and semantic HTML
- **High Contrast Mode**: Support for high contrast preferences
- **Large Text Support**: Responsive typography
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Management**: Clear focus indicators

## 🔒 Security Features

- **Input Validation**: All user inputs validated with Joi schemas
- **XSS Prevention**: HTML sanitization and content security
- **CORS Protection**: Whitelist-based CORS configuration
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet.js**: Security headers for Express
- **Firebase Auth**: Secure user authentication
- **Environment Variables**: Secure API key management
- **API Error Handling**: No sensitive information leakage

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Firebase Hosting (Frontend)

```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### Google Cloud Run (Backend)

```bash
cd backend
# Create Dockerfile and .dockerignore
docker build -t election-assistant-backend .
gcloud run deploy election-assistant-backend --image gcr.io/YOUR_PROJECT/election-assistant-backend
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment guide.

## 📖 Documentation

- [API Documentation](docs/API_DOCUMENTATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Security Best Practices](docs/SECURITY.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please follow the guidelines in [CONTRIBUTING.md](docs/CONTRIBUTING.md).

## 📞 Support

For support, email: support@electionassistant.in

Or visit: [Election Commission of India](https://www.eci.gov.in)

## 🙏 Acknowledgments

- Election Commission of India
- OpenAI for GPT-3.5-turbo
- Firebase for backend infrastructure
- React and TypeScript communities

---

**Made with ❤️ for Democratic Participation**
