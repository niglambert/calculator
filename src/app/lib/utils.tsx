// @/lib/utils
import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { ACTION, MAX_DECIMAL_PLACES, MAX_INPUT_LENGTH } from "./constants";
import { KeyboardEvent } from "react";

// -------------------------------------------------------------------------------------------------

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// -------------------------------------------------------------------------------------------------

/**
 * Number validation
 * - Prevent double decimal separator
 * - Prevent non numeric characters
 * - Restrict input length
 *
 * @param value     Number to validate
 * @param maxLength Max display length
 * @returns         True if valid otherwise false
 */
export const isNumberValid = (value: string, maxLength: number): boolean => {
  const func = "isNumberValid";
  console.log(func, `Value [${value}]`);

  // Prevent double decimal separator
  const decimalSeparator = (0.1).toLocaleString().slice(1, 2);
  if (value.split(decimalSeparator).length > 2) {
    console.warn(func, "Too many decimal separators");
    return false;
  }

  // Prevent non numeric characters
  if (/[^0-9\-\.]/.test(value)) {
    console.warn(func, "Non-numeric characters");
    return false;
  }

  // Minus sign at start only
  if (value.indexOf("-") >= 0 && value.indexOf("-") !== 0) {
    console.warn(func, "Minus sign not at start");
    return false;
  }

  // Restrict input length
  if (value.length > maxLength) {
    console.warn(func, "Too many characters");
    return false;
  }

  // // Prevent multiple leading zeros
  // if (value.startsWith("00")) {
  //   console.warn(func, "Removed multiple leading zeros");
  //   return false;
  // }

  // // Prevent empty string
  // if (value.length === 0) {
  //   console.warn(func, "Empty string not allowed");
  //   return false;
  // }

  return true;
};

// -------------------------------------------------------------------------------------------------

/**
 * Perform calculation of memory and display values
 *
 */
type CalculateTotalProps = {
  display: string;
  register: number;
  action: string | null;
};
export const performCalculation = ({
  display,
  register: total,
  action,
}: CalculateTotalProps): number => {
  const displayFloat = parseFloat(display);
  switch (action) {
    case ACTION.Divide:
      return total / displayFloat;
    case ACTION.Times:
      return total * displayFloat;
    case ACTION.Minus:
      return total - displayFloat;
    case ACTION.Plus:
      return total + displayFloat;
    default:
      // No action, just return display value
      return displayFloat;
  }
};

// -------------------------------------------------------------------------------------------------

/**
 * Convert empty string to 0
 * Remove multiple leading zeros
 * Prefix decimal point with a 0 if no leading number
 * Remove leading - sign on zero
 *
 * @param value
 * @returns
 */
export const formatDisplay = (value: number | string): string => {
  if (value === Infinity) return "Error";
  if (value === -Infinity) return "Error";
  if (Number.isNaN(value)) return "Error";
  let newValue = "";
  if (typeof value === "number") {
    newValue = parseFloat(value.toFixed(MAX_DECIMAL_PLACES)).toString();
  } else {
    newValue = value;
  }
  newValue = newValue
    .replace(/^0*/, "")
    .replace(/^\./, "0.")
    .replace(/^$/, "0") ///xxxxxxxxxxxxxxxxx
    .replace(/^-0$/, "0");

  // Negative symbol not included in max length
  const maxLength = newValue.startsWith("-")
    ? MAX_INPUT_LENGTH + 1
    : MAX_INPUT_LENGTH;

  // Show exponent for values longer than maxLength
  newValue =
    newValue.length > maxLength
      ? parseFloat(newValue).toExponential(MAX_DECIMAL_PLACES - 4)
      : newValue;

  return newValue;
};

// -------------------------------------------------------------------------------------------------

/**
 * Console log KeyDown key combination
 *
 * @param e
 */
export const logKeyCombination = (e: KeyboardEvent<HTMLInputElement>) => {
  console.log(
    `%cKey[${[
      e.ctrlKey ? "CTRL" : "",
      e.shiftKey ? "SHIFT" : "",
      ["Control", "Shift"].includes(e.key) ? "" : e.key,
      e.code,
    ]
      .filter((x) => x.length > 0)
      .join("-")}]
          `,
    "color:green;font-weight:700;"
  );
};

// -------------------------------------------------------------------------------------------------

/**
 * Console log in blue
 *
 * @param value
 */
export const log = (value: string) => {
  console.log(`%c${value}`, "color:blue;font-weight:700;");
};
