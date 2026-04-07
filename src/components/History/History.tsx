import { FC, memo, useMemo } from "react";
import { GameConfig } from "../../types";
import styles from "./History.module.scss";

export type GameHistoryItem = {
  id: string;
  date: string;
  winner: string;
  points: number;
  players: string[];
  config: GameConfig;
  columns: {
    id: number;
    name: string;
    points: number;
    inputs: { id: number; value: number }[];
  }[];
};

export type HistoryProps = {
  history: GameHistoryItem[];
  onLoad: (item: GameHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear: () => void;
  loadLabel?: string;
  deleteLabel?: string;
  clearLabel?: string;
  emptyLabel?: string;
  title?: string;
}

export const History: FC<HistoryProps> = memo(({
  history,
  onLoad,
  onDelete,
  onClear,
  loadLabel = "Load",
  deleteLabel = "Delete",
  clearLabel = "Clear All",
  emptyLabel = "No games played yet",
  title = "Game History",
}) => {
  const sortedHistory = useMemo(() => 
    [...history].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [history]
  );

  if (history.length === 0) {
    return (
      <div className={styles.history} role="region" aria-label={title}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.empty}>{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className={styles.history} role="region" aria-label={title}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button onClick={onClear} className={styles.clearBtn} aria-label={clearLabel}>
          {clearLabel}
        </button>
      </div>
      <ul className={styles.list} role="list">
        {sortedHistory.map((item) => (
          <li key={item.id} className={styles.item}>
            <div className={styles.info}>
              <span className={styles.winner}>
                {item.winner || "Unfinished"}
              </span>
              <span className={styles.points}>
                {item.points > 0 ? `${item.points} pts` : ""}
              </span>
              <span className={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </span>
              <span className={styles.players}>
                {item.players.join(", ")}
              </span>
            </div>
            <div className={styles.actions}>
              <button onClick={() => onLoad(item)} className={styles.loadBtn}>
                {loadLabel}
              </button>
              <button onClick={() => onDelete(item.id)} className={styles.deleteBtn} aria-label={`${deleteLabel} ${item.winner || "game"}`}>
                {deleteLabel}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default History;