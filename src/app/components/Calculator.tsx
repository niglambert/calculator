import { useRef, useState } from "react";
import CalculatorInput from "./CalculatorInput";
import CKey from "./CalculatorKey";
import { ACTION, MAX_INPUT_LENGTH } from "../lib/constants";
import { processAction } from "./processAction";
import { processNumber } from "./processNumber";
import { formatDisplay, isNumberValid } from "../lib/utils";

// -------------------------------------------------------------------------------------------------

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState<string | null>(null);
  const [previousKeyPressed, setPreviousKeyPressed] = useState<string>("");
  const [register, setRegister] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // -------------------------------------------------------------------------------------------------

  const handleInputNumber = (combinedNumber: string) => {
    console.log(
      `%cCALCULATOR handleInputNumber Display[${display}] CombinedNumber[${combinedNumber}] Operation[${operation}] register[${register}] previousKeyPressed[${previousKeyPressed}] `,
      "color:blue;font-weight:700;"
    );

    // NEW OPERAND where previousKeyPressed was not a number
    let numberEntered = combinedNumber;
    if (
      previousKeyPressed === ACTION.Plus ||
      previousKeyPressed === ACTION.Minus ||
      previousKeyPressed === ACTION.Times ||
      previousKeyPressed === ACTION.Divide ||
      previousKeyPressed === ACTION.Equals
    ) {
      numberEntered = combinedNumber.slice(display.length);
      console.log(`NEW OPERAND: [${numberEntered}]`);
    }

    processNumber({
      numberEntered: numberEntered,
      combinedNumber: combinedNumber,
      previousKeyPressed,
      setDisplay,
      setRegister: setRegister,
      setPreviousKeyPressed,
    });
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
      //const combinedNumber = display + key;

      // After Equals clear register for a new calculation
      if (previousKeyPressed === ACTION.Equals) {
        setRegister(null);
      }

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

      if (!isNumberValid(newValue, MAX_INPUT_LENGTH)) return;

      setPreviousKeyPressed("Number");
      setDisplay(formatDisplay(newValue));

      if (inputRef.current) inputRef.current.focus();
    }
  };

  // -------------------------------------------------------------------------------------------------

  return (
    <div className="bg-gray-400 p-4 pt-6 rounded-xl shadow shadow-gray-500 select-none">
      <div className="text-md mb-4 text-right">Display [{display}]</div>
      <div className="text-md mb-4 text-right">Register [{register}]</div>
      <div className="text-md mb-4 text-right">Operation [{operation}]</div>
      <div className="text-md mb-4 text-right">
        Last Key [{previousKeyPressed}]
      </div>
      <CalculatorInput
        value={display}
        onNumberChange={handleInputNumber}
        onActionSelect={handleInputAction}
        maxLength={MAX_INPUT_LENGTH}
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
