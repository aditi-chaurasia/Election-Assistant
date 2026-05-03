import axios from 'axios';
import logger from '../config/logger';
import { ELECTION_STEPS , FAQ} from '../utils/constants';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

class AIService {
  private geminiApiKey: string | null = null;
  private conversationHistory: Map<string, Message[]> = new Map();
  private readonly GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent';

  constructor() {
    this.geminiApiKey = process.env.GEMINI_API_KEY || null;
    console.log('GEMINI KEY:', process.env.GEMINI_API_KEY);
    if (!this.geminiApiKey) {
      logger.warn('Gemini API Key not configured. Chat functionality will be limited.');
    }
  }

  /**
   * Get system prompt for the election assistant
   */
  private getSystemPrompt(): string {
    const electionStepsDescription = Object.values(ELECTION_STEPS)
      .map((step) => `- ${step.title}: ${step.description}`)
      .join('\n');

    return `You are a helpful and friendly AI assistant specialized in explaining India's election process. Your role is to:

1. Guide users through voter registration, eligibility checking, and voting procedures
2. Provide clear, step-by-step instructions
3. Answer questions about the election process using simple language
4. Help users understand their rights and responsibilities as voters
5. Provide information about important election dates
6. Direct users to official resources when needed

IMPORTANT FORMATTING RULES:
- Do NOT use markdown formatting (no ###, **, *, etc.)
- Use plain text only
- Use line breaks to separate ideas
- Use simple numbering like "1." for lists
- Keep responses concise and easy to understand

Key Topics You Can Help With:
${electionStepsDescription}

Guidelines:
- Keep responses concise and easy to understand
- Use line breaks for clarity
- Ask clarifying questions if needed
- Always emphasize the importance of participating in democracy
- Be neutral and impartial
- Provide accurate information or acknowledge when you're unsure
- Suggest official sources (Election Commission website, state election offices)

Important Election Steps:
${Object.values(ELECTION_STEPS)
  .map((step) => `${step.title}: ${step.details.join(', ')}`)
  .join('\n')}`;
  }

  /**
   * Clean markdown formatting from text
   */
  private cleanMarkdown(text: string): string {
    return text
      .replace(/###\s+/g, '')        // Remove ### headers
      .replace(/##\s+/g, '')         // Remove ## headers
      .replace(/#\s+/g, '')          // Remove # headers
      .replace(/\*\*/g, '')          // Remove bold **
      .replace(/\*/g, '')            // Remove italic markers
      .replace(/`/g, '')             // Remove code backticks
      .replace(/---+/g, '')          // Remove horizontal rules
      .trim();
  }

  /**
   * Format conversation for Gemini
   */
  async chat(userId: string, userMessage: string): Promise<string> {
    try {
      if (!this.geminiApiKey) {
        throw new Error('Gemini API Key not configured');
      }

      // Initialize conversation history if not exists
      if (!this.conversationHistory.has(userId)) {
        this.conversationHistory.set(userId, [
          {
            role: 'system',
            content: this.getSystemPrompt(),
          },
        ]);
      }

      const history = this.conversationHistory.get(userId)!;

      // Add user message
      history.push({
        role: 'user',
        content: userMessage,
      });

      // Keep only last 10 messages for context
      if (history.length > 10) {
        const systemMessage = history[0];
        history.splice(1, history.length - 10);
        if (systemMessage.role === 'system') {
          history.unshift(systemMessage);
        }
      }

      // Prepare the system prompt with user message
      const systemAndUserMessage = `${this.getSystemPrompt()}\n\nUser: ${userMessage}`;

      const response = await axios.post(
        this.GEMINI_API_ENDPOINT,
        {
          contents: [
            {
              parts: [
                {
                  text: systemAndUserMessage
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': this.geminiApiKey
          }
        }
      );
      const assistantMessage = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 
        'Unable to process your request';

      // Clean markdown formatting from response
      const cleanMessage = this.cleanMarkdown(assistantMessage);

      // Add assistant response to history
      history.push({
        role: 'assistant',
        content: cleanMessage,
      });

      logger.info(`Chat response for user ${userId}: ${cleanMessage.substring(0, 100)}`);

      return cleanMessage;
    } catch (error) {
      logger.error(`Error in AIService.chat: ${error}`);
      throw error;
    }
  }

  /**
   * Search FAQ for relevant answers
   */
  searchFAQ(query: string): { question: string; answer: string }[] {
    const queryLower = query.toLowerCase();
    return FAQ.filter(
      (item) =>
        item.question.toLowerCase().includes(queryLower) ||
        item.answer.toLowerCase().includes(queryLower)
    ).slice(0, 3);
  }

  /**
   * Get election step information
   */
  getElectionStep(stepId: string): (typeof ELECTION_STEPS)[keyof typeof ELECTION_STEPS] | null {
    return Object.values(ELECTION_STEPS).find((step) => step.id === stepId) || null;
  }

  /**
   * Clear conversation history for a user
   */
  clearHistory(userId: string): void {
    this.conversationHistory.delete(userId);
    logger.info(`Cleared conversation history for user ${userId}`);
  }
}

export default new AIService();
