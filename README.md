# Show Random Cocktail App

A modern Angular application that generates random cocktails using TheCocktailDB API. The application follows clean architecture principles and implements best practices for state management, type safety, and testing.

## Features

- 🍸 Random cocktail generation
- 📱 Responsive design with Angular Material
- 🌐 Multi-language support for cocktail instructions
- 💾 Local storage for favorite cocktails
- 🎨 Modern and intuitive user interface
- 🧪 Comprehensive test coverage

## Tech Stack

- **Framework**: Angular 19
- **State Management**: NgRx
- **UI Components**: Angular Material
- **Testing**: Jest
- **API**: TheCocktailDB API
- **Type Safety**: TypeScript

## Project Structure

The project follows a clean architecture approach with clear separation of concerns:

```
src/
├── app/
│   ├── core/           # Core functionality, guards, interceptors
│   ├── data/           # Data layer
│   │   ├── datasources/    # API and local storage implementations
│   │   ├── mappers/        # Data transformation
│   │   └── repositories/   # Repository implementations
│   ├── domain/         # Domain layer
│   │   ├── models/         # Domain models
│   │   └── repositories/   # Repository interfaces
│   ├── presentation/   # Presentation layer
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page components
│   │   └── store/          # NgRx store
│   └── shared/         # Shared modules and components
└── environments/       # Environment configurations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/havramovska/show-random-cocktail-app.git
   cd show-random-cocktail-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`

### Running Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage
```

## Architecture

### Clean Architecture

The application follows clean architecture principles:

- **Domain Layer**: Contains business logic and entities
- **Data Layer**: Implements data access and transformation
- **Presentation Layer**: Handles UI and user interactions

### State Management

NgRx is used for state management with the following features:
- Store for global state
- Effects for side effects
- Entity for normalized state
- DevTools for debugging

### Type Safety

The application emphasizes type safety:
- Strict TypeScript configuration
- Comprehensive interfaces for API responses
- Type-safe data mapping
- Proper error handling

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


# 1. Test Development Environment
docker-compose up dev

Access http://localhost:4200 in your browser
Check if hot-reloading works by making a change to any file

# Stop the containers
docker compose down

# Rebuild and restart
docker compose up -d --build dev  # for development
