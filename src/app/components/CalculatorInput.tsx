import { KeyboardEvent } from "react";
import {
  ACTION,
  CONTROL_KEY,
  CURSOR_KEY,
  FUNCTION_KEY,
  KEYBOARD_KEY,
  MAX_INPUT_LENGTH,
} from "../lib/constants";
import { isNumberValid, logKeyCombination } from "../lib/utils";

type DisplayProps = {
  value: string;
  onNumberChange: (value: string) => void;
  onActionSelect: (operation: string) => void;
  maxLength: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
};

/**
 *
 * @param param0
 * @returns
 */
const CalculatorInput = ({
  value,
  onNumberChange: onNumberInput,
  onActionSelect: onActionSelect,
  maxLength = MAX_INPUT_LENGTH,
  inputRef,
}: DisplayProps) => {
  console.log("CalcInput Render:", value);

  // -------------------------------------------------------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`%conChange:${e.target.value}`, "background: #ddd;");

    // Display 0 when empty
    const value = e.target.value || "0";

    onNumberInput(value);
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(`%conKeyDown:`, "background: #ddd;");
    logKeyCombination(e);

    // Permit normal function/control/cursor key processing
    if (
      Object.keys(FUNCTION_KEY).includes(e.key) ||
      Object.keys(CURSOR_KEY).includes(e.key) ||
      (Object.keys(CONTROL_KEY).includes(e.key) && e.ctrlKey)
    ) {
      return;
    }

    // // Required before exponent check
    // if (Object.keys(KEYBOARD_KEY).includes(e.key)) {
    //   e.preventDefault();
    //   if (e.key === KEYBOARD_KEY.Escape) onActionSelect(ACTION.ClearAll);
    //   if (e.key === KEYBOARD_KEY.Enter) onActionSelect(ACTION.Equals);
    //   if (e.key === KEYBOARD_KEY.Equals) onActionSelect(ACTION.Equals);
    //   return;
    // }

    // // Prevent edit if display contains exponential notation
    // if (value.includes("e")) {
    //   e.preventDefault();
    //   return;
    // }

    // Process calculator action keys
    if (Object.values(KEYBOARD_KEY).includes(e.key)) {
      e.preventDefault();
      if (e.key === KEYBOARD_KEY.Plus) onActionSelect(ACTION.Plus);
      if (e.key === KEYBOARD_KEY.Minus) onActionSelect(ACTION.Minus);
      if (e.key === KEYBOARD_KEY.Times) onActionSelect(ACTION.Times);
      if (e.key === KEYBOARD_KEY.Divide) onActionSelect(ACTION.Divide);
      if (e.key === KEYBOARD_KEY.Equals) onActionSelect(ACTION.Equals);
      if (e.key === KEYBOARD_KEY.Enter) onActionSelect(ACTION.Equals);
      if (e.key === KEYBOARD_KEY.Escape) onActionSelect(ACTION.ClearAll);
      return;
    }

    // No calculations required for SHIFT and CTRL keys
    if (e.shiftKey || e.ctrlKey) {
      e.preventDefault();
      return;
    }

    // Numbers only
    if (!/^[0-9.]+$/.test(e.key)) {
      e.preventDefault();
      return;
    }

    // Validate number change
    // Validation in onKeyDown avoids potential re-renders that reset the cursor position
    const selStart = (e.target as HTMLInputElement).selectionStart || 0;
    const selEnd = (e.target as HTMLInputElement).selectionEnd || 0;
    const newValue = value.slice(0, selStart) + e.key + value.substring(selEnd);

    console.log(
      `Key[${e.key}] value[${value}] selStart[${selStart}] selEnd[${selEnd}]  newValue[${newValue}]`
    );

    if (!isNumberValid(newValue, maxLength)) {
      e.preventDefault();
    }
  };

  // -------------------------------------------------------------------------------------------------

  return (
    <input
      ref={inputRef}
      type="text"
      className="w-full  mb-4 h-16 rounded-md bg-gray-300 text-5xl px-4 text-right"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      value={value}
    />
  );
};

export default CalculatorInput;
