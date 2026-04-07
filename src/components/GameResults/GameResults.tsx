import { FC, memo } from "react";
import { Column, GameConfig } from "../../types";
import styles from "./GameResults.module.scss";

export type GameResultsProps = {
  winner: string;
  pointsWinner: number;
  tied: Column[];
  otherColumns: Column[];
  config: GameConfig;
}

export const GameResults: FC<GameResultsProps> = memo(
  ({ winner, pointsWinner, tied, otherColumns, config }) => (
    <div className={styles.results} role="region" aria-labelledby="results-heading">
      <h2 id="results-heading">{config.messages.winner}</h2>
      <p className={styles.results__winner} role="status">
        {winner} {pointsWinner > 0 && `- ${pointsWinner} ${config.messages.points}`}
      </p>
      {tied.length > 0 && (
        <section aria-labelledby="tied-heading">
          <h3 id="tied-heading">{config.messages.tie}</h3>
          <ol>
            {tied.map((column) => (
              <li key={column.id}>
                {column.name} - {column.points} {config.messages.points}
              </li>
            ))}
          </ol>
        </section>
      )}
      {otherColumns.length > 0 && (
        <section aria-labelledby="ranking-heading">
          <h3 id="ranking-heading">{config.messages.ranking}</h3>
          <ol>
            {otherColumns.map((column) => (
              <li key={column.id}>
                {column.name} - {column.points} {config.messages.points}
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  )
);

export default GameResults;
