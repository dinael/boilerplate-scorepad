import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Presets } from "../Presets";
import { defaultConfig } from "../../../types";
import React from "react";

describe("Presets", () => {
  it("renders a heading and a button per preset", () => {
    render(<Presets onSelect={() => {}} currentConfig={defaultConfig} />);
    expect(screen.getByRole("heading", { name: "Presets" })).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(5);
  });

  it("renders presets as a semantic list", () => {
    const { container } = render(
      <Presets onSelect={() => {}} currentConfig={defaultConfig} />
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("UL");
    expect(list).toHaveAttribute("aria-label", "Game presets");
    expect(container.querySelectorAll("li")).toHaveLength(5);
  });

  it("renders preset names and descriptions", () => {
    render(<Presets onSelect={() => {}} currentConfig={defaultConfig} />);
    expect(screen.getByText("Bowling")).toBeInTheDocument();
    expect(screen.getByText("10 frames, highest score wins")).toBeInTheDocument();
    expect(screen.getByText("9 holes, lowest score wins")).toBeInTheDocument();
  });

  it("calls onSelect with the preset config", () => {
    const onSelect = vi.fn();
    render(<Presets onSelect={onSelect} currentConfig={defaultConfig} />);
    fireEvent.click(screen.getByRole("button", { name: /Load Bowling preset/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0][0]).toMatchObject({
      rounds: 10,
      gameType: "highest",
    });
  });
});