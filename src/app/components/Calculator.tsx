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

    if (inputRef.current) inputRef.current.focus();
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

    if (inputRef.current) inputRef.current.focus();
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
          Del
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
          /
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("7")}>7</CKey>
        <CKey onKeyClick={() => handleKeyNumber("8")}>8</CKey>
        <CKey onKeyClick={() => handleKeyNumber("9")}>9</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Times")}
          className={operation === "Times" ? "bg-amber-400" : "bg-amber-300"}
        >
          x
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("4")}>4</CKey>
        <CKey onKeyClick={() => handleKeyNumber("5")}>5</CKey>
        <CKey onKeyClick={() => handleKeyNumber("6")}>6</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Minus")}
          className={operation === "Minus" ? "bg-amber-400" : "bg-amber-300"}
        >
          -
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("1")}>1</CKey>
        <CKey onKeyClick={() => handleKeyNumber("2")}>2</CKey>
        <CKey onKeyClick={() => handleKeyNumber("3")}>3</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Plus")}
          className={operation === "Plus" ? "bg-amber-400" : "bg-amber-300"}
        >
          +
        </CKey>

        <CKey onKeyClick={() => handleKeyNumber("0")} className="col-span-2">
          0
        </CKey>
        <CKey onKeyClick={() => handleKeyNumber(".")}>.</CKey>
        <CKey
          onKeyClick={() => handleKeyAction("Equals")}
          className={operation === "Equals" ? "bg-amber-400" : "bg-amber-300"}
        >
          =
        </CKey>
      </div>
    </div>
  );
};

export default Calculator;
