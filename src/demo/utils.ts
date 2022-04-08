export type Fruit = { displayValue: string; value: string };

const createFruit = (value: string): Fruit => ({ displayValue: value, value });
export const fruits = [
  createFruit('apple'),
  createFruit('apricot'),
  createFruit('orange'),
  createFruit('peach'),
  createFruit('pineapple'),
  createFruit('watermelon'),
];
