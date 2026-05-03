import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface FAQResult {
  question: string;
  answer: string;
}

class ApiService {
  /**
   * Send message to chatbot
   */
  async sendChatMessage(
    message: string,
    userId: string,
    sessionId: string
  ): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(API_ENDPOINTS.CHAT.SEND_MESSAGE, {
        message,
        userId,
        sessionId,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Search FAQ
   */
  async searchFAQ(query: string): Promise<ApiResponse<FAQResult[]>> {
    try {
      const response = await axios.get<ApiResponse<FAQResult[]>>(
        API_ENDPOINTS.CHAT.SEARCH_FAQ,
        {
          params: { query },
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Clear chat history
   */
  async clearChatHistory(userId: string): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(
        API_ENDPOINTS.CHAT.CLEAR_HISTORY,
        { userId }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get all election steps
   */
  async getAllElectionSteps(): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(API_ENDPOINTS.ELECTION.GET_STEPS);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get specific election step
   */
  async getElectionStep(stepId: string): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(
        API_ENDPOINTS.ELECTION.GET_STEP(stepId)
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get election timeline
   */
  async getElectionTimeline(): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(API_ENDPOINTS.ELECTION.GET_TIMELINE);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get FAQ
   */
  async getFAQ(): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(API_ENDPOINTS.ELECTION.GET_FAQ);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get polling booths
   */
  async getPollingBooths(state: string, city: string): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(
        API_ENDPOINTS.ELECTION.GET_POLLING_BOOTHS,
        {
          params: { state, city },
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get election statistics
   */
  async getElectionStatistics(): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(API_ENDPOINTS.ELECTION.GET_STATISTICS);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Save user preferences
   */
  async saveUserPreferences(userId: string, preferences: any): Promise<ApiResponse> {
    try {
      const response = await axios.post<ApiResponse>(
        API_ENDPOINTS.USER.SAVE_PREFERENCES,
        {
          userId,
          ...preferences,
        }
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get user preferences
   */
  async getUserPreferences(userId: string): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(
        API_ENDPOINTS.USER.GET_PREFERENCES(userId)
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Get user progress
   */
  async getUserProgress(userId: string): Promise<ApiResponse> {
    try {
      const response = await axios.get<ApiResponse>(
        API_ENDPOINTS.USER.GET_PROGRESS(userId)
      );
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): ApiResponse {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return {
        success: false,
        message,
        error: error.code,
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
      error: 'UNKNOWN_ERROR',
    };
  }
}

export default new ApiService();
