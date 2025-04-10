import { ACTION, ActionType, MAX_INPUT_LENGTH } from "@/app/lib/constants";
import { formatDisplay, isNumberValid } from "@/app/lib/utils";

type ProcessNumberProps = {
  newValue: string;
  previousAction: ActionType | null;
  setAccumulator: (v: number | null) => void;
  setPreviousAction: (v: ActionType | null) => void;
  setDisplay: (v: string) => void;
};
/**
 *
 * @param numberPressed     The number button pressed
 * @param combinedNumber  The concatenated value of the display and the number pressed
 * @returns
 */
export const processNumber = ({
  newValue,
  previousAction,
  setAccumulator,
  setPreviousAction,
  setDisplay,
}: ProcessNumberProps) => {
  console.log(
    `>>> processNumber numberPressed[${newValue}] previousAction[${previousAction}]`
  );

  // After Equals clear register for a new calculation
  if (previousAction === ACTION.Equals) setAccumulator(null);

  // Resulting number validation
  if (!isNumberValid(newValue, MAX_INPUT_LENGTH)) return;

  setPreviousAction(ACTION.Number);
  setDisplay(formatDisplay(newValue));
};
