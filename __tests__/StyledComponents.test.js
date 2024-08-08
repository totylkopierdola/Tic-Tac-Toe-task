import React from "react";
import renderer from "react-test-renderer";
import {
  Container,
  Title,
  PlayerTurn,
  BoardWrapper,
  Board,
  Tile,
  ResetButton,
  Overlay,
  GameOverWrapper,
} from "../src/components/StyledComponents";

describe("Styled Components Snapshot Testing", () => {
  test("renders Container correctly", () => {
    const tree = renderer.create(<Container />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Title correctly", () => {
    const tree = renderer.create(<Title>Game Title</Title>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders PlayerTurn correctly for player X", () => {
    const tree = renderer
      .create(<PlayerTurn $player="x">Player X's Turn</PlayerTurn>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders PlayerTurn correctly for player O", () => {
    const tree = renderer
      .create(<PlayerTurn $player="o">Player O's Turn</PlayerTurn>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders BoardWrapper correctly", () => {
    const tree = renderer.create(<BoardWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Board correctly", () => {
    const tree = renderer.create(<Board />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Tile correctly when empty", () => {
    const tree = renderer
      .create(<Tile $value={null} $isClickable={true} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Tile correctly for X", () => {
    const tree = renderer
      .create(<Tile $value="x" $isClickable={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Tile correctly for O", () => {
    const tree = renderer
      .create(<Tile $value="o" $isClickable={false} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders ResetButton correctly", () => {
    const tree = renderer
      .create(<ResetButton>Reset Game</ResetButton>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders Overlay correctly", () => {
    const tree = renderer.create(<Overlay $show={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders GameOverWrapper correctly with a winner", () => {
    const tree = renderer
      .create(
        <GameOverWrapper $winner="x">
          <h2>Player X Wins!</h2>
        </GameOverWrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders GameOverWrapper correctly without a winner (draw)", () => {
    const tree = renderer
      .create(
        <GameOverWrapper $winner={null}>
          <h2>Draw!</h2>
        </GameOverWrapper>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
