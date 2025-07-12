/**
 * @file strings.ts
 * @description Centralized text content and localization strings
 * @features - App texts, error messages, labels, placeholders
 * @developer Dhyan Bhandari
 */

export const STRINGS = {
  // App Info
  APP_NAME: 'PLINK',
  APP_TAGLINE: 'Your global communication hub',
  
  // Navigation
  HOME: 'Home',
  FAVORITES: 'Favorites',
  PROFILE: 'Profile',
  FEED: 'Feed',
  SETTINGS: 'Settings',
  INVITE_FRIENDS: 'Invite Friends',
  
  // Common Actions
  SAVE: 'Save',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  EDIT: 'Edit',
  SHARE: 'Share',
  COPY: 'Copy',
  SEND: 'Send',
  BACK: 'Back',
  NEXT: 'Next',
  DONE: 'Done',
  
  // User Modes
  PERSONAL_MODE: 'Personal',
  BUSINESS_MODE: 'Business',
  PERSONNEL_MODE: 'Personnel',
  
  // Placeholders
  TYPE_MESSAGE: 'Type your message...',
  SEARCH_FAVORITES: 'Search favorites...',
  ENTER_EMAIL: 'Enter email address',
  PERSONAL_MESSAGE: 'Personal message (optional)',
  
  // Messages
  WELCOME_MESSAGE: 'Welcome to PLINK',
  NO_FAVORITES_FOUND: 'No favorites found',
  FAVORITES_EMPTY_STATE: 'Start adding items to your favorites to see them here',
  SEARCH_ADJUST_FILTER: 'Try adjusting your search or filter',
  
  // Errors
  ERROR_INVALID_EMAIL: 'Please enter a valid email address',
  ERROR_GENERIC: 'An error occurred. Please try again.',
  
  // Success Messages
  SUCCESS_INVITE_SENT: 'Invite sent successfully!',
  SUCCESS_COPIED: 'Copied to clipboard!',
  SUCCESS_SAVED: 'Saved successfully!',
  
  // Settings
  THEME: 'Theme',
  NOTIFICATIONS: 'Notifications',
  PRIVACY_DATA: 'Privacy & Data',
  ACCOUNT_SETTINGS: 'Account Settings',
  
  // Theme Options
  LIGHT_THEME: 'Light',
  DARK_THEME: 'Dark',
  LIQUID_GLASS_THEME: 'Liquid Glass',
  SYSTEM_DEFAULT: 'System Default',
  
  // Invite System
  EARN_REWARDS: 'Earn Rewards!',
  INVITE_REWARD_TEXT: 'Get $10 credit for each friend who joins. They get $5 too!',
  YOUR_INVITE_CODE: 'Your Invite Code',
  SHARE_CODE_REWARD: 'Share this code with friends to earn rewards',
  QUICK_SHARE: 'Quick Share',
  SEND_DIRECT_INVITE: 'Send Direct Invite',
  YOUR_REFERRALS: 'Your Referrals',
  FRIENDS_INVITED: 'Friends Invited',
  EARNED: 'Earned',
  
  // 404 Page
  PAGE_NOT_FOUND: "This screen doesn't exist.",
  GO_HOME: 'Go to home screen!',
} as const;