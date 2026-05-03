export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  CHAT: {
    SEND_MESSAGE: `${API_BASE_URL}/chat/message`,
    SEARCH_FAQ: `${API_BASE_URL}/chat/faq`,
    CLEAR_HISTORY: `${API_BASE_URL}/chat/clear-history`,
  },
  ELECTION: {
    GET_STEPS: `${API_BASE_URL}/election/steps`,
    GET_STEP: (stepId: string) => `${API_BASE_URL}/election/steps/${stepId}`,
    GET_TIMELINE: `${API_BASE_URL}/election/timeline`,
    GET_FAQ: `${API_BASE_URL}/election/faq`,
    GET_POLLING_BOOTHS: `${API_BASE_URL}/election/polling-booths`,
    GET_STATISTICS: `${API_BASE_URL}/election/statistics`,
  },
  USER: {
    SAVE_PREFERENCES: `${API_BASE_URL}/user/preferences`,
    GET_PREFERENCES: (userId: string) => `${API_BASE_URL}/user/preferences/${userId}`,
    GET_PROGRESS: (userId: string) => `${API_BASE_URL}/user/progress/${userId}`,
  },
};
