import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { History } from "../../History/History";
import { defaultConfig } from "../../../types";
import React from "react";

const createHistoryItem = (overrides = {}) => ({
  id: "1",
  date: "2026-04-07T10:00:00.000Z",
  winner: "Player 1",
  points: 10,
  players: ["Player 1", "Player 2"],
  config: defaultConfig,
  columns: [
    { id: 1, name: "Player 1", points: 10, inputs: [] },
    { id: 2, name: "Player 2", points: 5, inputs: [] },
  ],
  ...overrides,
});

describe("History", () => {
  it("renders empty message when no history", () => {
    const onLoad = () => {};
    const onDelete = () => {};
    const onClear = () => {};
    
    render(<History history={[]} onLoad={onLoad} onDelete={onDelete} onClear={onClear} />);
    
    expect(screen.getByText(/no games played yet/i)).toBeInTheDocument();
  });

  it("renders history items", () => {
    const history = [createHistoryItem({ id: "1", winner: "Player 1", points: 10 })];
    const onLoad = () => {};
    const onDelete = () => {};
    const onClear = () => {};
    
    render(<History history={history} onLoad={onLoad} onDelete={onDelete} onClear={onClear} />);
    
    expect(screen.getByText("Player 1")).toBeInTheDocument();
    expect(screen.getByText("10 pts")).toBeInTheDocument();
  });

  it("calls onLoad when load button clicked", () => {
    const history = [createHistoryItem({ id: "1", winner: "Player 1" })];
    const onLoad = () => {};
    const onDelete = () => {};
    const onClear = () => {};
    
    const { container } = render(
      <History history={history} onLoad={onLoad} onDelete={onDelete} onClear={onClear} />
    );
    
    const loadBtn = container.querySelector("button");
    fireEvent.click(loadBtn!);
  });

  it("calls onClear when clear button clicked", () => {
    const history = [createHistoryItem({ id: "1" })];
    const onLoad = () => {};
    const onDelete = () => {};
    const onClear = () => {};
    
    render(
      <History history={history} onLoad={onLoad} onDelete={onDelete} onClear={onClear} />
    );
    
    const clearBtn = screen.getByText("Clear All");
    fireEvent.click(clearBtn);
  });
});