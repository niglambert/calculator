import { useRef, useState } from "react";
import CalculatorInput from "./CalculatorInput";
import CKey from "./CalculatorKey";
import { processAction } from "./processAction";
import { processNumber } from "./processNumber";
import { ACTION } from "../lib/constants";
import { log } from "../lib/utils";
// -------------------------------------------------------------------------------------------------

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [previousKeyPressed, setPreviousKeyPressed] = useState<string>("");
  const [register, setRegister] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------------------------------------------

  const handleInputNumber = (value: string) => {
    log(`%cCALCULATOR handleKeyAction Key[${value}]`);

    // NEW OPERAND where previousKeyPressed was not a number
    let newValue = value;
    if (
      previousKeyPressed === ACTION.Plus ||
      previousKeyPressed === ACTION.Minus ||
      previousKeyPressed === ACTION.Times ||
      previousKeyPressed === ACTION.Divide ||
      previousKeyPressed === ACTION.Equals
    ) {
      newValue = newValue.slice(display.length);
    }

    processNumber({
      newValue,
      previousKeyPressed,
      setDisplay,
      setRegister,
      setPreviousKeyPressed,
    });

    if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  const handleInputAction = (action: string) => {
    log(`%cCALCULATOR handleKeyAction Key[${action}]`);
    processAction({
      action,
      display,
      operation,
      register,
      previousKeyPressed,
      setDisplay,
      setRegister,
      setOperation,
      setPreviousKeyPressed,
    });
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyNumber = (value: string) => {
    log(`%cCALCULATOR handleKeyAction Key[${value}]`);

    let newValue = display + value;
    if (
      previousKeyPressed === ACTION.Plus ||
      previousKeyPressed === ACTION.Minus ||
      previousKeyPressed === ACTION.Times ||
      previousKeyPressed === ACTION.Divide ||
      previousKeyPressed === ACTION.Equals
    ) {
      newValue = value;
    }

    processNumber({
      newValue,
      previousKeyPressed,
      setDisplay,
      setRegister,
      setPreviousKeyPressed,
    });

    //if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyAction = (action: string) => {
    log(`%cCALCULATOR handleKeyAction Key[${action}]`);

    processAction({
      action,
      display,
      operation,
      register,
      previousKeyPressed,
      setDisplay,
      setRegister,
      setOperation,
      setPreviousKeyPressed,
    });

    //if (inputRef.current) inputRef.current.focus();
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
          onKeyClick={() => handleKeyAction("Backspace")}
          className="text-3xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              className="stroke-2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
            />
          </svg>
        </CKey>
        <CKey
          onKeyClick={() => handleKeyAction("ClearAll")}
          className="text-3xl"
        >
          C
        </CKey>
        <CKey
          onKeyClick={() => handleKeyAction("ClearEntry")}
          className="text-3xl"
        >
          CE
        </CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Divide")}
          className={operation === "Divide" ? "bg-amber-400" : "bg-amber-300"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              className="stroke-2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.499 11.998h15m-7.5-6.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM12 18.751h.007v.007H12v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("7")}>7</CKey>
        <CKey onKeyClick={() => handleKeyNumber("8")}>8</CKey>
        <CKey onKeyClick={() => handleKeyNumber("9")}>9</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Times")}
          className={operation === "Times" ? "bg-amber-400" : "bg-amber-300"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10 transform rotate-45"
          >
            <path
              className="stroke-2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("4")}>4</CKey>
        <CKey onKeyClick={() => handleKeyNumber("5")}>5</CKey>
        <CKey onKeyClick={() => handleKeyNumber("6")}>6</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Minus")}
          className={operation === "Minus" ? "bg-amber-400" : "bg-amber-300"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              className="stroke-2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12h14"
            />
          </svg>
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("1")}>1</CKey>
        <CKey onKeyClick={() => handleKeyNumber("2")}>2</CKey>
        <CKey onKeyClick={() => handleKeyNumber("3")}>3</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Plus")}
          className={operation === "Plus" ? "bg-amber-400" : "bg-amber-300"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              className="stroke-2"
              stroke-linecap="round"
              stroke-linejoin="round"
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
          className={operation === "Equals" ? "bg-amber-400" : "bg-amber-300"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              className="stroke-2"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.499 8.248h15m-15 7.501h15"
            />
          </svg>
        </CKey>
      </div>
    </div>
  );
};

export default Calculator;
