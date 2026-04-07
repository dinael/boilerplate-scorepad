import React, { memo, useRef, useImperativeHandle, forwardRef } from "react";
import styles from "./GameControls.module.scss";
import { GameConfig } from "../../types";

export type GameControlsProps = {
  onAddColumn: () => void;
  onFinishGame: () => void;
  onNewGame: () => void;
  finished: boolean;
  allZeros: boolean;
  config: GameConfig;
}

export interface GameControlsRef {
  focus: () => void;
}

export const GameControls = memo(
  forwardRef<GameControlsRef, GameControlsProps>(
    ({ onAddColumn, onFinishGame, onNewGame, finished, allZeros, config }, ref) => {
      const containerRef = useRef<HTMLDivElement>(null);
      
      useImperativeHandle(ref, () => ({
        focus: () => {
          const firstButton = containerRef.current?.querySelector('button');
          firstButton?.focus();
        }
      }));

      return (
        <div ref={containerRef} className={styles.controls} role="group" aria-label="Game controls">
          <button
            onClick={onAddColumn}
            className={`${styles.controls__btn} ${styles.controls__btn_add}`}
            disabled={finished}
            aria-label={`${config.messages.addColumn}`}
          >
            {config.messages.addColumn}
          </button>
          <button
            onClick={onFinishGame}
            className={`${styles.controls__btn} ${styles.controls__btn_finish}`}
            disabled={finished || allZeros}
            aria-label={`${config.messages.finishGame}`}
          >
            {config.messages.finishGame}
          </button>
          <button
            onClick={onNewGame}
            className={`${styles.controls__btn} ${styles.controls__btn_new}`}
            aria-label={`${config.messages.newGame}`}
          >
            {config.messages.newGame}
          </button>
        </div>
      );
    }
  )
);

export default GameControls;
