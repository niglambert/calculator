export const MAX_INPUT_LENGTH = 8;

export const MAX_DECIMAL_PLACES = MAX_INPUT_LENGTH - 2;

export const OPERATION = {
  Divide: "Divide",
  Times: "Times",
  Minus: "Minus",
  Plus: "Plus",
  Equals: "Equals",
} as const;

export type OperationType = (typeof OPERATION)[keyof typeof OPERATION];

export const ACTION = {
  Backspace: "Backspace",
  ClearEntry: "ClearEntry",
  ClearAll: "ClearAll",
  Number: "Number",
  ...OPERATION,
} as const;

export type ActionType = (typeof ACTION)[keyof typeof ACTION];

export const KEYBOARD_KEY = {
  Plus: "+",
  Minus: "-",
  Times: "*",
  Divide: "/",
  Equals: "=",
  Escape: "Escape",
  Enter: "Enter",
  F12: "F12",
} as const;

export type KeyboardKeyType = (typeof KEYBOARD_KEY)[keyof typeof KEYBOARD_KEY];
