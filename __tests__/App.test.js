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
  let mockSend;
  let initialState;

  beforeEach(() => {
    mockSend = jest.fn();
    initialState = {
      context: {
        board: Array(9).fill(null),
        currentPlayer: "X",
        gameWinner: null,
      },
      matches: jest.fn().mockReturnValue(true),
      hasTag: jest.fn(),
    };

    useMachine.mockReturnValue([initialState, mockSend]);
  });

  test("renders an empty Tic-Tac-Toe board when the game starts", () => {
    render(<App />);

    const tiles = screen
      .getAllByRole("button", { name: "" })
      .filter((tile) => tile.getAttribute("data-index"));
    expect(tiles).toHaveLength(9);

    tiles.forEach((tile) => {
      expect(tile).toHaveTextContent("");
    });
  });

  test("displays the current player's turn correctly", () => {
    render(<App />);
    const turnDisplay = screen.getByTestId("player-turn");
    expect(turnDisplay).toHaveTextContent("It is Player X's turn");
  });

  test("dispatches MAKE_MOVE action when a tile is clicked", () => {
    render(<App />);
    const firstTile = screen
      .getAllByRole("button")
      .find((tile) => tile.getAttribute("data-index") === "0");

    fireEvent.click(firstTile);
    expect(mockSend).toHaveBeenCalledWith({ type: "MAKE_MOVE", position: 0 });
  });

  test("shows game over message and allows reset when game is finished", async () => {
    render(<App />);

    const tiles = screen.getAllByTestId("tile");
    tiles.forEach((tile) => {
      userEvent.click(tile);
    });

    await waitFor(() => {
      const gameOverMessage = screen.getByRole("heading", {
        name: /Wins!|It's a Draw!/i,
      });
      expect(gameOverMessage).toBeInTheDocument();
    });

    const resetButton = screen.getByTestId("reset-button");
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
  });

  test("dispatches MAKE_MOVE action for each clickable tile", () => {
    render(<App />);
    initialState.matches.mockReturnValueOnce(true).mockReturnValue(false);

    const tiles = screen.getAllByTestId("tile");

    tiles.forEach((tile, index) => {
      fireEvent.click(tile);
      expect(mockSend).toHaveBeenCalledWith({
        type: "MAKE_MOVE",
        position: index,
      });
    });
  });

  test("renders GameOverWrapper when the game reaches the game over state", async () => {
    render(<App />);

    const tiles = screen.getAllByTestId("tile");

    tiles.forEach((tile) => {
      userEvent.click(tile);
    });

    await waitFor(() => {
      const headings = screen.getAllByRole("heading");
      expect(headings).toHaveLength(2);
    });

    expect(
      screen.getByRole("heading", { name: /It's a Draw!/i })
    ).toBeInTheDocument();
  });

  test("resets the game board when the reset button is clicked", async () => {
    render(<App />);

    const tiles = screen.getAllByTestId("tile");
    tiles.forEach((tile) => {
      userEvent.click(tile);
    });

    const resetButton = screen.getByTestId("reset-button");
    fireEvent.click(resetButton);

    tiles.forEach((tile) => {
      expect(tile).toHaveTextContent("");
    });

    const turnDisplay = screen.getByTestId("player-turn");
    expect(turnDisplay).toHaveTextContent("It is Player X's turn");
  });
});
