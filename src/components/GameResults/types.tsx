export type Input = {
  id: number;
  value: number;
};

export type Column = {
  id: number;
  name: string;
  points: number;
  inputs: Input[];
};
