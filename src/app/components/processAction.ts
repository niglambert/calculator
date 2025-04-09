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
      let result = parseFloat(display);
      if (register !== null) {
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

    case ACTION.Delete: {
      let newValue = display.slice(0, -1);
      if (previousKeyPressed === "Equals") newValue = "0";
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
