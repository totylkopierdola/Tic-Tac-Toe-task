import styled from "styled-components";

// Define common style variables
const theme = {
  primaryColor: "#007bff",
  secondaryColor: "#d9534f",
  backgroundColor: "#f4f4f4",
  tileBackgroundColor: "#fff",
  tileColorX: "#fff",
  tileColorO: "#fff",
  borderColor: "#ccc",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  buttonBackgroundColor: "#829684ae",
  buttonHoverColor: "#1a9727",
  textColor: "#333",
  drawColor: "#666",
  borderRadius: "5px",
  fontSizeSmall: "1rem",
  fontSizeMedium: "1.25rem",
  fontSizeLarge: "2rem",
};

export const Container = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

export const Title = styled.h1`
  margin: 0.5rem 0;
  font-size: ${theme.fontSizeLarge};
  font-weight: bold;
  text-align: center;
`;

export const PlayerTurn = styled.div`
  font-size: ${theme.fontSizeMedium};
  font-weight: 500;
  text-align: center;
  color: ${({ $player }) =>
    $player === "x"
      ? theme.primaryColor
      : $player === "o"
      ? theme.secondaryColor
      : theme.textColor};
  background: ${theme.backgroundColor};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  box-shadow: ${theme.boxShadow};
  margin: 1rem 0;
  border: 1px solid ${theme.borderColor};
  text-transform: capitalize;
`;

export const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

export const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.3rem;
  width: 20rem;
  height: 20rem;
`;

export const Tile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid ${theme.borderColor};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};
  background-color: ${({ $value }) =>
    $value === "x"
      ? theme.primaryColor
      : $value === "o"
      ? "#9d2c1b"
      : theme.tileBackgroundColor};
  color: ${({ $value }) =>
    $value === "x"
      ? theme.tileColorX
      : $value === "o"
      ? theme.tileColorO
      : "#000"};
  font-size: ${theme.fontSizeLarge};
  font-weight: bold;
  border-radius: ${theme.borderRadius};
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    outline: ${({ $isClickable }) =>
      $isClickable ? "2px solid #00000038" : "none"};
  }

  /* Apply aria-disabled as a data attribute for testing */
  /* &[aria-disabled="true"] {
    cursor: not-allowed;
    background-color: ${theme.disabledTileColor};
  } */
`;

export const ResetButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: ${theme.buttonBackgroundColor};
  color: #fff;
  font-size: ${theme.fontSizeSmall};
  cursor: pointer;
  border-radius: ${theme.borderRadius};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.buttonHoverColor};
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ $show }) => ($show ? "block" : "none")};
  z-index: 1;
`;

export const GameOverWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  z-index: 2;
  width: 80%;
  max-width: 400px;

  h2 {
    font-size: ${theme.fontSizeLarge};
    margin-bottom: 1rem;
    color: ${({ $winner }) =>
      $winner === "x"
        ? theme.primaryColor
        : $winner === "o"
        ? theme.secondaryColor
        : theme.textColor};
  }

  p {
    font-size: ${theme.fontSizeMedium};
    margin: 0.5rem 0;
    color: ${theme.drawColor};
  }
`;
