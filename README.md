# PLINK - React Native Expo App

A modern, scalable React Native application built with Expo Router, featuring a clean architecture and modular design system.

## 📁 Project Structure

```
my-plink-app/
├── app/                          # 📍 Expo Router file-based routing
├── components/                   # 🧩 Reusable UI components
├── context/                      # 🌐 Global state management
├── hooks/                        # 🧠 Custom React hooks
├── constants/                    # 🔖 App configuration & constants
├── utils/                        # 🔧 Helper functions & utilities
├── types/                        # 🧾 TypeScript type definitions
├── assets/                       # 🖼️ Static assets (images, fonts)
└── README.md                     # 📖 Project documentation
```

---

## 📍 App Directory (`/app`)

**Purpose**: Contains all route-based screens and layouts managed by Expo Router.

**When to use**: 
- Creating new screens/pages
- Setting up navigation layouts
- Defining route-specific logic

### Structure:
```
app/
├── (main-tabs)/                  # Bottom tab navigation group
│   ├── HomeScreen.tsx           # Main landing screen
│   ├── FavoritesScreen.tsx      # User favorites management
│   ├── ProfileScreen.tsx        # User profile & settings
│   ├── FeedScreen.tsx           # Content feed & social features
│   ├── SettingsScreen.tsx       # App preferences & configuration
│   ├── InviteScreen.tsx         # Friend invitation system
│   └── MainTabsLayout.tsx       # Tab navigation wrapper
├── RootLayout.tsx               # Global app layout & providers
└── NotFoundScreen.tsx           # 404 fallback screen
```

**Key Features**:
- File-based routing (no manual route configuration)
- Automatic code splitting
- Type-safe navigation with TypeScript
- Nested layouts support

---

## 🧩 Components Directory (`/components`)

**Purpose**: Houses reusable UI components used across multiple screens.

**When to use**:
- Creating reusable UI elements
- Building design system components
- Extracting common functionality

### Current Components:
- `Header.tsx` - Navigation header with back/menu buttons and blur effects

**Best Practices**:
- Keep components focused on single responsibility
- Use TypeScript interfaces for props
- Include JSDoc comments for complex components
- Follow consistent naming conventions

---

## 🌐 Context Directory (`/context`)

**Purpose**: Global state management using React Context API.

**When to use**:
- Managing app-wide state (theme, user preferences)
- Sharing data between distant components
- Avoiding prop drilling

### Current Contexts:
- `ThemeContext.tsx` - Theme management (light/dark/liquid glass modes)

**Features**:
- Theme switching with system preference detection
- Blur effects configuration
- Color scheme management
- Persistent theme selection

---

## 🧠 Hooks Directory (`/hooks`)

**Purpose**: Custom React hooks for reusable stateful logic.

**When to use**:
- Extracting component logic for reuse
- Managing complex state interactions
- Creating utility hooks for common patterns

### Current Hooks:
- `useFrameworkReady.ts` - Framework initialization and splash screen management

**Best Practices**:
- Start hook names with "use"
- Keep hooks focused on single concerns
- Return objects for multiple values
- Include proper TypeScript typing

---

## 🔖 Constants Directory (`/constants`)

**Purpose**: Centralized configuration values, strings, and app constants.

**When to use**:
- Defining app-wide configuration
- Managing text content for localization
- Setting up theme colors and design tokens

### Files:
- `colors.ts` - Color palette and theme definitions
- `strings.ts` - Text content and localization strings  
- `config.ts` - App configuration, API endpoints, feature flags

**Benefits**:
- Single source of truth for app constants
- Easy maintenance and updates
- Supports internationalization
- Type-safe constant access

---

## 🔧 Utils Directory (`/utils`)

**Purpose**: Helper functions and utilities used throughout the app.

**When to use**:
- Creating reusable utility functions
- Data transformation and formatting
- Common algorithms and calculations

### Current Utils:
- `formatDate.ts` - Date formatting and relative time utilities

**Examples**:
```typescript
import { formatRelativeTime } from '@/utils/formatDate';

const timeAgo = formatRelativeTime(new Date('2024-01-01'));
// Returns: "2 hours ago", "3 days ago", etc.
```

---

## 🧾 Types Directory (`/types`)

**Purpose**: Shared TypeScript type definitions and interfaces.

**When to use**:
- Defining data models and API responses
- Creating component prop interfaces
- Ensuring type safety across the app

### Key Types:
- Theme and color system types
- User and business profile interfaces
- Feed and favorites data models
- Navigation and component prop types

**Benefits**:
- Improved developer experience with IntelliSense
- Compile-time error detection
- Better code documentation
- Easier refactoring

---

## 🖼️ Assets Directory (`/assets`)

**Purpose**: Static files like images, fonts, and other media.

**Structure**:
```
assets/
├── images/           # App icons, logos, illustrations
├── fonts/           # Custom font files (if any)
└── sounds/          # Audio files (if any)
```

**Best Practices**:
- Use optimized image formats (WebP, PNG)
- Include multiple resolutions for different screen densities
- Organize by category (icons, illustrations, etc.)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Expo CLI
- iOS Simulator or Android Emulator

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build:web
```

### Development Workflow
1. **Screens**: Add new screens in `/app` directory
2. **Components**: Create reusable components in `/components`
3. **Styling**: Use theme colors from `/constants/colors.ts`
4. **State**: Add global state to appropriate context providers
5. **Types**: Define TypeScript interfaces in `/types`

---

## 🎨 Design System

### Theme Support
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for low-light usage
- **Liquid Glass**: Modern blur effects with transparency
- **System**: Automatically follows device preference

### Color Palette
- Primary: Blue (#3b82f6)
- Success: Green (#10b981) 
- Warning: Amber (#f59e0b)
- Error: Red (#ef4444)
- Neutral: Gray scale (50-900)

### Typography
- Consistent font weights and sizes
- Proper line heights for readability
- Text shadow effects for blur themes

---

## 📱 Features

### Core Functionality
- **Multi-mode Interface**: Personal and Business user modes
- **Content Feed**: Social-style content with interactions
- **Favorites System**: Save and organize preferred content
- **Invite System**: Referral program with rewards tracking
- **Theme Customization**: Multiple visual themes
- **Settings Management**: Comprehensive app preferences

### Technical Features
- **Type-safe Navigation**: Full TypeScript support
- **Responsive Design**: Works on all screen sizes
- **Blur Effects**: Modern glass morphism design
- **Animated Interactions**: Smooth micro-interactions
- **Modular Architecture**: Easy to extend and maintain

---

## 🔧 Configuration

### Environment Setup
- Configure API endpoints in `/constants/config.ts`
- Customize theme colors in `/constants/colors.ts`
- Update app strings in `/constants/strings.ts`

### Adding New Features
1. Create screen in `/app` directory
2. Add navigation route if needed
3. Create reusable components
4. Define TypeScript types
5. Update constants as needed

---

## 📚 Additional Resources

- [Expo Router Documentation](https://expo.github.io/router/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev/) - Icon library used in the app

---

## 🤝 Contributing

1. Follow the established folder structure
2. Add proper TypeScript types for new features
3. Include JSDoc comments for complex functions
4. Test on both iOS and Android platforms
5. Maintain consistent code formatting

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.