import Joi from 'joi';

/**
 * Validation schemas for input data
 */

export const chatMessageSchema = Joi.object({
  message: Joi.string().trim().required().max(5000),
  userId: Joi.string().required(),
  sessionId: Joi.string().required(),
});

export const userPreferencesSchema = Joi.object({
  userId: Joi.string().required(),
  state: Joi.string().valid('Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 
    'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
    'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry', 'Lakshadweep',
    'Andaman and Nicobar Islands', 'Ladakh', 'Jammu and Kashmir'),
  language: Joi.string().valid('en', 'hi'),
  accessibility: Joi.object({
    fontSize: Joi.string().valid('small', 'medium', 'large'),
    highContrast: Joi.boolean(),
    screenReaderOptimized: Joi.boolean(),
  }),
});

export const pollBootSearchSchema = Joi.object({
  state: Joi.string().required(),
  city: Joi.string().required(),
  pincode: Joi.string().regex(/^\d{6}$/),
});

/**
 * Validate input against schema
 */
export const validate = (data: any, schema: Joi.Schema) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map((detail) => detail.message);
    return { isValid: false, errors: messages };
  }

  return { isValid: true, data: value };
};

/**
 * Sanitize user input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .substring(0, 5000); // Limit length
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian phone numbers start with 6-9
  return phoneRegex.test(phone.replace(/\D/g, ''));
};
