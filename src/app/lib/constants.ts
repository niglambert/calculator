export const MAX_INPUT_LENGTH = 8;

export const MAX_DECIMAL_PLACES = MAX_INPUT_LENGTH - 2;

export const ACTION = {
  Backspace: "Backspace",
  ClearEntry: "ClearEntry",
  ClearAll: "ClearAll",
  Divide: "Divide",
  Times: "Times",
  Minus: "Minus",
  Plus: "Plus",
  Equals: "Equals",
  //Number: "Number",
};

export type ActionType = (typeof ACTION)[keyof typeof ACTION];

export const KEY = {
  Backspace: "Backspace",
  ClearEntry: "ClearEntry",
  ClearAll: "ClearAll",
  Divide: "Divide",
  Times: "Times",
  Minus: "Minus",
  Plus: "Plus",
  Equals: "Equals",
  Number: "Number",
};

export type KeyType = (typeof KEY)[keyof typeof KEY];

export const OPERATION = {
  Divide: "Divide",
  Times: "Times",
  Minus: "Minus",
  Plus: "Plus",
  Equals: "Equals",
};

export type oPERATIONType = (typeof OPERATION)[keyof typeof OPERATION];

export const KEYBOARD_KEY = {
  Plus: "+",
  Minus: "-",
  Times: "*",
  Divide: "/",
  Equals: "=",
  Escape: "Escape",
  Enter: "Enter",
  F12: "F12",
};
