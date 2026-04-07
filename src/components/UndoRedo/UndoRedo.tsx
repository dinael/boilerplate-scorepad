import { FC, memo } from "react";
import styles from "./UndoRedo.module.scss";

export type UndoRedoProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  undoLabel?: string;
  redoLabel?: string;
}

export const UndoRedo: FC<UndoRedoProps> = memo(({ 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo,
  undoLabel = "Undo",
  redoLabel = "Redo"
}) => {
  return (
    <div className={styles.undoRedo} role="group" aria-label="Undo/Redo">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={styles.btn}
        aria-label={undoLabel}
        title={undoLabel}
      >
        ← {undoLabel}
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={styles.btn}
        aria-label={redoLabel}
        title={redoLabel}
      >
        {redoLabel} →
      </button>
    </div>
  );
});

export default UndoRedo;