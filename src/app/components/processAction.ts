import { formatDisplay, performCalculation } from "../lib/utils";
import { ACTION } from "../lib/constants";

type ProcessActionProps = {
  action: string;
  display: string;
  operation: string | null;
  register: number | null;
  previousKeyPressed: string;
  setDisplay: (v: string) => void;
  setRegister: (v: number | null) => void;
  setOperation: (v: string | null) => void;
  setPreviousKeyPressed: (v: string) => void;
};

export const processAction = ({
  action,
  display,
  operation,
  register: register,
  previousKeyPressed,
  setDisplay,
  setRegister: setRegister,
  setOperation,
  setPreviousKeyPressed,
}: ProcessActionProps) => {
  //
  console.log(
    `>>> processAction action[${action}] display[${display}] operation[${operation}] register[${register}] previousKeyPressed[${previousKeyPressed}]`
  );
  switch (action) {
    case ACTION.Divide:
    case ACTION.Times:
    case ACTION.Minus:
    case ACTION.Plus: {
      if (register === null && previousKeyPressed !== "Number") {
        setRegister(0);
      }

      if (previousKeyPressed === "Number") {
        let result = parseFloat(display);
        if (register !== null) {
          action = operation !== null ? operation : action;
          result = performCalculation({ display, register: register, action });
        }
        const formattedResult = formatDisplay(result);
        setDisplay(formattedResult);
        setRegister(result);
      }

      setPreviousKeyPressed(action);
      setOperation(action);
      break;
    }

    case ACTION.Equals: {
      debugger;
      let result = parseFloat(display);
      const operationInProgress =
        previousKeyPressed === ACTION.Plus ||
        previousKeyPressed === ACTION.Minus ||
        previousKeyPressed === ACTION.Times ||
        previousKeyPressed === ACTION.Divide;

      // No calculation necessary if second operand not entered
      if (register !== null && !operationInProgress) {
        result = performCalculation({
          display,
          register: register,
          action: operation,
        });
      }
      const formattedResult = formatDisplay(result);
      setDisplay(formattedResult);
      setRegister(result);
      setOperation(null);
      setPreviousKeyPressed("Equals");
      break;
    }

    case ACTION.Backspace: {
      const newValue = display.slice(0, -1);

      // After Equals, deleting a number starts a new calculation
      if (previousKeyPressed === "Equals") setRegister(null);

      // Enforce state to be entering a number
      setPreviousKeyPressed("Number");

      setDisplay(formatDisplay(newValue));
      break;
    }

    case ACTION.ClearEntry: {
      setDisplay("0");
      if (previousKeyPressed === "Equals") setRegister(null);
      break;
    }

    case ACTION.ClearAll: {
      setDisplay("0");
      setRegister(null);
      setPreviousKeyPressed("");
      setOperation(null);
      break;
    }

    default: {
      // Do nothing
    }
  }
};
