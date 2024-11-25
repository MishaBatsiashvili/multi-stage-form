# Signup Application
Signup Application is a web application built using Next.js, designed for managing user signups with a seamless user experience. This README provides a quick overview of the project setup and how to run the application locally.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Development](#development)
- [Build](#build)
- [Linting](#linting)
- [Additional Notes](#additional-notes)
- [License](#license)

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