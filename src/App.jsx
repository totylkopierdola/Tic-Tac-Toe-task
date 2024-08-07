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
        <Board>
          {[...new Array(9).keys()].map((index) => (
            <Tile
              key={index}
              $isClickable={!state.context.board[index]}
              $value={state.context.board[index]}
              onClick={() => send({ type: "MAKE_MOVE", position: index })}
            >
              {state.context.board[index]}
            </Tile>
          ))}
        </Board>
      </BoardWrapper>

      <PlayerTurn $player={state.context.currentPlayer}>
        {state.matches("inProgress") ? (
          <p>It is Player {state.context.currentPlayer}'s turn</p>
        ) : (
          <p>Game Over</p>
        )}
      </PlayerTurn>

      {state.matches("gameOver") && (
        <>
          <Overlay $show={true} />
          <GameOverWrapper $winner={state.context.gameWinner}>
            <h2>
              {state.hasTag("hasWinner")
                ? `Player ${state.context.gameWinner} Wins!`
                : "It's a Draw!"}
            </h2>
            <p>
              {state.hasTag("hasWinner") ? "Congratulations!" : "Good effort!"}
            </p>
            <ResetButton onClick={() => send({ type: "RESTART" })}>
              Reset Game
            </ResetButton>
          </GameOverWrapper>
        </>
      )}
    </Container>
  );
}
