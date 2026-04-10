import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Settings } from "../../Settings/Settings";
import { defaultConfig } from "../../../types";
import React from "react";

describe("Settings", () => {
  it("renders with default config", () => {
    const onConfigChange = () => {};
    const { container } = render(<Settings config={defaultConfig} onConfigChange={onConfigChange} />);
    
    expect(container.querySelector('[role="region"]')).toBeInTheDocument();
    expect(container.querySelector("input[type='number']")).toBeInTheDocument();
    expect(container.querySelector("select")).toBeInTheDocument();
  });

  it("renders rounds input with correct value", () => {
    const onConfigChange = () => {};
    render(<Settings config={defaultConfig} onConfigChange={onConfigChange} />);
    
    const roundsInput = document.querySelector('input[type="number"]') as HTMLInputElement;
    expect(roundsInput.value).toBe("3");
  });

  it("renders game type select with correct default value", () => {
    const onConfigChange = () => {};
    render(<Settings config={defaultConfig} onConfigChange={onConfigChange} />);
    
    const select = document.querySelector("select") as HTMLSelectElement;
    expect(select.value).toBe("highest");
  });

  it("renders custom messages section", () => {
    const onConfigChange = () => {};
    const { container } = render(<Settings config={defaultConfig} onConfigChange={onConfigChange} />);
    
    expect(container.querySelector("fieldset")).toBeInTheDocument();
  });
});