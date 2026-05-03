import { validate, sanitizeInput, isValidEmail, isValidPhoneNumber } from '../src/utils/validation';
import { chatMessageSchema, userPreferencesSchema } from '../src/utils/validation';

describe('Validation Utils', () => {
  describe('sanitizeInput', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeInput(input);
      expect(result).not.toContain('<script>');
      expect(result).not.toContain('</script>');
    });

    it('should remove javascript protocol', () => {
      const input = 'javascript:void(0)';
      const result = sanitizeInput(input);
      expect(result).not.toContain('javascript:');
    });

    it('should trim whitespace', () => {
      const input = '  Hello World  ';
      const result = sanitizeInput(input);
      expect(result).toBe('Hello World');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('should validate correct Indian phone number', () => {
      expect(isValidPhoneNumber('9876543210')).toBe(true);
      expect(isValidPhoneNumber('+91-9876543210')).toBe(true);
    });

    it('should reject invalid phone number', () => {
      expect(isValidPhoneNumber('123456789')).toBe(false);
      expect(isValidPhoneNumber('9876543210')).toBe(true);
    });
  });

  describe('validate', () => {
    it('should validate chat message schema', () => {
      const validData = {
        message: 'What is voter registration?',
        userId: 'user123',
        sessionId: 'session123',
      };
      const result = validate(validData, chatMessageSchema);
      expect(result.isValid).toBe(true);
    });

    it('should reject invalid chat message', () => {
      const invalidData = {
        message: '',
        userId: 'user123',
      };
      const result = validate(invalidData, chatMessageSchema);
      expect(result.isValid).toBe(false);
    });

    it('should validate user preferences schema', () => {
      const validData = {
        userId: 'user123',
        state: 'Maharashtra',
        language: 'en',
      };
      const result = validate(validData, userPreferencesSchema);
      expect(result.isValid).toBe(true);
    });
  });
});
