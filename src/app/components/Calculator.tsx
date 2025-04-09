import { useRef, useState } from "react";
import CalculatorInput from "./CalculatorInput";
import CKey from "./CalculatorKey";
import { processAction } from "./processAction";
import { processNumber } from "./processNumber";
import { ACTION } from "../lib/constants";

// -------------------------------------------------------------------------------------------------

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [previousKeyPressed, setPreviousKeyPressed] = useState<string>("");
  const [register, setRegister] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------------------------------------------

  const handleInputNumber = (value: string) => {
    console.log(
      `%cCALCULATOR handleInputNumber Display[${display}] Operation[${operation}] register[${register}] previousKeyPressed[${previousKeyPressed}] `,
      "color:blue;font-weight:700;"
    );

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
      newValue: newValue,
      previousKeyPressed,
      setDisplay,
      setRegister: setRegister,
      setPreviousKeyPressed,
    });

    if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  const handleInputAction = (action: string) => {
    console.log(
      `%cCALCULATOR handleInputAction Action[${action}]`,
      "color:blue;font-weight:700;"
    );
    processAction({
      action,
      display,
      operation,
      register: register,
      previousKeyPressed,
      setDisplay,
      setRegister: setRegister,
      setOperation,
      setPreviousKeyPressed,
    });
  };

  // -------------------------------------------------------------------------------------------------

  const handleKeyClick = (key: string) => {
    console.log(
      `%cCALCULATOR handleKeyClick Key[${key}]`,
      "color:blue;font-weight:700;"
    );

    const isAction = Object.keys(ACTION).includes(key);
    if (isAction) {
      processAction({
        action: key,
        display,
        operation,
        register: register,
        previousKeyPressed,
        setDisplay,
        setRegister: setRegister,
        setOperation,
        setPreviousKeyPressed,
      });
    } else {
      let newValue = display + key;
      if (
        previousKeyPressed === ACTION.Plus ||
        previousKeyPressed === ACTION.Minus ||
        previousKeyPressed === ACTION.Times ||
        previousKeyPressed === ACTION.Divide ||
        previousKeyPressed === ACTION.Equals
      ) {
        newValue = key;
      }

      processNumber({
        newValue: newValue,
        previousKeyPressed,
        setDisplay,
        setRegister: setRegister,
        setPreviousKeyPressed,
      });
    }
    if (inputRef.current) inputRef.current.focus();
  };

  // -------------------------------------------------------------------------------------------------

  return (
    <div className="bg-gray-400 p-4 pt-6 rounded-xl shadow shadow-gray-500 select-none">
      <CalculatorInput
        value={display}
        onNumberChange={handleInputNumber}
        onActionSelect={handleInputAction}
        inputRef={inputRef}
      />

      <div className="grid grid-cols-4 gap-3 mb-2 ">
        <CKey
          onKeyClick={() => handleKeyClick("Backspace")}
          className="text-3xl"
        >
          Del
        </CKey>
        <CKey
          onKeyClick={() => handleKeyClick("ClearAll")}
          className="text-3xl"
        >
          C
        </CKey>
        <CKey
          onKeyClick={() => handleKeyClick("ClearEntry")}
          className="text-3xl"
        >
          CE
        </CKey>
        <CKey
          onKeyClick={() => handleKeyClick("Divide")}
          className={operation === "Divide" ? "bg-amber-500" : "bg-amber-400"}
        >
          /
        </CKey>

        <CKey onKeyClick={() => handleKeyClick("7")}>7</CKey>
        <CKey onKeyClick={() => handleKeyClick("8")}>8</CKey>
        <CKey onKeyClick={() => handleKeyClick("9")}>9</CKey>
        <CKey
          onKeyClick={() => handleKeyClick("Times")}
          className={operation === "Times" ? "bg-amber-500" : "bg-amber-400"}
        >
          x
        </CKey>

        <CKey onKeyClick={() => handleKeyClick("4")}>4</CKey>
        <CKey onKeyClick={() => handleKeyClick("5")}>5</CKey>
        <CKey onKeyClick={() => handleKeyClick("6")}>6</CKey>
        <CKey
          onKeyClick={() => handleKeyClick("Minus")}
          className={operation === "Minus" ? "bg-amber-500" : "bg-amber-400"}
        >
          -
        </CKey>

        <CKey onKeyClick={() => handleKeyClick("1")}>1</CKey>
        <CKey onKeyClick={() => handleKeyClick("2")}>2</CKey>
        <CKey onKeyClick={() => handleKeyClick("3")}>3</CKey>
        <CKey
          onKeyClick={() => handleKeyClick("Plus")}
          className={operation === "Plus" ? "bg-amber-500" : "bg-amber-400"}
        >
          +
        </CKey>

        <CKey onKeyClick={() => handleKeyClick("0")} className="col-span-2">
          0
        </CKey>
        <CKey onKeyClick={() => handleKeyClick(".")}>.</CKey>
        <CKey
          onKeyClick={() => handleKeyClick("Equals")}
          className={operation === "Equals" ? "bg-amber-500" : "bg-amber-400"}
        >
          =
        </CKey>
      </div>
    </div>
  );
};

export default Calculator;
