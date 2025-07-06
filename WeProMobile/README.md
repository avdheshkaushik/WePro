# WePro Mobile App

A complete mobile productivity application built with React Native and Expo, designed to help teams and individuals manage projects, tasks, and boost productivity.

## 🚀 Features

### Core Features
- **User Authentication**: Secure login and registration with JWT tokens
- **Dashboard**: Overview of projects, tasks, and team activities
- **Project Management**: Create, track, and manage projects with progress visualization
- **Task Management**: Organize tasks with priorities, status tracking, and filtering
- **Team Collaboration**: Invite team members and collaborate on projects
- **Profile Management**: User profile settings and preferences

### Technical Features
- **Cross-Platform**: Works on iOS, Android, and Web
- **Modern UI**: Beautiful, responsive design with smooth animations
- **Offline Support**: Basic offline functionality with local storage
- **Real-time Updates**: Live updates for project and task changes
- **Push Notifications**: Stay updated with task deadlines and project updates

## 📱 Screenshots

### Authentication Flow
- Onboarding screen with app introduction
- Login screen with email/password authentication
- Registration screen with user details and organization setup

### Main App
- Dashboard with overview cards and quick actions
- Projects screen with progress tracking
- Tasks screen with filtering and search
- Profile screen with settings and logout

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation v6
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Icons**: Expo Vector Icons (Ionicons)
- **Styling**: React Native StyleSheet

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd WeProMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   # For web development
   npm run web
   
   # For iOS development
   npm run ios
   
   # For Android development
   npm run android
   ```

4. **Run on physical device**
   - Install Expo Go app on your device
   - Scan the QR code from the terminal
   - The app will load on your device

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
EXPO_PUBLIC_APP_NAME=WePro
```

### Backend Integration
The mobile app connects to the WePro backend API. Make sure the backend is running on `http://localhost:3000` or update the API URL in `src/services/api.ts`.

## 📁 Project Structure

```
WeProMobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── TabBarIcon.tsx
│   ├── contexts/           # React Context providers
│   │   └── AuthContext.tsx
│   ├── screens/            # App screens
│   │   ├── OnboardingScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   ├── ProjectsScreen.tsx
│   │   ├── TasksScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── App.tsx                 # Main app component
├── app.json               # Expo configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo)
- **Success**: `#10b981` (Green)
- **Warning**: `#f59e0b` (Amber)
- **Error**: `#ef4444` (Red)
- **Background**: `#f8fafc` (Light Gray)
- **Surface**: `#ffffff` (White)
- **Text Primary**: `#1f2937` (Dark Gray)
- **Text Secondary**: `#6b7280` (Medium Gray)

### Typography
- **Headings**: Bold, 20-32px
- **Body**: Regular, 14-16px
- **Captions**: Regular, 12-14px

### Components
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Rounded corners (12px), consistent padding
- **Inputs**: Rounded corners (12px), light background

## 🔐 Authentication

The app uses JWT-based authentication with the following flow:

1. **Login**: Email and password authentication
2. **Registration**: User registration with organization setup
3. **Token Storage**: JWT tokens stored securely in AsyncStorage
4. **Auto-login**: Automatic login on app restart if valid token exists
5. **Logout**: Clear tokens and redirect to onboarding

## 📊 State Management

The app uses React Context API for state management:

- **AuthContext**: Manages user authentication state
- **User Data**: Stores user information and preferences
- **API Integration**: Handles API calls and error management

## 🚀 Deployment

### Building for Production

1. **Configure app.json**
   ```json
   {
     "expo": {
       "name": "WePro",
       "slug": "wepro-mobile",
       "version": "1.0.0",
       "platforms": ["ios", "android", "web"]
     }
   }
   ```

2. **Build for platforms**
   ```bash
   # Build for iOS
   expo build:ios
   
   # Build for Android
   expo build:android
   
   # Build for web
   expo build:web
   ```

### App Store Deployment
- Configure app signing certificates
- Update app metadata and screenshots
- Submit to App Store Connect (iOS) and Google Play Console (Android)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates

Stay updated with the latest features and bug fixes by regularly pulling from the main branch.

---

**WePro Mobile** - Your Productivity Companion 📱✨ 