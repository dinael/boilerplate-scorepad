import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import PointsCalculator from "../PointsCalculator";
import React from "react";

describe("PointsCalculator", () => {
  it("renders initial state correctly", () => {
    render(<PointsCalculator />);
    expect(screen.getByDisplayValue("Player 1")).toBeInTheDocument();
    expect(screen.getByText("Points: 0")).toBeInTheDocument();
    expect(screen.getByText("Add column")).toBeInTheDocument();
    expect(screen.getByText("Finished")).toBeInTheDocument();
    expect(screen.getByText("New game")).toBeInTheDocument();
  });

  it('adds a new column when "Add column" is clicked', () => {
    render(<PointsCalculator />);
    fireEvent.click(screen.getByText("Add column"));
    expect(screen.getByDisplayValue("Player 2")).toBeInTheDocument();
  });

  it('removes a column when "Delete column" is clicked', () => {
    render(<PointsCalculator />);
    fireEvent.click(screen.getByText("Add column"));
    const deleteButtons = screen.getAllByText("Delete column");
    fireEvent.click(deleteButtons[1]);
    expect(screen.queryByDisplayValue("Player 2")).not.toBeInTheDocument();
  });

  it("updates column name when input changes", () => {
    render(<PointsCalculator />);
    const nameInput = screen.getByDisplayValue("Player 1");
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    expect(screen.getByDisplayValue("New Name")).toBeInTheDocument();
  });

  it("updates points when input changes", () => {
    render(<PointsCalculator />);
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    expect(screen.getByText("Points: 5")).toBeInTheDocument();
  });

  it("finishes the game and displays winner", () => {
    render(<PointsCalculator />);
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    fireEvent.click(screen.getByText("Finished"));
    expect(screen.getByText(/Player 1 - 5 Points/)).toBeInTheDocument();
  });

  it("handles tie correctly", () => {
    render(<PointsCalculator />);
    fireEvent.click(screen.getByText("Add column"));
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    fireEvent.change(pointInputs[3], { target: { value: "5" } });
    fireEvent.click(screen.getByText("Finished"));
    expect(screen.getByText(/Tie - 5 Points/)).toBeInTheDocument();
  });

  it('starts a new game when "New game" is clicked', () => {
    render(<PointsCalculator />);
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    fireEvent.click(screen.getByText("Finished"));
    fireEvent.click(screen.getByText("New game"));
    expect(screen.getByText("Points: 0")).toBeInTheDocument();
    expect(screen.queryByText("Player 1 - 5 points")).not.toBeInTheDocument();
  });

  it("persists state and config under versioned storage keys", () => {
    const setItem = vi.spyOn(window.localStorage, "setItem");
    render(<PointsCalculator />);
    fireEvent.change(screen.getAllByRole("spinbutton")[0], { target: { value: "5" } });
    expect(setItem).toHaveBeenCalledWith("scorepad-game-state-v2", expect.any(String));
    expect(setItem).toHaveBeenCalledWith("scorepad-game-config-v2", expect.any(String));
    setItem.mockRestore();
  });
});
