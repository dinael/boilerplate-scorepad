import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GameResults } from "../../GameResults/GameResults";
import { defaultConfig, Column } from "../../../types";
import React from "react";

const createColumn = (overrides: Partial<Column> = {}): Column => ({
  id: 1,
  name: "Player 1",
  points: 10,
  inputs: [],
  ...overrides,
});

describe("GameResults", () => {
  it("renders winner with name and points", () => {
    const columns = [createColumn({ name: "Player 1", points: 10 })];
    
    render(
      <GameResults
        winner="Player 1"
        pointsWinner={10}
        tied={[]}
        otherColumns={columns.slice(1)}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText(/Player 1 - 10 Points/)).toBeInTheDocument();
  });

  it("renders tie section when tied", () => {
    const tied = [
      createColumn({ id: 1, name: "Player 1", points: 10 }),
      createColumn({ id: 2, name: "Player 2", points: 10 }),
    ];
    
    render(
      <GameResults
        winner="Tie"
        pointsWinner={10}
        tied={tied}
        otherColumns={[]}
        config={defaultConfig}
      />
    );
    
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Tie");
  });

  it("renders ranking section when there are other columns", () => {
    const winner = createColumn({ name: "Player 1", points: 15 });
    const otherColumns = [
      createColumn({ id: 2, name: "Player 2", points: 10 }),
      createColumn({ id: 3, name: "Player 3", points: 5 }),
    ];
    
    render(
      <GameResults
        winner="Player 1"
        pointsWinner={15}
        tied={[]}
        otherColumns={otherColumns}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText(/Ranking/)).toBeInTheDocument();
  });

  it("renders multiple players in ranking", () => {
    const otherColumns = [
      createColumn({ id: 2, name: "Player 2", points: 10 }),
      createColumn({ id: 3, name: "Player 3", points: 5 }),
    ];
    
    render(
      <GameResults
        winner="Player 1"
        pointsWinner={15}
        tied={[]}
        otherColumns={otherColumns}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText(/Player 2 - 10 Points/)).toBeInTheDocument();
    expect(screen.getByText(/Player 3 - 5 Points/)).toBeInTheDocument();
  });
});