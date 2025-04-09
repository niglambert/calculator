import { processNumber } from "@/app/components/processNumber";
import { vi, describe, it, expect, beforeEach } from "vitest";

const setDisplay = vi.fn();
const setPreviousKeyPressed = vi.fn();
const setRegister = vi.fn();

let previousKeyPressed: string = "";

// // Helper function to mock number validation
// const isNumberValid = (value: string, maxLength: number) => {
//   return value.length <= maxLength;
// };

// // Mock formatDisplay function
// const formatDisplay = (value: number | string) => value;

// Mocking previousKeyPressed directly in each test scenario
beforeEach(() => {
  // Reset mock functions and state before each test
  vi.clearAllMocks();
  previousKeyPressed = "";
});

// -------------------------------------------------------------------------------------------------

describe(">>> PROCESS NUMBER - CALCULATOR KEY CLICK", () => {
  it("01) should update the display the concatenated number when previous action was a Number key", () => {
    const value = "1234"; // Key pressed
    previousKeyPressed = "Number";

    processNumber({
      newValue: value,
      previousKeyPressed,
      setRegister: setRegister,
      setPreviousKeyPressed,
      setDisplay,
    });

    expect(setPreviousKeyPressed).toHaveBeenCalledWith("Number");
    expect(setDisplay).toHaveBeenCalledWith(value);
  });

  // -------------------------------------------------------------------------------------------------

  it("02) should replace Display with the number pressed when the previous action was Equals", () => {
    const value = "1234"; // Key pressed
    previousKeyPressed = "Equals";

    processNumber({
      newValue: value,
      previousKeyPressed,
      setRegister: setRegister,
      setPreviousKeyPressed,
      setDisplay,
    });

    expect(setPreviousKeyPressed).toHaveBeenCalledWith("Number");
    expect(setDisplay).toHaveBeenCalledWith(value);
    expect(setRegister).toHaveBeenCalledWith(null);
  });

  // -------------------------------------------------------------------------------------------------

  it("03) should replace Display with the number pressed when previous key was an Operation", () => {
    const value = "1234"; // Key pressed
    previousKeyPressed = "Plus";

    processNumber({
      newValue: value,
      previousKeyPressed,
      setRegister: setRegister,
      setPreviousKeyPressed,
      setDisplay,
    });

    expect(setPreviousKeyPressed).toHaveBeenCalledWith("Number");
    expect(setDisplay).toHaveBeenCalledWith(value);
  });

  // -------------------------------------------------------------------------------------------------

  it("04) should not update the Display if the number is invalid", () => {
    const value = "12345678904"; // Invalid too long
    previousKeyPressed = "Plus";

    processNumber({
      newValue: value,
      previousKeyPressed,
      setRegister: setRegister,
      setPreviousKeyPressed,
      setDisplay,
    });

    expect(setDisplay).not.toHaveBeenCalled();
  });
});
