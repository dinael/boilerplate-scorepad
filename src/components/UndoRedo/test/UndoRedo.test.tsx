import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UndoRedo } from "../../UndoRedo/UndoRedo";
import React from "react";

describe("UndoRedo", () => {
  it("renders both buttons", () => {
    const onUndo = () => {};
    const onRedo = () => {};
    
    render(<UndoRedo canUndo={false} canRedo={false} onUndo={onUndo} onRedo={onRedo} />);
    
    expect(screen.getByText(/← Undo/)).toBeInTheDocument();
    expect(screen.getByText(/Redo →/)).toBeInTheDocument();
  });

  it("undo button is disabled when canUndo is false", () => {
    const onUndo = () => {};
    const onRedo = () => {};
    
    render(<UndoRedo canUndo={false} canRedo={false} onUndo={onUndo} onRedo={onRedo} />);
    
    const undoBtn = screen.getByText(/← Undo/).closest("button") as HTMLButtonElement;
    expect(undoBtn.disabled).toBe(true);
  });

  it("redo button is disabled when canRedo is false", () => {
    const onUndo = () => {};
    const onRedo = () => {};
    
    render(<UndoRedo canUndo={false} canRedo={false} onUndo={onUndo} onRedo={onRedo} />);
    
    const redoBtn = screen.getByText(/Redo →/).closest("button") as HTMLButtonElement;
    expect(redoBtn.disabled).toBe(true);
  });

  it("undo button is enabled when canUndo is true", () => {
    const onUndo = () => {};
    const onRedo = () => {};
    
    render(<UndoRedo canUndo={true} canRedo={false} onUndo={onUndo} onRedo={onRedo} />);
    
    const undoBtn = screen.getByText(/← Undo/).closest("button") as HTMLButtonElement;
    expect(undoBtn.disabled).toBe(false);
  });

  it("calls onUndo when undo button clicked", () => {
    let called = false;
    const onUndo = () => { called = true; };
    const onRedo = () => {};
    
    render(<UndoRedo canUndo={true} canRedo={false} onUndo={onUndo} onRedo={onRedo} />);
    
    fireEvent.click(screen.getByText(/← Undo/));
    expect(called).toBe(true);
  });

  it("calls onRedo when redo button clicked", () => {
    let called = false;
    const onUndo = () => {};
    const onRedo = () => { called = true; };
    
    render(<UndoRedo canUndo={false} canRedo={true} onUndo={onUndo} onRedo={onRedo} />);
    
    fireEvent.click(screen.getByText(/Redo →/));
    expect(called).toBe(true);
  });
});