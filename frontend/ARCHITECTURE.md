# Project Structure Overview

This document describes the feature-based architecture of the Impulse frontend project.

## Directory Structure

```
src/
├── assets/              # Static assets (images, fonts, SVGs)
│   └── styles/         # Global stylesheets
├── components/         # Shared/Global reusable UI components
│                       # (Buttons, Inputs, Modals, Cards, etc.)
├── config/             # Application configuration
│                       # (environment variables, constants)
├── features/           # Feature-specific modules (organized by domain)
│   ├── auth/
│   │   ├── components/ # Auth-specific components (LoginForm, SignupForm)
│   │   ├── api/        # Auth API calls (loginWithEmail, logout, etc.)
│   │   ├── types/      # Auth-related TypeScript interfaces
│   │   └── hooks/      # Auth-specific hooks (useAuth, useLogin)
│   └── todo/           # Todo feature modules
│       ├── components/
│       ├── api/
│       ├── types/
│       └── hooks/
├── hooks/              # Global custom hooks
│                       # (useTheme, useWindowSize, useAuth)
├── layouts/            # Layout components
│                       # (MainLayout, AuthLayout, DashboardLayout)
├── lib/                # Library configuration and utilities
│                       # (api-client.ts, axios setup, helpers)
├── pages/              # Page components (route components)
│                       # (LoginPage, TodoPage, ProfilePage)
├── routes/             # Routing configuration
├── stores/             # Global state management
│                       # (Zustand, Redux stores, or Context)
├── types/              # Global TypeScript types and interfaces
├── utils/              # Shared utility functions
│                       # (date formatting, validation, etc.)
├── App.tsx             # Root component
├── index.css           # Global styles
└── main.tsx            # Entry point
```

## Key Features

### 1. Path Aliases

The project is configured to use `@` alias for cleaner imports:

```typescript
// Instead of: ../../../components/Button
// Use:
import { Button } from '@/components/Button'
```

**Configuration:**
- `vite.config.ts` - Alias resolution for Vite
- `tsconfig.app.json` - TypeScript path mapping

### 2. API Client

A pre-configured Axios instance is available at `@/lib/api-client`:

```typescript
import { apiClient } from '@/lib/api-client'

const response = await apiClient.post('/users', { name: 'John' })
```

**Features:**
- Automatic error handling
- Response interceptors for consistent data format
- BaseURL set to `/api` (proxied to Spring Boot backend)
- Token handling ready for authentication

### 3. Backend Integration

The Vite dev server is configured to proxy API requests:

```typescript
// All /api requests are forwarded to:
// http://localhost:8080/api
```

**How to use:**
1. Start Spring Boot backend on `http://localhost:8080`
2. Run `npm run dev` in the frontend
3. API calls automatically proxy to the backend

### 4. Feature-Based Architecture Benefits

- **Scalability**: Features are self-contained and easy to extend
- **Collaboration**: Team members can work on different features without conflicts
- **Maintainability**: Related code is grouped together
- **Reusability**: Global components and hooks in dedicated folders
- **Performance**: Code-splitting opportunities by feature

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:5173
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## Adding a New Feature

Example: Adding a "Dashboard" feature

1. Create the feature folder:
   ```
   src/features/dashboard/
   ├── components/
   ├── api/
   ├── types/
   ├── hooks/
   └── index.ts
   ```

2. Create API calls in `src/features/dashboard/api/`:
   ```typescript
   // dashboardApi.ts
   import { apiClient } from '@/lib/api-client'
   
   export const getDashboardData = () => {
     return apiClient.get('/dashboard')
   }
   ```

3. Create components in `src/features/dashboard/components/`:
   ```typescript
   // DashboardWidget.tsx
   import { getDashboardData } from '../api/dashboardApi'
   
   export const DashboardWidget = () => {
     // Component logic
   }
   ```

4. Create a page in `src/pages/`:
   ```typescript
   // DashboardPage.tsx
   import { DashboardWidget } from '@/features/dashboard/components'
   
   export default function DashboardPage() {
     return <DashboardWidget />
   }
   ```

## Authentication Flow

The auth feature is pre-configured. Use it like this:

```typescript
import { loginWithEmail } from '@/features/auth/api/authApi'
import { LoginForm } from '@/features/auth/components/LoginForm'

// In your login page
const handleLogin = async (email: string, password: string) => {
  try {
    const response = await loginWithEmail({ email, password })
    localStorage.setItem('authToken', response.token)
    // Redirect to dashboard
  } catch (error) {
    // Handle error
  }
}
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=/api
VITE_APP_NAME=Impulse
```

Access in code:
```typescript
const apiBase = import.meta.env.VITE_API_BASE_URL
```

## Next Steps

1. **Set up routing** - Configure React Router in `src/routes/`
2. **Set up state management** - Consider Zustand or Redux for global state
3. **Add styling** - Consider CSS Modules or Tailwind CSS
4. **Create shared components** - Build reusable UI components in `src/components/`
5. **Implement layouts** - Create MainLayout, AuthLayout, etc.

## Best Practices

- Keep components small and focused
- Use TypeScript strictly for type safety
- Organize API calls by feature
- Use custom hooks for shared logic
- Keep global state minimal
- Use path aliases instead of relative imports
- Document complex components with JSDoc comments
