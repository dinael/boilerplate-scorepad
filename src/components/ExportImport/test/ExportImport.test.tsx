import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ExportImport } from "../../ExportImport/ExportImport";
import { defaultConfig } from "../../../types";
import React from "react";

describe("ExportImport", () => {
  it("renders export button", () => {
    const onImport = () => {};
    
    render(<ExportImport config={defaultConfig} onImport={onImport} />);
    
    expect(screen.getByText("Export")).toBeInTheDocument();
  });

  it("renders import button", () => {
    const onImport = () => {};
    
    render(<ExportImport config={defaultConfig} onImport={onImport} />);
    
    expect(screen.getByText("Import")).toBeInTheDocument();
  });

  it("renders with custom labels", () => {
    const onImport = () => {};
    
    render(
      <ExportImport 
        config={defaultConfig} 
        onImport={onImport} 
        exportLabel="Export Config"
        importLabel="Load Config"
      />
    );
    
    expect(screen.getByText("Export Config")).toBeInTheDocument();
    expect(screen.getByText("Load Config")).toBeInTheDocument();
  });

  it("renders file input for import", () => {
    const onImport = () => {};
    const { container } = render(<ExportImport config={defaultConfig} onImport={onImport} />);
    
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.accept).toBe(".json");
  });
});