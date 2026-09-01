import { FC, memo, useRef } from "react";
import { GameConfig } from "../../types";
import styles from "./ExportImport.module.scss";

export type ExportImportProps = {
  config: GameConfig;
  onImport: (data: { config: GameConfig }) => void;
  exportLabel?: string;
  importLabel?: string;
};

export const ExportImport: FC<ExportImportProps> = memo(
  ({ config, onImport, exportLabel = "Export", importLabel = "Import" }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
      const data = JSON.stringify({ config }, null, 2);
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `scorepad-config-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
      fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          if (data.config) {
            onImport({ config: data.config });
          }
        } catch (err) {
          console.error("Failed to parse file:", err);
        }
      };
      reader.readAsText(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    return (
      <div
        className={styles.exportImport}
        role="group"
        aria-label="Export/Import"
      >
        <button onClick={handleExport} className={styles.btn}>
          {exportLabel}
        </button>
        <button onClick={handleImportClick} className={styles.btn}>
          {importLabel}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className={styles.fileInput}
          aria-label="Import configuration file"
        />
      </div>
    );
  },
);

export default ExportImport;
