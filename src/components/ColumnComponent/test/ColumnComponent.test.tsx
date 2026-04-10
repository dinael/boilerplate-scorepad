import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ColumnComponent } from "../../ColumnComponent/ColumnComponent";
import { defaultConfig, Column } from "../../../types";
import React from "react";

const createColumn = (overrides: Partial<Column> = {}): Column => ({
  id: 1,
  name: "Player 1",
  points: 10,
  inputs: [
    { id: 1, value: 5 },
    { id: 2, value: 3 },
    { id: 3, value: 2 },
  ],
  ...overrides,
});

describe("ColumnComponent", () => {
  it("renders player name input", () => {
    const column = createColumn();
    const onChangeName = () => {};
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={false}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByDisplayValue("Player 1")).toBeInTheDocument();
  });

  it("renders points inputs", () => {
    const column = createColumn();
    const onChangeName = () => {};
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={false}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    const inputs = document.querySelectorAll('input[type="number"]');
    expect(inputs.length).toBe(3);
  });

  it("renders total points display", () => {
    const column = createColumn({ points: 10 });
    const onChangeName = () => {};
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={false}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText(/Points: 10/)).toBeInTheDocument();
  });

  it("renders delete button", () => {
    const column = createColumn();
    const onChangeName = () => {};
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={false}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    expect(screen.getByText("Delete column")).toBeInTheDocument();
  });

  it("calls onChangeName when name changes", () => {
    let called = false;
    const column = createColumn();
    const onChangeName = () => { called = true; };
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={false}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    const input = screen.getByDisplayValue("Player 1");
    fireEvent.change(input, { target: { value: "New Name" } });
    expect(called).toBe(true);
  });

  it("disables inputs when finished", () => {
    const column = createColumn();
    const onChangeName = () => {};
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={true}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    const nameInput = screen.getByDisplayValue("Player 1") as HTMLInputElement;
    expect(nameInput.readOnly).toBe(true);
  });

  it("disables delete button when finished", () => {
    const column = createColumn();
    const onChangeName = () => {};
    const onChangePoints = () => {};
    const onRemoveColumn = () => {};
    
    render(
      <ColumnComponent
        column={column}
        finished={true}
        onChangeName={onChangeName}
        onChangePoints={onChangePoints}
        onRemoveColumn={onRemoveColumn}
        config={defaultConfig}
      />
    );
    
    const deleteBtn = screen.getByText("Delete column").closest("button") as HTMLButtonElement;
    expect(deleteBtn.disabled).toBe(true);
  });
});