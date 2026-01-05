# My Personal Resume Website

Welcome to my personal resume website repository! This site is designed to showcase my professional journey, creative projects, and passions. Here, you'll find insights into my career in software development, my interests as well as my artistic passion.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Redux State Management](#redux-state-management)
- [Contact](#contact)

## 🎯 About the Project

This is a modern, responsive personal resume website built with React and styled with Tailwind CSS. The site features smooth animations powered by Framer Motion and includes interactive elements to engage visitors. It serves as a digital portfolio showcasing professional experience, projects, and personal interests.

The application uses Redux Toolkit for efficient and scalable state management, following modern React development best practices.

## ✨ Features

- **Projects Portfolio**: Comprehensive display of professional and personal projects
- **Contact Form**: Easy-to-use form for potential collaborations or inquiries
- **Responsive Design**: Mobile-first, fully responsive layout that works seamlessly on any device
- **Smooth Animations**: Engaging animations and transitions using Framer Motion
- **Interactive Canvas**: Creative painting feature using react-canvas-paint
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Fast Performance**: Optimized React application with efficient rendering
- **State Management**: Redux Toolkit for predictable and maintainable state management

## 🛠️ Technologies Used

### Frontend Framework
- **React 18.2.0**: Modern JavaScript library for building user interfaces
- **React DOM**: Entry point to the DOM and server renderers for React
- **React Router**: Client-side routing for single-page application navigation

### State Management
- **Redux Toolkit**: Official, opinionated Redux toolset for efficient Redux development
- **React Redux**: Official React bindings for Redux

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Custom CSS**: Additional styling for unique design elements

### Animation & Interactivity
- **Framer Motion 7.5.1**: Production-ready motion library for React
- **React Canvas Paint 1.0.1**: Interactive canvas component for drawing

### Build Tools
- **React Scripts 5.0.1**: Configuration and scripts for Create React App
- **Webpack 5.74.0**: Module bundler for JavaScript applications
- **TypeScript Support**: Type definitions for React components

### Testing
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/user-event**: User interaction simulation for tests

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 14 or higher recommended)
- **npm** (comes with Node.js) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/resume.git
   ```

2. **Navigate into the project directory**
   ```bash
   cd resume
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application

Start the development server:
```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000). The page will automatically reload when you make changes.

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page reloads when you make changes, and lint errors appear in the console.

### `npm test`
Launches the test runner in interactive watch mode. See the [running tests documentation](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and filenames include hashes.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command copies all configuration files and transitive dependencies into your project.

### `npm run magic`
Runs Webpack bundler with custom configuration for advanced build scenarios.

## 📁 Project Structure

```
resume/
├── public/           # Static files and assets
├── src/              # Source files
│   ├── components/   # Reusable React components
│   ├── pages/        # Page components
│   ├── store/        # Redux store configuration
│   │   ├── store.js         # Redux store setup
│   │   └── exampleSlice.js  # Example Redux slice
│   ├── App.js        # Main application component
│   ├── index.js      # Application entry point with Redux Provider
│   └── ...
├── dist/             # Production build output
├── package.json      # Project dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
└── README.md         # Project documentation
```

## 🔄 Redux State Management

This project uses **Redux Toolkit**, the official recommended approach for writing Redux logic. Redux Toolkit simplifies store setup, reduces boilerplate, and includes best practices by default.

### Store Configuration

The Redux store is configured in `src/store/store.js` and wrapped around the app in `src/index.js` using the `Provider` component from React Redux.

### Creating Slices

Redux Toolkit uses "slices" to define reducers and actions. An example slice is provided in `src/store/exampleSlice.js` demonstrating:

- **State definition**: Initial state structure
- **Reducers**: Pure functions that update state
- **Actions**: Automatically generated action creators
- **Immutable updates**: Uses Immer library under the hood for safe state mutations

### Using Redux in Components

To use Redux state and actions in your components:

```javascript
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store/exampleSlice';

function MyComponent() {
  const value = useSelector((state) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
```

### Benefits of Redux Toolkit

- **Less boilerplate**: Simplifies Redux setup and usage
- **Built-in best practices**: Includes Redux DevTools and Immer
- **Type-safe**: Works great with TypeScript
- **Async logic**: Easy handling with `createAsyncThunk`
- **Maintainable**: Clear separation of concerns with slices

## 📧 Contact

If you're interested in connecting, please reach out via:

- **Email**: [mcevoyclark@gmail.com](mailto:mcevoyclark@gmail.com)
- **LinkedIn**: [Clark McEvoy](https://www.linkedin.com/in/clark-mcevoy-904378150/)

---

Built with ❤️ using React, Redux Toolkit, and Tailwind CSS
