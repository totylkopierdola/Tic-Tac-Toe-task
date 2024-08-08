import React from "react";
import { useMachine } from "@xstate/react";
import ticTacToeMachine from "./machines/ticTacToeMachine";
import {
  Container,
  Title,
  PlayerTurn,
  BoardWrapper,
  Board,
  Tile,
  GameOverWrapper,
  ResetButton,
  Overlay,
} from "./components/StyledComponents";

export default function App() {
  const [state, send] = useMachine(ticTacToeMachine);

  return (
    <Container>
      <Title>Tic-Tac-Toe</Title>

      <BoardWrapper>
        <Board data-testid="board">
          {[...new Array(9).keys()].map((index) => (
            <Tile
              data-testid="tile"
              data-index={index}
              role="button"
              key={index}
              $isClickable={!state.matches("gameOver")} // Ensure this is correct
              $value={state.context.board[index]}
              onClick={() => send({ type: "MAKE_MOVE", position: index })}
              // aria-disabled={state.matches("gameOver") ? "true" : "false"} // Ensure this is correct
            >
              {state.context.board[index]}
            </Tile>
          ))}
        </Board>
      </BoardWrapper>

      <PlayerTurn
        $player={state.context.currentPlayer}
        data-testid="player-turn"
      >
        {state.matches("inProgress") ? (
          <p>It is Player {state.context.currentPlayer}'s turn</p>
        ) : (
          <p data-testid="game-over">Game Over</p>
        )}
      </PlayerTurn>

      {state.matches("gameOver") && (
        <>
          <Overlay $show={true} />
          <GameOverWrapper $winner={state.context.gameWinner}>
            <h2 role="heading">
              {state.hasTag("hasWinner")
                ? `Player ${state.context.gameWinner} Wins!`
                : "It's a Draw!"}
            </h2>
            <p>
              {state.hasTag("hasWinner") ? "Congratulations!" : "Good effort!"}
            </p>
            <ResetButton
              data-testid="reset-button"
              onClick={() => send({ type: "RESTART" })}
            >
              Reset Game
            </ResetButton>
          </GameOverWrapper>
        </>
      )}
    </Container>
  );
}
