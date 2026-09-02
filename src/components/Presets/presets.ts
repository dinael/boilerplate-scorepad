import { GameConfig, defaultConfig } from "../../types";

export type Preset = {
  name: string;
  config: Partial<GameConfig>;
  description?: string;
};

export const PRESETS: Preset[] = [
  {
    name: "Default",
    config: defaultConfig,
    description: "3 rounds, highest score wins",
  },
  {
    name: "Bowling",
    config: {
      rounds: 10,
      gameType: "highest",
      defaultPlayerName: "Bowler",
      messages: {
        winner: "Winner",
        tie: "Tie",
        ranking: "Standing",
        loading: "Loading...",
        addColumn: "Add Bowler",
        finishGame: "Game Over",
        newGame: "New Game",
        deleteColumn: "Remove Bowler",
        playerName: "Name",
        round: "Frame",
        points: "Score",
        columnLabel: "Bowler",
      },
    },
    description: "10 frames, highest score wins",
  },
  {
    name: "Golf",
    config: {
      rounds: 9,
      gameType: "lowest",
      defaultPlayerName: "Golfer",
      messages: {
        winner: "Winner",
        tie: "Tie",
        ranking: "Standing",
        loading: "Loading...",
        addColumn: "Add Golfer",
        finishGame: "Finish",
        newGame: "New Round",
        deleteColumn: "Remove Golfer",
        playerName: "Name",
        round: "Hole",
        points: "Strokes",
        columnLabel: "Golfer",
      },
    },
    description: "9 holes, lowest score wins",
  },
  {
    name: "Mario Kart",
    config: {
      rounds: 4,
      gameType: "highest",
      defaultPlayerName: "Player",
      messages: {
        winner: "Winner!",
        tie: "Draw!",
        ranking: "Standings",
        loading: "Loading...",
        addColumn: "Add Racer",
        finishGame: "Race Complete",
        newGame: "New Race",
        deleteColumn: "Remove Racer",
        playerName: "Name",
        round: "Race",
        points: "Points",
        columnLabel: "Racer",
      },
    },
    description: "4 races, highest points wins",
  },
  {
    name: "UNO",
    config: {
      rounds: 4,
      gameType: "lowest",
      defaultPlayerName: "Player",
      messages: {
        winner: "Winner",
        tie: "Draw",
        ranking: "Final Scores",
        loading: "Loading...",
        addColumn: "Add Player",
        finishGame: "End Game",
        newGame: "New Game",
        deleteColumn: "Remove Player",
        playerName: "Name",
        round: "Round",
        points: "Score",
        columnLabel: "Player",
      },
    },
    description: "4 rounds, lowest score wins",
  },
];
