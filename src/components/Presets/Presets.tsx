import { FC, memo } from "react";
import { GameConfig } from "../../types";
import { Preset, PRESETS } from "./presets";
import styles from "./Presets.module.scss";

export type { Preset };
export { PRESETS };

export type PresetsProps = {
  onSelect: (config: Partial<GameConfig>) => void;
  currentConfig: GameConfig;
}

export const Presets: FC<PresetsProps> = memo(({ onSelect, currentConfig }) => {
  return (
    <div className={styles.presets}>
      <h3 className={styles.title}>Presets</h3>
      <ul className={styles.grid} aria-label="Game presets">
        {PRESETS.map((preset) => (
          <li key={preset.name}>
            <button
              onClick={() => onSelect(preset.config)}
              className={styles.preset}
              aria-label={`Load ${preset.name} preset: ${preset.description || ""}`}
              title={preset.description}
            >
              <span className={styles.name}>{preset.name}</span>
              {preset.description && (
                <span className={styles.desc}>{preset.description}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Presets;
