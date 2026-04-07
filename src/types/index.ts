export type GameType = "highest" | "lowest";

export type GameMessages = {
  winner: string;
  tie: string;
  ranking: string;
  loading: string;
  addColumn: string;
  finishGame: string;
  newGame: string;
  deleteColumn: string;
  playerName: string;
  round: string;
  points: string;
  columnLabel: string;
};

export type GameConfig = {
  rounds: number;
  gameType: GameType;
  defaultPlayerName: string;
  messages: GameMessages;
};

export const defaultConfig: GameConfig = {
  rounds: 3,
  gameType: "highest",
  defaultPlayerName: "Player",
  messages: {
    winner: "Winner",
    tie: "Tie",
    ranking: "Ranking",
    loading: "Loading...",
    addColumn: "Add column",
    finishGame: "Finished",
    newGame: "New game",
    deleteColumn: "Delete column",
    playerName: "Name",
    round: "Round",
    points: "Points",
    columnLabel: "Player",
  },
};

export type Input = {
  id: number;
  value: number;
};

export type Column = {
  id: number;
  name: string;
  points: number;
  inputs: Input[];
};

export type GameState = {
  columns: Column[];
  finished: boolean;
  winner: string;
  pointsWinner: number;
  tied: Column[];
  otherColumns: Column[];
};

export type GameAction =
  | { type: "UPDATE_COLUMN"; payload: { id: number; updates: Partial<Column> } }
  | { type: "CHANGE_NAME"; payload: { id: number; name: string } }
  | {
      type: "CHANGE_POINTS";
      payload: { columnId: number; inputId: number; value: number };
    }
  | { type: "ADD_COLUMN" }
  | { type: "REMOVE_COLUMN"; payload: { id: number } }
  | { type: "FINISH_GAME" }
  | { type: "NEW_GAME" }
  | { type: "LOAD_STATE"; payload: GameState }
  | { type: "UPDATE_CONFIG"; payload: Partial<GameConfig> };
