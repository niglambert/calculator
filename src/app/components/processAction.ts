import { formatDisplay, performCalculation } from "../lib/utils";
import { ACTION, ActionType, OperationType } from "../lib/constants";

type ProcessActionProps = {
  action: ActionType;
  display: string;
  operation: OperationType | null;
  accumulator: number | null;
  previousAction: ActionType | null;
  setDisplay: (v: string) => void;
  setAccumulator: (v: number | null) => void;
  setOperation: (v: OperationType | null) => void;
  setPreviousAction: (v: ActionType | null) => void;
};

export const processAction = ({
  action,
  display,
  operation,
  accumulator,
  previousAction,
  setDisplay,
  setAccumulator,
  setOperation,
  setPreviousAction,
}: ProcessActionProps) => {
  //
  console.log(
    `>>> processAction action[${action}] display[${display}] operation[${operation}] register[${accumulator}] previousAction[${previousAction}]`
  );
  switch (action) {
    case ACTION.Divide:
    case ACTION.Times:
    case ACTION.Minus:
    case ACTION.Plus: {
      // Calculation starts with an operation so default first operand to 0
      if (accumulator === null && previousAction !== ACTION.Number) {
        setAccumulator(0);
      }

      const previouslySelectedOperation = operation;
      const nextOperation = action;

      if (previousAction === ACTION.Number) {
        let result = parseFloat(display);
        if (accumulator !== null) {
          result = performCalculation({
            display,
            register: accumulator,
            action: previouslySelectedOperation,
          });
        }
        const formattedResult = formatDisplay(result);
        setDisplay(formattedResult);
        setAccumulator(result);
      }

      setPreviousAction(action);
      setOperation(nextOperation);
      break;
    }

    case ACTION.Equals: {
      let result = parseFloat(display);
      const operationInProgress =
        previousAction === ACTION.Plus ||
        previousAction === ACTION.Minus ||
        previousAction === ACTION.Times ||
        previousAction === ACTION.Divide;

      // No calculation necessary if second operand not entered
      if (accumulator !== null && !operationInProgress) {
        result = performCalculation({
          display,
          register: accumulator,
          action: operation,
        });
      }
      const formattedResult = formatDisplay(result);
      setDisplay(formattedResult);
      setAccumulator(result);
      setOperation(null);
      setPreviousAction(ACTION.Equals);
      break;
    }

    case ACTION.Backspace: {
      let newValue = display.slice(0, -1);

      // After Equals, deleting a number starts a new calculation
      if (previousAction === ACTION.Equals) setAccumulator(null);

      // Enforce state to be entering a number
      setPreviousAction(ACTION.Number);

      // Reset to 0 is contains exponennt to prevent edit
      const isNumeric = /^[0-9\.\-]*$/.test(newValue);
      if (!isNumeric) newValue = "0";

      setDisplay(formatDisplay(newValue));
      break;
    }

    case ACTION.ClearEntry: {
      setDisplay("0");
      if (previousAction === ACTION.Equals) setAccumulator(null);
      break;
    }

    case ACTION.ClearAll: {
      setDisplay("0");
      setAccumulator(null);
      setPreviousAction(null);
      setOperation(null);
      break;
    }

    default: {
      // Do nothing
    }
  }
};
