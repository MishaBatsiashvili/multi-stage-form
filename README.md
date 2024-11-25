# Signup Application
Signup Application is a web application built using Next.js, designed for managing user signups with a seamless user experience. This README provides a quick overview of the project setup and how to run the application locally.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Build](#build)
- [Linting](#linting)
- [Additional Notes](#additional-notes)
- [License](#license)

## Features

- **State Management and Persistence**
  - Form steps and active stages are stored in a context for easy state management.
  - Data, including form input and the active stage, is also saved in `localStorage` for persistence across page reloads, ensuring users don't lose their progress.

- **Form Validation**
  - Utilizes `react-hook-form` and `zod` to efficiently handle validation, providing a seamless form handling experience.
  - Zipcode validation is dynamically performed based on the country selected at the beginning of the form, ensuring accurate input adherence to regional standards.

- **Custom Components**
  - Implements custom-styled components using `tailwind` and `shadcn/ui`, delivering a unique and cohesive user interface design.

- **Advanced Input Handling**
  - Features a custom phone number input with country selection.
  - Utilizes virtualization techniques for efficient rendering, especially beneficial when handling large lists of countries.

- **Smooth Transitions and Animations**
  - Employs `framer-motion` for animations, enabling smooth transitions between stages and striking component appearance effects.



## Installation

To get started with the project, clone the repository and install the dependencies.

## Scripts

The following scripts are available within the project:

- **Development**: Start the development server  
  `npm run dev`

- **Build**: Compile the application for production  
  `npm run build`

- **Start**: Start the production server  
  `npm run start`

- **Lint**: Run ESLint to find and fix problems  
  `npm run lint`

- **Prepare**: Used by Husky to set up git hooks  
  `npm run prepare`

## Dependencies

The project uses the following main dependencies:

- **Next.js 15.0.3**: Framework for building server-rendered React applications.
- **React 18.0.0**: JavaScript library for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Hook Form**: Library for managing form state.
- **Date-fns**: Library for manipulating dates.
- **Zod**: Schema validation library.
- **Radix UI**: Primitives for building accessible React components.

## Development

During development, run the following command to start the server:

`npm run dev`

This launches the application on [http://localhost:3000](http://localhost:3000).

## Build

For production, build the application using:

`npm run build`

Then, you can start the server with:

`npm run start`

## Linting

To maintain code quality, you can run ESLint:

`npm run lint`

## Additional Notes

- The project uses Husky for managing git hooks to enforce code quality checks before commits.
- The PostCSS and Tailwind CSS setup is included to ensure flexible and responsive design.
