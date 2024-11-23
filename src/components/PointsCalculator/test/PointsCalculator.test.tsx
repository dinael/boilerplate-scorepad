import { describe, it, expect, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import PointsCalculator from "../PointsCalculator";

describe("PointsCalculator", () => {
  it("renders initial state correctly", () => {
    render(<PointsCalculator />);
    expect(screen.getByText("Column 1")).toBeInTheDocument();
    expect(screen.getByText("Puntos: 0")).toBeInTheDocument();
    expect(screen.getByText("Agregar columna")).toBeInTheDocument();
    expect(screen.getByText("Finalizar")).toBeInTheDocument();
    expect(screen.getByText("Nueva partida")).toBeInTheDocument();
  });

  it('adds a new column when "Agregar columna" is clicked', () => {
    render(<PointsCalculator />);
    fireEvent.click(screen.getByText("Agregar columna"));
    expect(screen.getByText("Column 2")).toBeInTheDocument();
  });

  it('removes a column when "Eliminar" is clicked', () => {
    render(<PointsCalculator />);
    fireEvent.click(screen.getByText("Agregar columna"));
    const removeButtons = screen.getAllByText("Eliminar");
    fireEvent.click(removeButtons[1]); // Remove the second column
    expect(screen.queryByText("Column 2")).not.toBeInTheDocument();
  });

  it("updates column name when input changes", () => {
    render(<PointsCalculator />);
    const nameInput = screen.getByDisplayValue("Column 1");
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    expect(screen.getByDisplayValue("New Name")).toBeInTheDocument();
  });

  it("updates points when input changes", () => {
    render(<PointsCalculator />);
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    expect(screen.getByText("Puntos: 5")).toBeInTheDocument();
  });

  it("finishes the game and displays winner", () => {
    render(<PointsCalculator />);
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    fireEvent.click(screen.getByText("Finalizar"));
    expect(screen.getByText("Column 1 - 5 puntos")).toBeInTheDocument();
  });

  it("handles tie correctly", () => {
    render(<PointsCalculator />);
    fireEvent.click(screen.getByText("Agregar columna"));
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    fireEvent.change(pointInputs[3], { target: { value: "5" } });
    fireEvent.click(screen.getByText("Finalizar"));
    expect(screen.getByText("¡Oh! Ha habido un empate!")).toBeInTheDocument();
  });

  it('starts a new game when "Nueva partida" is clicked', () => {
    render(<PointsCalculator />);
    const pointInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(pointInputs[0], { target: { value: "5" } });
    fireEvent.click(screen.getByText("Finalizar"));
    fireEvent.click(screen.getByText("Nueva partida"));
    expect(screen.getByText("Puntos: 0")).toBeInTheDocument();
    expect(screen.queryByText("Column 1 - 5 puntos")).not.toBeInTheDocument();
  });
});
