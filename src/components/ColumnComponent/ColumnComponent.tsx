import React, { FC, memo } from "react";
import { Column } from "./types";

export type InputFieldProps ={
  value: number;
  onChange: (value: number) => void;
  readOnly: boolean;
}

const InputField: FC<InputFieldProps> = memo(
  ({ value, onChange, readOnly }) => (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
      className=""
      readOnly={readOnly}
    />
  )
);

interface ColumnComponentProps {
  column: Column;
  finished: boolean;
  onChangeName: (id: number, name: string) => void;
  onChangePoints: (columnId: number, inputId: number, value: number) => void;
  onRemoveColumn: (id: number) => void;
}

export const ColumnComponent: FC<ColumnComponentProps> = memo(
  ({ column, finished, onChangeName, onChangePoints, onRemoveColumn }) => (
    <div key={column.id} className="">
      <input
        type="text"
        value={column.name}
        onChange={(e) => onChangeName(column.id, e.target.value)}
        className=""
        readOnly={finished}
      />
      {column.inputs.map((input) => (
        <InputField
          key={input.id}
          value={input.value}
          onChange={(value) => onChangePoints(column.id, input.id, value)}
          readOnly={finished}
        />
      ))}
      <p className="">Points: {column.points}</p>
      <button
        onClick={() => onRemoveColumn(column.id)}
        className=""
        disabled={finished}
      >
        Delete
      </button>
    </div>
  )
);

export default ColumnComponent;
