import { ACTION, MAX_INPUT_LENGTH } from "@/app/lib/constants";
import { formatDisplay, isNumberValid } from "@/app/lib/utils";

type ProcessNumberProps = {
  newValue: string;

  previousKeyPressed: string;
  setRegister: (v: number | null) => void;
  setPreviousKeyPressed: (v: string) => void;
  setDisplay: (v: string) => void;
};
/**
 *
 * @param numberPressed     The number button pressed
 * @param combinedNumber  The concatenated value of the display and the number pressed
 * @returns
 */
export const processNumber = ({
  newValue: newValue,

  previousKeyPressed,
  setRegister: setRegister,
  setPreviousKeyPressed,
  setDisplay,
}: ProcessNumberProps) => {
  console.log(
    `>>> processNumber numberPressed[${newValue}] previousKeyPressed[${previousKeyPressed}]`
  );

  // After Equals clear register for a new calculation
  if (previousKeyPressed === ACTION.Equals) setRegister(null);

  // Resulting number validation
  if (!isNumberValid(newValue, MAX_INPUT_LENGTH)) return;

  setPreviousKeyPressed("Number");
  setDisplay(formatDisplay(newValue));
};
