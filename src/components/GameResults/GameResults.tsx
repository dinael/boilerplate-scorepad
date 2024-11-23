import { FC, memo } from "react";
import { Column } from "./types";

export type GameResultsProps = {
  winner: string;
  pointsWinner: number;
  tied: Column[];
  otherColumns: Column[];
}

export const GameResults: FC<GameResultsProps> = memo(
  ({ winner, pointsWinner, tied, otherColumns }) => (
    <>
      <h2 className="">Game Results</h2>
      <p className="">
        {winner} {pointsWinner > 0 && `- ${pointsWinner} points`}
      </p>
      {tied.length > 0 && (
        <>
          <h3 className="">Tie</h3>
          <ol className="">
            {tied.map((column) => (
              <li key={column.id} className="">
                {column.name} - {column.points} points
              </li>
            ))}
          </ol>
        </>
      )}
      {otherColumns.length > 0 && (
        <>
          <h3 className="">Ranking</h3>
          <ol className="">
            {otherColumns.map((column) => (
              <li key={column.id} className="">
                {column.name} - {column.points} points
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  )
);

export default GameResults;
