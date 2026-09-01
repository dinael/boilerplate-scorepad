import React, { FC, memo, useId } from "react";
import { Column, GameConfig } from "../../types";
import styles from "./ColumnComponent.module.scss";

export type InputFieldProps = {
  value: number;
  onChange: (value: number) => void;
  readOnly: boolean;
  label: string;
  inputId: string;
};

const InputField: FC<InputFieldProps> = memo(
  ({ value, onChange, readOnly, label, inputId }) => (
    <div className={styles.input_wrapper}>
      <label htmlFor={inputId} className="visually-hidden">
        {label}
      </label>
      <input
        type="number"
        id={inputId}
        value={value}
        min={0}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          if (!isNaN(val) && val >= 0) {
            onChange(val);
          }
        }}
        className={styles.column__points_input}
        readOnly={readOnly}
        aria-label={label}
      />
    </div>
  ),
);

interface ColumnComponentProps {
  column: Column;
  finished: boolean;
  onChangeName: (id: number, name: string) => void;
  onChangePoints: (columnId: number, inputId: number, value: number) => void;
  onRemoveColumn: (id: number) => void;
  config: GameConfig;
}

export const ColumnComponent: FC<ColumnComponentProps> = memo(
  ({
    column,
    finished,
    onChangeName,
    onChangePoints,
    onRemoveColumn,
    config,
  }) => {
    const nameInputId = useId();

    return (
      <div
        key={column.id}
        className={styles.column}
        role="region"
        aria-labelledby={`${nameInputId}-label`}
      >
        <label
          htmlFor={nameInputId}
          id={`${nameInputId}-label`}
          className="visually-hidden"
        >
          {column.name} {config.messages.columnLabel}
        </label>
        <input
          id={nameInputId}
          type="text"
          value={column.name}
          onChange={(e) => onChangeName(column.id, e.target.value)}
          className={styles.column__name_input}
          readOnly={finished}
          aria-label={`${column.name} ${config.messages.playerName}`}
        />
        {column.inputs.map((input) => (
          <InputField
            key={input.id}
            inputId={`${column.id}-input-${input.id}`}
            value={input.value ?? 0}
            onChange={(value) => onChangePoints(column.id, input.id, value)}
            readOnly={finished}
            label={`${config.messages.round} ${input.id} ${config.messages.points} for ${column.name}`}
          />
        ))}
        <p
          className={styles.column__points_display}
          aria-live="polite"
          aria-atomic="true"
        >
          {config.messages.points}: {column.points}
        </p>
        <button
          onClick={() => onRemoveColumn(column.id)}
          className={styles.column__delete_btn}
          disabled={finished}
          aria-label={`${config.messages.deleteColumn} ${column.name}`}
        >
          {config.messages.deleteColumn}
        </button>
      </div>
    );
  },
);

export default ColumnComponent;
