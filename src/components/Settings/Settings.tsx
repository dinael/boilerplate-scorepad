import { FC, memo } from "react";
import { GameConfig, GameType } from "../../types";
import styles from "./Settings.module.scss";

export type SettingsProps = {
  config: GameConfig;
  onConfigChange: (config: Partial<GameConfig>) => void;
};

export const Settings: FC<SettingsProps> = memo(
  ({ config, onConfigChange }) => {
    return (
      <div className={styles.settings} role="region" aria-label="Game settings">
        <h2 className={styles.settings__title}>Settings</h2>

        <div className={styles.settings__field}>
          <label htmlFor="rounds-input" className={styles.settings__label}>
            {config.messages.round} per player
          </label>
          <input
            id="rounds-input"
            type="number"
            min={1}
            max={20}
            value={config.rounds}
            onChange={(e) =>
              onConfigChange({
                rounds: Math.max(
                  1,
                  Math.min(20, parseInt(e.target.value) || 1),
                ),
              })
            }
            className={styles.settings__input}
          />
        </div>

        <div className={styles.settings__field}>
          <label htmlFor="game-type-select" className={styles.settings__label}>
            Game type
          </label>
          <select
            id="game-type-select"
            value={config.gameType}
            onChange={(e) =>
              onConfigChange({ gameType: e.target.value as GameType })
            }
            className={styles.settings__select}
          >
            <option value="highest">Highest score wins</option>
            <option value="lowest">Lowest score wins</option>
          </select>
        </div>

        <div className={styles.settings__field}>
          <label htmlFor="player-name-input" className={styles.settings__label}>
            Default player name
          </label>
          <input
            id="player-name-input"
            type="text"
            value={config.defaultPlayerName}
            onChange={(e) =>
              onConfigChange({ defaultPlayerName: e.target.value || "Player" })
            }
            className={styles.settings__input}
          />
        </div>

        <fieldset className={styles.settings__messages}>
          <legend>Custom Messages</legend>

          <div className={styles.settings__field}>
            <label htmlFor="msg-winner" className={styles.settings__label}>
              Winner
            </label>
            <input
              id="msg-winner"
              type="text"
              value={config.messages.winner}
              onChange={(e) =>
                onConfigChange({
                  messages: { ...config.messages, winner: e.target.value },
                })
              }
              className={styles.settings__input}
            />
          </div>

          <div className={styles.settings__field}>
            <label htmlFor="msg-tie" className={styles.settings__label}>
              Tie
            </label>
            <input
              id="msg-tie"
              type="text"
              value={config.messages.tie}
              onChange={(e) =>
                onConfigChange({
                  messages: { ...config.messages, tie: e.target.value },
                })
              }
              className={styles.settings__input}
            />
          </div>

          <div className={styles.settings__field}>
            <label htmlFor="msg-ranking" className={styles.settings__label}>
              Ranking
            </label>
            <input
              id="msg-ranking"
              type="text"
              value={config.messages.ranking}
              onChange={(e) =>
                onConfigChange({
                  messages: { ...config.messages, ranking: e.target.value },
                })
              }
              className={styles.settings__input}
            />
          </div>
        </fieldset>
      </div>
    );
  },
);

export default Settings;
