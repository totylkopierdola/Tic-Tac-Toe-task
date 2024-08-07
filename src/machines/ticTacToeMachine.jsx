import { createMachine, assign } from "xstate";

const initialContext = {
  board: Array(9).fill(null),
  totalMoves: 0,
  currentPlayer: "x",
  gameWinner: undefined,
};

const validateEventType = (event, expectedType) => {
  if (event.type !== expectedType) {
    throw new Error("Unexpected event type.");
  }
};

export default createMachine(
  {
    id: "ticTacToe",
    initial: "inProgress",
    context: initialContext,
    states: {
      inProgress: {
        always: [
          { target: "gameOver.victory", guard: "hasWinner" },
          { target: "gameOver.stalemate", guard: "isDraw" },
        ],
        on: {
          MAKE_MOVE: [
            {
              target: "inProgress",
              guard: "canMove",
              actions: "applyMove",
            },
          ],
          RESTART: {
            target: "inProgress",
            actions: "initializeGame",
          },
        },
      },
      gameOver: {
        initial: "victory",
        states: {
          victory: {
            tags: "hasWinner",
            entry: "declareWinner",
          },
          stalemate: {
            tags: "draw",
          },
        },
        on: {
          RESTART: {
            target: "inProgress",
            actions: "initializeGame",
          },
        },
      },
    },
  },
  {
    actions: {
      applyMove: assign({
        board: ({ context, event }) => {
          validateEventType(event, "MAKE_MOVE");
          const updatedBoard = [...context.board];
          updatedBoard[event.position] = context.currentPlayer;
          return updatedBoard;
        },
        totalMoves: ({ context }) => context.totalMoves + 1,
        currentPlayer: ({ context }) =>
          context.currentPlayer === "x" ? "o" : "x",
      }),
      initializeGame: assign(initialContext),
      declareWinner: assign({
        gameWinner: ({ context }) =>
          context.currentPlayer === "x" ? "o" : "x",
      }),
    },
    guards: {
      hasWinner: ({ context }) => {
        const { board } = context;
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        return winningCombinations.some((line) => {
          const xWins = line.every((index) => board[index] === "x");
          if (xWins) return true;

          const oWins = line.every((index) => board[index] === "o");
          return oWins;
        });
      },
      isDraw: ({ context }) => context.totalMoves === 9,
      canMove: ({ context, event }) => {
        if (event.type !== "MAKE_MOVE") return false;
        return context.board[event.position] === null;
      },
    },
  }
);
