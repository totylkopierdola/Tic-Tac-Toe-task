# Tic-Tac-Toe

Tic-Tac-Toe is a simple React application that allows two players to play the classic Tic-Tac-Toe game. The application uses XState for state management and Styled Components for styling.

## Table of Contents

- [Project Structure](#project-structure)
- [Components](#components)
- [State Machine](#state-machine)
- [Testing](#testing)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Structure

The project structure is as follows:

    ├── __tests__
    │   ├── App.test.js
    │   └── ticTacToeMachine.test.js
    ├── public
    │   └── tic-tac-toe.svg
    ├── src
    │   ├── assets
    │   │   └── react.svg
    │   ├── components
    │   │   └── StyledComponents.jsx
    │   ├── machines
    │   │   └── ticTacToeMachine.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .babelrc
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── setupTests.js
    └── vite.config.js

## Components

The application consists of the following components:

1.  `App.jsx`: The main application component that renders the game board, player turn display, and game over screen.
2.  `StyledComponents.jsx`: Contains the styled components used throughout the application.

## State Machine

The game logic is managed using the XState state machine, which is defined in the `ticTacToeMachine.jsx` file. The machine handles the following states:

- `inProgress`: The game is in progress, and players can make moves.
- `gameOver`: The game has ended, either with a victory or a stalemate.

The machine also defines several actions and guards to manage the game state, such as `applyMove`, `initializeGame`, `declareWinner`, `hasWinner`, and `isDraw`.

## Testing

The application uses Jest and React Testing Library (RTL) for testing. The tests can be found in the `__tests__` directory, and they cover the following:

1.  `App.test.js`: Tests the main application component and its interactions.
2.  `ticTacToeMachine.test.js`: Tests the state machine and its behavior.

## Technologies Used

- React
- XState
- Styled Components
- Jest
- React Testing Library
- Vite

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1.  Clone the repository:

    `git clone https://github.com/your-username/tic-tac-toe.git`

2.  Navigate to the project directory:

    `cd tic-tac-toe`

3.  Install the dependencies:

    `npm install`

    or

    `yarn install`

### Running the Application

1.  Start the development server:

    `npm run dev`

    or

    `yarn run dev`

2.  Open your web browser and navigate to `http://localhost:5173` to see the application.

### Running Tests

To run the tests, use the following command:

`npm test`

or

`yarn test`

## Deployment

To build the application for production, use the following command:

`npm run build`

or

`yarn run build`

This will create a `dist` folder that contains the optimized and minified files for deployment.

## Contributing

If you would like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your forked repository.
5.  Create a new pull request, and the maintainers will review your changes.

## License

This project is licensed under the [MIT License](LICENSE).
