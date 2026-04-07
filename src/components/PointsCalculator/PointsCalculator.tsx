import { FC, useCallback, useMemo, useReducer, useEffect, useRef, useState } from "react";
import styles from "./PointCalculator.module.scss";
import ColumnComponent from "../ColumnComponent/ColumnComponent";
import GameControls, { GameControlsRef } from "../GameControls/GameControls";
import GameResults from "../GameResults/GameResults";
import Settings from "../Settings/Settings";
import { Input, GameState, GameAction, GameConfig, defaultConfig, Column } from "../../types";

const STORAGE_KEY = "scorepad-game-state";
const CONFIG_KEY = "scorepad-game-config";

const createInitialColumns = (config: GameConfig): Column[] => [
  {
    id: 1,
    name: `${config.defaultPlayerName} 1`,
    points: 0,
    inputs: Array.from({ length: config.rounds }, (_, i) => ({
      id: i + 1,
      value: 0,
    })),
  },
];

const getInitialState = (config: GameConfig): GameState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const inputs = Array.from({ length: config.rounds }, (_, i) => ({
        id: i + 1,
        value: 0,
      }));
      return {
        ...parsed,
        columns: parsed.columns.map((col: Column) => ({
          ...col,
          inputs: col.inputs.length === config.rounds 
            ? col.inputs 
            : inputs.map((input, i) => ({
                ...input,
                value: col.inputs[i]?.value ?? 0,
              })),
        })),
      };
    } catch {
      console.warn("Failed to parse stored game state");
    }
  }
  return {
    columns: createInitialColumns(config),
    finished: false,
    winner: "",
    pointsWinner: 0,
    tied: [],
    otherColumns: [],
  };
};

const getInitialConfig = (): GameConfig => {
  const stored = localStorage.getItem(CONFIG_KEY);
  if (stored) {
    try {
      return { ...defaultConfig, ...JSON.parse(stored) };
    } catch {
      console.warn("Failed to parse stored config");
    }
  }
  return defaultConfig;
};

const calculatePoints = (inputs: Input[]): number =>
  inputs.reduce(
    (acc, input) => acc + (isNaN(input.value) ? 0 : input.value),
    0
  );

const createGameReducer = (config: GameConfig) => (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "LOAD_STATE":
      return action.payload;

    case "UPDATE_COLUMN":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.id
            ? { ...column, ...action.payload.updates }
            : column
        ),
      };

    case "CHANGE_NAME":
      return {
        ...state,
        columns: state.columns.map((column) =>
          column.id === action.payload.id
            ? { ...column, name: action.payload.name }
            : column
        ),
      };

    case "CHANGE_POINTS":
      return {
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
      };

    case "ADD_COLUMN":
      return {
        ...state,
        columns: [
          ...state.columns,
          {
            id: state.columns.length + 1,
            name: `${config.defaultPlayerName} ${state.columns.length + 1}`,
            points: 0,
            inputs: Array.from({ length: config.rounds }, (_, i) => ({
              id: i + 1,
              value: 0,
            })),
          },
        ],
      };

    case "REMOVE_COLUMN":
      return {
        ...state,
        columns: state.columns.filter(
          (column) => column.id !== action.payload.id
        ),
      };

    case "FINISH_GAME": {
      const sortedColumns = [...state.columns].sort((a, b) => 
        config.gameType === "highest" ? b.points - a.points : a.points - b.points
      );
      const winningPoints = sortedColumns[0]?.points ?? 0;
      const winners = sortedColumns.filter((column) => column.points === winningPoints);
      const isTie = winners.length > 1;
      return {
        ...state,
        finished: true,
        winner: isTie ? config.messages.tie : winners[0]?.name ?? "",
        pointsWinner: winners[0]?.points ?? 0,
        tied: isTie ? winners : [],
        otherColumns: sortedColumns.filter((column) => !winners.includes(column)),
      };
    }

    case "NEW_GAME":
      return {
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
      };

    default:
      return state;
  }
};

