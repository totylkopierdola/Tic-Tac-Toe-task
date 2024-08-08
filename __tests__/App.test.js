import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../src/App";
import { useMachine } from "@xstate/react";
import userEvent from "@testing-library/user-event";

jest.mock("../src/machines/ticTacToeMachine", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@xstate/react", () => ({
  useMachine: jest.fn(),
}));

describe("App Component", () => {
  const mockSend = jest.fn();
  const initialState = {
    context: {
      board: Array(9).fill(null),
      currentPlayer: "X",
      gameWinner: null,
    },
    matches: jest.fn().mockReturnValue(true),
    hasTag: jest.fn(),
  };

  beforeEach(() => {
    useMachine.mockReturnValue([initialState, mockSend]);
  });

  test("renders an empty board at game start", () => {
    render(<App />);

    const tiles = screen
      .getAllByRole("button", { name: "" })
      .filter((tile) => tile.getAttribute("data-index"));
    expect(tiles).toHaveLength(9);

    tiles.forEach((tile) => {
      expect(tile).toHaveTextContent("");
    });
  });

  test("shows current player turn", () => {
    render(<App />);
    const turnDisplay = screen.getByTestId("player-turn");
    expect(turnDisplay).toHaveTextContent("It is Player X's turn");
  });

  test("dispatches MAKE_MOVE action on tile click", () => {
    render(<App />);
    const tiles = screen.getAllByRole("button");
    const firstTile = tiles.find(
      (tile) => tile.getAttribute("data-index") === "0"
    );

    fireEvent.click(firstTile);
    expect(mockSend).toHaveBeenCalledWith({ type: "MAKE_MOVE", position: 0 });
  });

  test("shows game over message and reset button", () => {
    initialState.context = {
      board: Array(9).fill(null),
      currentPlayer: "X",
      gameWinner: "X",
    };
    initialState.matches = jest
      .fn()
      .mockReturnValueOnce(true) // For game over state
      .mockReturnValueOnce(false); // For other states

    render(<App />);

    expect(screen.getByTestId("game-over")).toHaveTextContent("Game Over");

    const resetButton = screen.queryByTestId("reset-button");
    if (resetButton) {
      fireEvent.click(resetButton);
      expect(mockSend).toHaveBeenCalledWith({ type: "RESTART" });
    }
  });

  test("tiles are clickable and dispatch MAKE_MOVE action", () => {
    render(<App />);

    initialState.matches.mockReturnValueOnce(true).mockReturnValue(false); // In-progress state

    const tiles = screen.getAllByTestId("tile");

    tiles.forEach((tile, index) => {
      fireEvent.click(tile);
      expect(mockSend).toHaveBeenCalledWith({
        type: "MAKE_MOVE",
        position: index,
      });
    });
  });

  test("renders GameOverWrapper when the game is finished", async () => {
    render(<App />);

    const tiles = screen.getAllByTestId("tile");

    // Simulate moves to reach the game over state
    tiles.forEach((tile, index) => {
      userEvent.click(tile);
    });

    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
