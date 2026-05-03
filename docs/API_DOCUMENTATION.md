# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All requests are sent with standard HTTP methods. For user-specific operations, include `userId` in the request body.

---

## Chat Endpoints

### Send Message to Chatbot
Send a message and get AI response.

**Request:**
```http
POST /chat/message
Content-Type: application/json

{
  "message": "Tell me about voter registration",
  "userId": "user-123",
  "sessionId": "session-123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "message": "Tell me about voter registration",
    "response": "To register as a voter in India, you need to...",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Error processing message",
  "error": "ERROR_CODE"
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid input
- `429`: Rate limit exceeded
- `500`: Server error

---

### Search FAQ
Search the FAQ database for relevant answers.

**Request:**
```http
GET /chat/faq?query=voter%20registration
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "voter registration",
    "results": [
      {
        "question": "What is the minimum age to vote?",
        "answer": "You must be at least 18 years old to vote in Indian elections."
      },
      {
        "question": "How do I register as a voter?",
        "answer": "Visit the election commission website or your local registration office..."
      }
    ],
    "count": 2
  }
}
```

### Clear Chat History
Clear conversation history for a user.

**Request:**
```http
POST /chat/clear-history
Content-Type: application/json

{
  "userId": "user-123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Conversation history cleared"
}
```

---

## Election Data Endpoints

### Get All Election Steps
Retrieve all election process steps.

**Request:**
```http
GET /election/steps
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "registration",
      "title": "Voter Registration",
      "description": "Get yourself registered as a voter",
      "details": [
        "You must be an Indian citizen",
        "Minimum age: 18 years",
        "..."
      ]
    },
    {
      "id": "eligibility",
      "title": "Check Your Eligibility",
      "description": "Verify if you meet all the criteria to vote",
      "details": [...]
    }
  ],
  "count": 6
}
```

### Get Specific Election Step
Get details about a specific step.

**Request:**
```http
GET /election/steps/registration
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "registration",
    "title": "Voter Registration",
    "description": "Get yourself registered as a voter",
    "details": [...]
  }
}
```

**Step IDs:**
- `registration`: Voter Registration
- `eligibility`: Eligibility Check
- `find_booth`: Find Polling Booth
- `voting`: Voting Procedure
- `documents`: Required Documents
- `results`: Result Declaration

### Get Election Timeline
Get important election dates.

**Request:**
```http
GET /election/timeline
```

**Response:**
```json
{
  "success": true,
  "data": {
    "REGISTRATION_DEADLINE": "2024-03-15",
    "NOTIFICATION_RELEASE": "2024-03-16",
    "NOMINATION_PERIOD_START": "2024-03-20",
    "NOMINATION_PERIOD_END": "2024-03-27",
    "VOTING_DATE": "2024-04-10",
    "RESULT_DECLARATION": "2024-04-10"
  }
}
```

### Get FAQ
Get all frequently asked questions.

**Request:**
```http
GET /election/faq
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "question": "What is the minimum age to vote?",
      "answer": "You must be at least 18 years old..."
    },
    {
      "question": "How do I register as a voter?",
      "answer": "Visit the election commission website..."
    }
  ],
  "count": 8
}
```

### Get Polling Booths
Find polling booths by state and city.

**Request:**
```http
GET /election/polling-booths?state=Maharashtra&city=Mumbai
```

**Response:**
```json
{
  "success": true,
  "data": {
    "state": "Maharashtra",
    "city": "Mumbai",
    "booths": [
      {
        "boothId": "PB001",
        "boothNumber": 1,
        "name": "Government School - Main Building",
        "address": "123 Election Street, Mumbai",
        "constituency": "Central",
        "facilities": [
          "Wheelchair accessibility",
          "Separate polling area for women",
          "EVM facilities"
        ]
      }
    ]
  }
}
```

### Get Election Statistics
Get overall election statistics.

**Request:**
```http
GET /election/statistics
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVoters": 900000000,
    "votersRegistered": 750000000,
    "votersVoted": 0,
    "turnout": 0,
    "constituencies": 543,
    "states": 28,
    "unionTerritories": 8
  }
}
```

---

## User Endpoints

### Save User Preferences
Save user's language, state, and accessibility preferences.

**Request:**
```http
POST /user/preferences
Content-Type: application/json

{
  "userId": "user-123",
  "state": "Maharashtra",
  "language": "en",
  "accessibility": {
    "fontSize": "large",
    "highContrast": true,
    "screenReaderOptimized": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Preferences saved successfully",
  "data": {
    "state": "Maharashtra",
    "language": "en",
    "accessibility": {...}
  }
}
```

### Get User Preferences
Retrieve user's saved preferences.

**Request:**
```http
GET /user/preferences/user-123
```

**Response:**
```json
{
  "success": true,
  "data": {
    "state": "Maharashtra",
    "language": "en",
    "accessibility": {...}
  }
}
```

### Get User Progress
Get user's interaction history and progress.

**Request:**
```http
GET /user/progress/user-123
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "type": "chat",
      "message": "What is voter registration?",
      "response": "Voter registration is...",
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ],
  "count": 5
}
```

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "message": "Descriptive error message",
  "error": "ERROR_CODE"
}
```

### Common Error Codes
| Code | Status | Description |
|------|--------|-------------|
| INVALID_INPUT | 400 | Validation error |
| NOT_FOUND | 404 | Resource not found |
| RATE_LIMIT | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Server error |

---

## Rate Limiting

All endpoints are rate-limited to prevent abuse:
- **Rate:** 100 requests per 15 minutes
- **Per:** IP address
- **Header:** `X-RateLimit-Remaining`

---

## Examples

### Using cURL
```bash
# Send chat message
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -d '{
    "message": "How do I register to vote?",
    "userId": "user-123",
    "sessionId": "session-123"
  }'

# Get election steps
curl http://localhost:5000/api/election/steps

# Search FAQ
curl "http://localhost:5000/api/chat/faq?query=registration"
```

### Using JavaScript/Fetch
```javascript
// Send chat message
const response = await fetch('/api/chat/message', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Select polling booth?',
    userId: 'user-123',
    sessionId: 'session-123'
  })
});
const data = await response.json();
```

---

**API Version:** 1.0
**Last Updated:** 2024-01-15
