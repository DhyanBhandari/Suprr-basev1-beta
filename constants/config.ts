/**
 * @file config.ts
 * @description Application configuration constants and environment variables
 * @features - API endpoints, app metadata, feature flags, default values
 * @developer Dhyan Bhandari
 */

export const CONFIG = {
  // App Metadata
  APP_VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  
  // API Configuration
  API_BASE_URL: 'https://api.plink.app',
  API_TIMEOUT: 10000, // 10 seconds
  
  // Feature Flags
  FEATURES: {
    BLUR_EFFECTS: true,
    ANIMATIONS: true,
    PUSH_NOTIFICATIONS: true,
    ANALYTICS: true,
    CRASH_REPORTING: true,
  },
  
  // Default Values
  DEFAULTS: {
    THEME: 'light',
    LANGUAGE: 'en',
    NOTIFICATION_ENABLED: true,
    BLUR_INTENSITY: 80,
    ANIMATION_DURATION: 300,
  },
  
  // Limits
  LIMITS: {
    MAX_BUSINESS_SECTIONS: 10,
    MAX_MESSAGE_LENGTH: 500,
    MAX_EMAIL_LENGTH: 254,
    MAX_NAME_LENGTH: 50,
  },
  
  // URLs
  URLS: {
    PRIVACY_POLICY: 'https://plink.app/privacy',
    TERMS_OF_SERVICE: 'https://plink.app/terms',
    SUPPORT: 'https://plink.app/support',
    INVITE_BASE: 'https://plink.app/invite',
  },
  
  // Social Media
  SOCIAL: {
    WHATSAPP_SCHEME: 'whatsapp://send?text=',
    EMAIL_SCHEME: 'mailto:?subject=Join me on PLINK&body=',
  },
  
  // Animation Timings
  ANIMATIONS: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000,
  },
  
  // Layout Constants
  LAYOUT: {
    TAB_BAR_HEIGHT: 70,
    HEADER_HEIGHT: 60,
    BORDER_RADIUS: 12,
    PADDING: 20,
    MARGIN: 16,
  },
} as const;