import { vi, describe, test, expect } from "vitest";
import { processAction } from "@/app/components/processAction";
import { ACTION } from "@/app/lib/constants";

// -------------------------------------------------------------------------------------------------

describe(">>> PROCESS NUMBER - CALCULATOR KEY CLICK", () => {
  test("01) equals", () => {
    const setDisplay = vi.fn();
    const setRegister = vi.fn();
    const setOperation = vi.fn();
    const setPreviousKeyPressed = vi.fn();

    processAction({
      action: ACTION.Equals,
      display: "3",
      operation: ACTION.Plus,
      register: 2,
      previousKeyPressed: "Number",
      setDisplay,
      setRegister: setRegister,
      setOperation,
      setPreviousKeyPressed,
    });

    expect(setDisplay).toHaveBeenCalledWith("5");
    expect(setRegister).toHaveBeenCalledWith(5);
    expect(setOperation).toHaveBeenCalledWith(null);
    expect(setPreviousKeyPressed).toHaveBeenCalledWith("Equals");
  });
});
