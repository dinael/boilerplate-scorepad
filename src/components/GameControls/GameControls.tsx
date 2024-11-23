import React, { FC, memo } from "react";

export type GameControlsProps = {
  onAddColumn: () => void;
  onFinishGame: () => void;
  onNewGame: () => void;
  finished: boolean;
  allZeros: boolean;
}

export const GameControls: FC<GameControlsProps> = memo(
  ({ onAddColumn, onFinishGame, onNewGame, finished, allZeros }) => (
    <div className="">
      <button
        onClick={onAddColumn}
        className=""
        disabled={finished}
      >
        Add column
      </button>
      <button
        onClick={onFinishGame}
        className=""
        disabled={finished || allZeros}
      >
        Finished
      </button>
      <button
        onClick={onNewGame}
        className=""
      >
        New game
      </button>
    </div>
  )
);

export default GameControls;
