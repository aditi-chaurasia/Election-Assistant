import React, { useState, useRef, useEffect } from 'react';
import apiService from '../../services/apiService';
import { generateId } from '../../utils/helpers';
import styles from './ChatBox.module.css';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatBoxProps {
  userId: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ userId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef(generateId());

  /**
   * Keep messages scrolled to bottom
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /**
   * Handle sending message
   */
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);
    setError(null);

    try {
      // Call API
      const response = await apiService.sendChatMessage(
        inputValue,
        userId,
        sessionId.current
      );

      if (response.success && response.data?.response) {
        const assistantMessage: ChatMessage = {
          id: generateId(),
          text: response.data.response,
          sender: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setError(response.message || 'Failed to get response');
      }
    } catch (err) {
      setError('Unable to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Enter key
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.container} role="region" aria-label="Chat Assistant">
      <div className={styles.header}>
        <h2>Election Assistant</h2>
        <p>Ask me anything about elections</p>
      </div>

      <div className={styles.messagesContainer} role="log" aria-label="Chat messages">
        {messages.length === 0 && (
          <div className={styles.welcome}>
            <p>👋 Welcome! I'm here to help you understand the election process.</p>
            <p>Ask me questions about voter registration, voting procedure, or anything else!</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.message} ${styles[message.sender]}`}
            role="article"
            aria-label={`${message.sender === 'user' ? 'Your message' : 'Assistant message'}: ${message.text}`}
          >
            <div className={styles.messageContent}>{message.text}</div>
            <div className={styles.timestamp} aria-hidden="true">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}

        {loading && (
          <div className={styles.message + ' ' + styles.assistant} aria-live="polite">
            <div className={styles.typing}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <div className={styles.inputContainer}>
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your question here... (Shift+Enter for new line)"
          disabled={loading}
          aria-label="Chat message input"
          className={styles.input}
          rows={3}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !inputValue.trim()}
          className={styles.sendButton}
          aria-label={loading ? 'Sending message' : 'Send message'}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
