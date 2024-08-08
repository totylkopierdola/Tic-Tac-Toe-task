import { createActor } from "xstate";
import ticTacToeMachine from "../src/machines/ticTacToeMachine";

describe("ticTacToeMachine", () => {
  let service;

  beforeEach(() => {
    service = createActor(ticTacToeMachine).start();
  });

  afterEach(() => {
    service.stop();
  });

  test("should start in the inProgress state with correct initial context", () => {
    const snapshot = service.getSnapshot();
    expect(snapshot.matches("inProgress")).toBe(true);
    expect(snapshot.context.board).toEqual(Array(9).fill(null));
    expect(snapshot.context.currentPlayer).toBe("x");
    expect(snapshot.context.gameWinner).toBeUndefined();
  });

  test("should allow a player to make a move", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    const snapshot = service.getSnapshot();

    expect(snapshot.context.board[0]).toBe("x");
    expect(snapshot.context.currentPlayer).toBe("o");
  });

  test("should not allow a move on an occupied tile", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    service.send({ type: "MAKE_MOVE", position: 0 });
    const snapshot = service.getSnapshot();

    expect(snapshot.context.board[0]).toBe("x");
    expect(snapshot.context.currentPlayer).toBe("o");
  });

  test("should detect a win", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    service.send({ type: "MAKE_MOVE", position: 3 });
    service.send({ type: "MAKE_MOVE", position: 1 });
    service.send({ type: "MAKE_MOVE", position: 4 });
    service.send({ type: "MAKE_MOVE", position: 2 });
    const snapshot = service.getSnapshot();

    expect(snapshot.matches("gameOver.victory")).toBe(true);
    expect(snapshot.context.gameWinner).toBe("x");
  });

  test("should detect a draw", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    service.send({ type: "MAKE_MOVE", position: 1 });
    service.send({ type: "MAKE_MOVE", position: 2 });
    service.send({ type: "MAKE_MOVE", position: 4 });
    service.send({ type: "MAKE_MOVE", position: 3 });
    service.send({ type: "MAKE_MOVE", position: 5 });
    service.send({ type: "MAKE_MOVE", position: 7 });
    service.send({ type: "MAKE_MOVE", position: 6 });
    service.send({ type: "MAKE_MOVE", position: 8 });
    const snapshot = service.getSnapshot();

    expect(snapshot.matches("gameOver.stalemate")).toBe(true);
    expect(snapshot.context.gameWinner).toBeUndefined();
  });

  test("should reset the game", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    service.send({ type: "MAKE_MOVE", position: 1 });
    service.send({ type: "RESTART" });
    const snapshot = service.getSnapshot();

    expect(snapshot.matches("inProgress")).toBe(true);
    expect(snapshot.context.board).toEqual(Array(9).fill(null));
    expect(snapshot.context.currentPlayer).toBe("x");
    expect(snapshot.context.gameWinner).toBeUndefined();
  });

  test("should handle invalid actions gracefully", () => {
    service.send({ type: "INVALID_ACTION" });
    const snapshot = service.getSnapshot();

    expect(snapshot.matches("inProgress")).toBe(true);
    expect(snapshot.context.board).toEqual(Array(9).fill(null));
    expect(snapshot.context.currentPlayer).toBe("x");
    expect(snapshot.context.gameWinner).toBeUndefined();
  });

  test("should handle rapid moves by the same player gracefully", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    service.send({ type: "MAKE_MOVE", position: 1 });
    service.send({ type: "MAKE_MOVE", position: 2 });
    const snapshot = service.getSnapshot();

    expect(snapshot.context.board[0]).toBe("x");
    expect(snapshot.context.board[1]).toBe("o");
    expect(snapshot.context.board[2]).toBe("x");
    expect(snapshot.context.currentPlayer).toBe("o");
  });

  test("should not reset the game on unexpected events", () => {
    service.send({ type: "MAKE_MOVE", position: 0 });
    service.send({ type: "MAKE_MOVE", position: 1 });
    service.send({ type: "UNEXPECTED_EVENT" });
    const snapshot = service.getSnapshot();

    expect(snapshot.context.board[0]).toBe("x");
    expect(snapshot.context.board[1]).toBe("o");
    expect(snapshot.context.currentPlayer).toBe("x");
  });
});
