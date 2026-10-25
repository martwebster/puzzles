export const exampleFunction = (line: string): number | undefined => {
  return Number(line);
};

export type Rectangle = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export const intersect = (r1: Rectangle, r2: Rectangle): boolean => {
  return false;
};
