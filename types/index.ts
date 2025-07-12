/**
 * @file index.ts
 * @description Shared TypeScript types and interfaces for the application
 * @features - Theme types, navigation types, data models, component props
 * @developer Dhyan Bhandari
 */

// Theme Types
export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  border: string;
  input: string;
  button: string;
  buttonText: string;
}

export interface Theme {
  colors: ThemeColors;
  blur: boolean;
  blurIntensity: number;
}

export type ThemeMode = 'light' | 'dark' | 'liquidGlass' | 'system';

// Navigation Types
export interface TabScreenProps {
  title: string;
  icon: React.ComponentType<any>;
  activeTintColor: string;
}

// User Types
export type UserMode = 'Personnel' | 'Business';

export interface User {
  id: string;
  name: string;
  email: string;
  mode: UserMode;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Business Profile Types
export interface BusinessSection {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'textarea';
}

export interface BusinessProfile {
  id: string;
  userId: string;
  sections: BusinessSection[];
  createdAt: Date;
  updatedAt: Date;
}

// Feed Types
export type FeedItemType = 'post' | 'trending' | 'recommendation';

export interface FeedItem {
  id: number;
  type: FeedItemType;
  title: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt?: Date;
}

// Favorites Types
export interface FavoriteItem {
  id: number;
  title: string;
  type: string;
  category: string;
  description: string;
  rating: number;
  saved: string;
  emoji: string;
  userId?: string;
  createdAt?: Date;
}

// Invite System Types
export interface InviteCode {
  code: string;
  userId: string;
  usageCount: number;
  maxUsage: number;
  expiresAt?: Date;
  createdAt: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  refereeId: string;
  inviteCode: string;
  rewardAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}

// Settings Types
export interface NotificationSettings {
  pushNotifications: boolean;
  emailUpdates: boolean;
  marketingEmails: boolean;
}

export interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  crashReporting: boolean;
}

export interface UserSettings {
  theme: ThemeMode;
  language: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

// Component Props Types
export interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
}

export interface SettingRowProps {
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  hasSwitch?: boolean;
  onPress?: () => void;
  theme: Theme;
  textColor?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Animation Types
export interface AnimationConfig {
  duration: number;
  easing?: any;
  useNativeDriver?: boolean;
}

// Form Types
export interface FormField {
  id: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  validation?: (value: string) => string | null;
}

// Chat Types
export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  timestamp: Date;
  type: 'user' | 'assistant';
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}