type ConfigAction = { type: "SET_CONFIG"; payload: GameConfig } | { type: "UPDATE"; payload: Partial<GameConfig> };

const configReducer = (state: GameConfig, action: ConfigAction): GameConfig => {
  switch (action.type) {
    case "SET_CONFIG":
      return action.payload;
    case "UPDATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const PointsCalculator: FC = () => {
  const [config, configDispatch] = useReducer(configReducer, undefined, getInitialConfig);
  const gameReducer = useMemo(() => createGameReducer(config), [config]);
  const [state, dispatch] = useReducer(gameReducer, undefined, () => getInitialState(config));
  const resultsRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<GameControlsRef>(null);
  const lastSavedState = useRef<string>("");
  const lastSavedConfig = useRef<string>("");

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stateString = JSON.stringify(state);
    if (stateString !== lastSavedState.current) {
      lastSavedState.current = stateString;
      localStorage.setItem(STORAGE_KEY, stateString);
    }
  }, [state]);

  useEffect(() => {
    const configString = JSON.stringify(config);
    if (configString !== lastSavedConfig.current) {
      lastSavedConfig.current = configString;
      localStorage.setItem(CONFIG_KEY, configString);
    }
  }, [config]);

  useEffect(() => {
    if (state.finished && resultsRef.current) {
      resultsRef.current.focus();
    }
  }, [state.finished]);

  const handleConfigChange = useCallback((newConfig: Partial<GameConfig>) => {
    configDispatch({ type: "UPDATE", payload: newConfig });
  }, []);

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
    if (controlsRef.current) {
      controlsRef.current.focus();
    }
    dispatch({ type: "NEW_GAME" });
  }, []);

  const allZeros = useMemo(
    () => state.columns.every((column) => column.points === 0),
    [state.columns]
  );

  const sortedColumns = useMemo(() => {
    return [...state.columns].sort((a, b) => 
      config.gameType === "highest" ? b.points - a.points : a.points - b.points
    );
  }, [state.columns, config.gameType]);

  const winnerData = useMemo(() => {
    const firstPlace = sortedColumns[0];
    const winningPoints = firstPlace?.points ?? 0;
    const winners = sortedColumns.filter(c => 
      config.gameType === "highest" ? c.points === winningPoints : c.points === winningPoints
    );
    const isTie = winners.length > 1;
    return {
      winner: isTie ? config.messages.tie : firstPlace?.name ?? "",
      pointsWinner: winningPoints,
      tied: isTie ? winners : [],
      otherColumns: sortedColumns.filter(c => !winners.includes(c)),
    };
  }, [sortedColumns, config.gameType, config.messages.tie]);

  return (
    <div className={styles.container}>
      <button 
        onClick={() => setShowSettings(!showSettings)}
        className={styles.settings_toggle}
        aria-expanded={showSettings}
        aria-controls="settings-panel"
      >
        {showSettings ? "Hide Settings" : "Show Settings"}
      </button>
      
      {showSettings && (
        <div id="settings-panel">
          <Settings config={config} onConfigChange={handleConfigChange} />
        </div>
      )}
      
      <div className={styles.columns_wrapper}>
        {state.columns.map((column) => (
          <ColumnComponent
            key={column.id}
            column={column}
            finished={state.finished}
            onChangeName={handleChangeName}
            onChangePoints={handleChangePoints}
            onRemoveColumn={handleRemoveColumn}
            config={config}
          />
        ))}
      </div>
      <GameControls
        ref={controlsRef}
        onAddColumn={handleAddColumn}
        onFinishGame={handleFinished}
        onNewGame={handleNewGame}
        finished={state.finished}
        allZeros={allZeros}
        config={config}
      />
      {state.finished && (
        <div ref={resultsRef} tabIndex={-1} aria-live="polite">
          <GameResults
            winner={winnerData.winner}
            pointsWinner={winnerData.pointsWinner}
            tied={winnerData.tied}
            otherColumns={winnerData.otherColumns}
            config={config}
          />
        </div>
      )}
    </div>
  );
};

export default PointsCalculator;