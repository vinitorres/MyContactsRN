# My Contacts App 📱

A simple contacts management mobile application built as a **study project** to practice React Native, TypeScript, and modern mobile development patterns.

## 📖 About

This is a learning project that demonstrates a full-stack mobile application consuming a custom REST API. The app allows users to manage their contacts with basic CRUD operations (Create, Read, Update, Delete).

**Note**: This project was created for educational purposes to explore React Native development, API integration, and mobile app architecture patterns.

## ✨ Features

- 📋 List all contacts
- ➕ Add new contacts
- ✏️ Edit existing contacts
- 🗑️ Delete contacts (long press)
- 🌍 Internationalization (English and Portuguese)
- 🌓 Dark mode support
- 🔄 Pull to refresh
- 📱 iOS and Android support

## 🛠️ Technologies & Libraries

### Core
- **React Native** - Mobile framework
- **Expo** (~54.0.33) - Development platform
- **TypeScript** (^5.9.3) - Type safety
- **Expo Router** (~6.0.23) - File-based routing

### HTTP & API
- **Axios** (^1.13.4) - HTTP client
- Custom REST API (built by me) - Backend service

### Internationalization
- **i18next** (^25.8.4) - i18n framework
- **react-i18next** (^16.5.4) - React integration
- **expo-localization** (^17.0.8) - Device locale detection

### Navigation
- **@react-navigation/native** (^7.1.8)
- **expo-router** (~6.0.23)

### UI & Styling
- **React Native Reanimated** (~4.1.1) - Animations
- **React Native Gesture Handler** (~2.28.0) - Touch gestures
- **@expo/vector-icons** (^15.0.3) - Icons
- **expo-symbols** (~1.0.8) - SF Symbols

### Development
- **ESLint** (^9.25.0) - Code linting
- **TypeScript** - Static typing

## 🏗️ Architecture

The project follows **SOLID principles** and uses:
- **MVVM Pattern** - Separation of concerns
- **Dependency Injection** - Loose coupling
- **Repository Pattern** - Data abstraction
- **Factory Pattern** - Object creation

### Project Structure
```
src/
├── config/          # API configuration
├── constants/       # API routes and constants
├── http/            # HTTP client abstraction (IHttpClient)
├── i18n/            # Internationalization
├── models/          # Data models
├── screens/         # UI screens with ViewModels
└── services/        # Business logic and API services
```
