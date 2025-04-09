import { ACTION, MAX_INPUT_LENGTH } from "@/app/lib/constants";
import { formatDisplay, isNumberValid } from "@/app/lib/utils";

type ProcessNumberProps = {
  numberEntered: string;
  combinedNumber: string;
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
  numberEntered: numberEntered,
  combinedNumber,
  previousKeyPressed,
  setRegister: setRegister,
  setPreviousKeyPressed,
  setDisplay,
}: ProcessNumberProps) => {
  //
  console.log(
    `>>> processNumber numberPressed[${numberEntered}] combinedNumber[${combinedNumber}] previousKeyPressed[${previousKeyPressed}]`
  );

  // A Number after Equals is a new calculation
  if (previousKeyPressed === ACTION.Equals) setRegister(null);

  // NEW OPERAND where previousKeyPressed was not a number
  let numberToDisplay = combinedNumber;
  if (previousKeyPressed !== "Number") {
    console.log(`NEW OPERAND: [${numberToDisplay}]`);
    numberToDisplay = numberEntered;
  }

  // Resulting number validation
  if (!isNumberValid(combinedNumber, MAX_INPUT_LENGTH)) return;

  setPreviousKeyPressed("Number");
  setDisplay(formatDisplay(numberToDisplay));
};
