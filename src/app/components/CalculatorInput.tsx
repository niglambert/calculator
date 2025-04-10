import { KeyboardEvent } from "react";
import {
  ACTION,
  ActionType,
  KEYBOARD_KEY,
  KeyboardKeyType,
} from "../lib/constants";
import { logKeyCombination } from "../lib/utils";

type DisplayProps = {
  value: string;
  onNumberChange: (value: string) => void;
  onActionSelect: (operation: ActionType) => void;

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
  inputRef,
}: DisplayProps) => {
  console.log("CalcInput Render:", value);

  // -------------------------------------------------------------------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`%conChange:${e.target.value}`, "background: #ddd;");

    // Display 0 when empty
    const newValue = e.target.value || "0";

    console.log(`%c${newValue}`, "font-size:20px;color:red");
    onNumberInput(newValue);
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    logKeyCombination(e);
    // Process calculator action keys
    if (Object.values(KEYBOARD_KEY).includes(e.key as KeyboardKeyType)) {
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

    const isNumeric = /^[0-9\.]/.test(e.key);
    if (e.key !== "Backspace" && !isNumeric) {
      // Prevent default behavior for all other keys
      e.preventDefault();
    }
  };

  // -----------------------------------------------------------------------------------

  return (
    <input
      ref={inputRef}
      type="text"
      className="w-full  mb-4 h-16 rounded-md bg-gray-300 text-5xl px-4 text-right"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={(e) => {
        setTimeout(() => {
          const input = e.target as HTMLInputElement;
          const length = input.value.length;
          input.setSelectionRange(length, length);
        }, 0);
      }}
      onMouseDown={(e) => {
        e.preventDefault();
        const input = e.target as HTMLInputElement;
        input.focus();
      }}
      value={value}
    />
  );
};

export default CalculatorInput;
