import { useRef, useState } from "react";
import CalculatorInput from "./CalculatorInput";
import CKey from "./CalculatorKey";
import { processAction } from "./processAction";
import { processNumber } from "./processNumber";
import { ACTION, ActionType, OperationType } from "../lib/constants";
// -------------------------------------------------------------------------------------------------

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<OperationType | null>(null);
  const [previousAction, setPreviousAction] = useState<ActionType | null>(null);
  const [accumulator, setAccumulator] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------------------------------------------

  const handleInputNumber = (value: string) => {
    // NEW OPERAND where previousAction was not a number
    let newValue = value;
    if (
      previousAction === ACTION.Plus ||
      previousAction === ACTION.Minus ||
      previousAction === ACTION.Times ||
      previousAction === ACTION.Divide ||
      previousAction === ACTION.Equals
    ) {
      newValue = newValue.slice(display.length);
    }

    processNumber({
      newValue,
      previousAction,
      setDisplay,
      setAccumulator,
      setPreviousAction,
    });

    if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  const handleInputAction = (action: ActionType) => {
    processAction({
      action,
      display,
      operation,
      accumulator,
      previousAction,
      setDisplay,
      setAccumulator,
      setOperation,
      setPreviousAction,
    });
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyNumber = (value: string) => {
    let newValue = display + value;
    if (
      previousAction === ACTION.Plus ||
      previousAction === ACTION.Minus ||
      previousAction === ACTION.Times ||
      previousAction === ACTION.Divide ||
      previousAction === ACTION.Equals
    ) {
      newValue = value;
    }

    processNumber({
      newValue,
      previousAction,
      setDisplay,
      setAccumulator,
      setPreviousAction,
    });

    const isTabletOrMobile = screen.width <= 1024;
    if (!isTabletOrMobile) if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyAction = (action: ActionType) => {
    processAction({
      action,
      display,
      operation,
      accumulator,
      previousAction,
      setDisplay,
      setAccumulator,
      setOperation,
      setPreviousAction,
    });

    const isTabletOrMobile = screen.width <= 1024;
    if (!isTabletOrMobile) if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  return (
    <div className="bg-[#3b4b64] p-4 pt-6 rounded-xl shadow shadow-gray-500 select-none">
      <CalculatorInput
        value={display}
        onNumberChange={handleInputNumber}
        onActionSelect={handleInputAction}
        inputRef={inputRef}
      />

      <div className="grid grid-cols-4 gap-3 mb-2 ">
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.Backspace)}
          className="text-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
        </CKey>
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.ClearAll)}
          className="text-3xl"
        >
          C
        </CKey>
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.ClearEntry)}
          className="text-3xl"
        >
          CE
        </CKey>
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.Divide)}
          className={
            operation === ACTION.Divide ? "bg-amber-400" : "bg-amber-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.499 11.998h15m-7.5-6.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM12 18.751h.007v.007H12v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("7")}>7</CKey>
        <CKey onKeyClick={() => handleKeyNumber("8")}>8</CKey>
        <CKey onKeyClick={() => handleKeyNumber("9")}>9</CKey>
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.Times)}
          className={
            operation === ACTION.Times ? "bg-amber-400" : "bg-amber-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10 transform rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("4")}>4</CKey>
        <CKey onKeyClick={() => handleKeyNumber("5")}>5</CKey>
        <CKey onKeyClick={() => handleKeyNumber("6")}>6</CKey>
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.Minus)}
          className={
            operation === ACTION.Minus ? "bg-amber-400" : "bg-amber-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("1")}>1</CKey>
        <CKey onKeyClick={() => handleKeyNumber("2")}>2</CKey>
        <CKey onKeyClick={() => handleKeyNumber("3")}>3</CKey>
        <CKey
          onKeyClick={() => handleKeyAction(ACTION.Plus)}
          className={
            operation === ACTION.Plus ? "bg-amber-400" : "bg-amber-300"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("0")} className="col-span-2">
          0
        </CKey>
        <CKey onKeyClick={() => handleKeyNumber(".")}>.</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Equals")}
          className={"bg-amber-300"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.499 8.248h15m-15 7.501h15"
            />
          </svg>
        </CKey>
      </div>
    </div>
  );
};

export default Calculator;
