import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { GameControls } from "../../GameControls/GameControls";
import { defaultConfig } from "../../../types";
import React from "react";

describe("GameControls", () => {
  it("renders add column button", () => {
    const onAddColumn = () => {};
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={false}
        allZeros={false}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText("Add column")).toBeInTheDocument();
  });

  it("renders finished button", () => {
    const onAddColumn = () => {};
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={false}
        allZeros={false}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText("Finished")).toBeInTheDocument();
  });

  it("renders new game button", () => {
    const onAddColumn = () => {};
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={false}
        allZeros={false}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText("New game")).toBeInTheDocument();
  });

  it("disables add column when finished", () => {
    const onAddColumn = () => {};
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={true}
        allZeros={false}
        config={defaultConfig}
      />
    );
    
    const addBtn = screen.getByText("Add column").closest("button") as HTMLButtonElement;
    expect(addBtn.disabled).toBe(true);
  });

  it("disables finished button when finished", () => {
    const onAddColumn = () => {};
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={true}
        allZeros={false}
        config={defaultConfig}
      />
    );
    
    const finishBtn = screen.getByText("Finished").closest("button") as HTMLButtonElement;
    expect(finishBtn.disabled).toBe(true);
  });

  it("disables finished button when all zeros", () => {
    const onAddColumn = () => {};
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={false}
        allZeros={true}
        config={defaultConfig}
      />
    );
    
    const finishBtn = screen.getByText("Finished").closest("button") as HTMLButtonElement;
    expect(finishBtn.disabled).toBe(true);
  });

  it("calls onAddColumn when button clicked", () => {
    let called = false;
    const onAddColumn = () => { called = true; };
    const onFinishGame = () => {};
    const onNewGame = () => {};
    
    render(
      <GameControls
        onAddColumn={onAddColumn}
        onFinishGame={onFinishGame}
        onNewGame={onNewGame}
        finished={false}
        allZeros={false}
        config={defaultConfig}
      />
    );
    
    fireEvent.click(screen.getByText("Add column"));
    expect(called).toBe(true);
  });
});