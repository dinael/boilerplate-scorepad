import { FC, useCallback, useMemo, useReducer } from "react";
import styles from "./PointCalculator.module.scss";
import ColumnComponent from "../ColumnComponent/ColumnComponent";
import GameControls from "../GameControls/GameControls";
import GameResults from "../GameResults/GameResults";
import { Column, Input } from "./types";

type GameState = {
  columns: Column[];
  finished: boolean;
  winner: string;
  pointsWinner: number;
  tied: Column[];
  otherColumns: Column[];
};

type GameAction =
  | { type: "UPDATE_COLUMN"; payload: { id: number; updates: Partial<Column> } }
  | { type: "CHANGE_NAME"; payload: { id: number; name: string } }
  | {
      type: "CHANGE_POINTS";
      payload: { columnId: number; inputId: number; value: number };
    }
  | { type: "ADD_COLUMN" }
  | { type: "REMOVE_COLUMN"; payload: { id: number } }
  | { type: "FINISH_GAME" }
  | { type: "NEW_GAME" };

const initialState: GameState = {
  columns: [
    {
      id: 1,
      name: "Player 1",
      points: 0,
      inputs: [
        { id: 1, value: 0 },
        { id: 2, value: 0 },
        { id: 3, value: 0 },
      ],
    },
  ],
  finished: false,
  winner: "",
  pointsWinner: 0,
  tied: [],
  otherColumns: [],
};

const calculatePoints = (inputs: Input[]): number =>
  inputs.reduce(
    (acc, input) => acc + (isNaN(input.value) ? 0 : input.value),
    0
  );

const gameReducer = (state: GameState, action: GameAction): GameState => {
  const actions = {
    UPDATE_COLUMN: () => ({
      ...state,
      columns: state.columns.map((column) =>
        column.id === action.payload.id
          ? { ...column, ...action.payload.updates }
          : column
      ),
    }),
    CHANGE_NAME: () => ({
      ...state,
      columns: state.columns.map((column) =>
        column.id === action.payload.id
          ? { ...column, name: action.payload.name }
          : column
      ),
    }),
    CHANGE_POINTS: () => ({
      ...state,
      columns: state.columns.map((column) =>
        column.id === action.payload.columnId
          ? {
              ...column,
              inputs: column.inputs.map((input) =>
                input.id === action.payload.inputId
                  ? { ...input, value: action.payload.value }
                  : input
              ),
              points: calculatePoints(
                column.inputs.map((input) =>
                  input.id === action.payload.inputId
                    ? { ...input, value: action.payload.value }
                    : input
                )
              ),
            }
          : column
      ),
    }),
    ADD_COLUMN: () => ({
      ...state,
      columns: [
        ...state.columns,
        {
          id: state.columns.length + 1,
          name: `Player ${state.columns.length + 1}`,
          points: 0,
          inputs: [
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
          ],
        },
      ],
    }),
    REMOVE_COLUMN: () => ({
      ...state,
      columns: state.columns.filter(
        (column) => column.id !== action.payload.id
      ),
    }),
    FINISH_GAME: () => {
      const sortedColumns = [...state.columns].sort((a, b) => b.points - a.points);
      const maxPoints = sortedColumns[0]?.points ?? 0;
      const tiedColumns = sortedColumns.filter((column) => column.points === maxPoints);
      const isTie = tiedColumns.length > 1;
      return {
        ...state,
        finished: true,
        winner: isTie ? "Oh! There has been a tie" : tiedColumns[0]?.name ?? "",
        pointsWinner: tiedColumns[0]?.points ?? 0,
        tied: isTie ? tiedColumns : [],
        otherColumns: sortedColumns.filter((column) => !tiedColumns.includes(column)),
      };
    },
    NEW_GAME: () => ({
      ...state,
      columns: state.columns.map((column) => ({
        ...column,
        points: 0,
        inputs: column.inputs.map((input) => ({ ...input, value: 0 })),
      })),
      finished: false,
      winner: "",
      pointsWinner: 0,
      tied: [],
      otherColumns: [],
    }),
  };

  return actions[action.type]?.() ?? state;
};

const PointsCalculator: FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleChangeName = useCallback((id: number, name: string) => {
    dispatch({ type: "CHANGE_NAME", payload: { id, name } });
  }, []);

  const handleChangePoints = useCallback(
    (columnId: number, inputId: number, value: number) => {
      dispatch({
        type: "CHANGE_POINTS",
        payload: { columnId, inputId, value },
      });
    },
    []
  );

  const handleAddColumn = useCallback(() => {
    dispatch({ type: "ADD_COLUMN" });
  }, []);

  const handleRemoveColumn = useCallback((id: number) => {
    dispatch({ type: "REMOVE_COLUMN", payload: { id } });
  }, []);

  const handleFinished = useCallback(() => {
    dispatch({ type: "FINISH_GAME" });
  }, []);

  const handleNewGame = useCallback(() => {
    dispatch({ type: "NEW_GAME" });
  }, []);

  const allZeros = useMemo(
    () => state.columns.every((column) => column.points === 0),
    [state.columns]
  );

  return (
    <div className={styles.container}>
      <div className="">
        {state.columns.map((column) => (
          <ColumnComponent
            key={column.id}
            column={column}
            finished={state.finished}
            onChangeName={handleChangeName}
            onChangePoints={handleChangePoints}
            onRemoveColumn={handleRemoveColumn}
          />
        ))}
      </div>
      <GameControls
        onAddColumn={handleAddColumn}
        onFinishGame={handleFinished}
        onNewGame={handleNewGame}
        finished={state.finished}
        allZeros={allZeros}
      />
      {state.finished && (
        <GameResults
          winner={state.winner}
          pointsWinner={state.pointsWinner}
          tied={state.tied}
          otherColumns={state.otherColumns}
        />
      )}
    </div>
  );
};

export default PointsCalculator;