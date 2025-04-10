import { vi, describe, test, expect } from "vitest";
import { processAction } from "@/app/components/processAction";
import { ACTION } from "@/app/lib/constants";

// -------------------------------------------------------------------------------------------------

describe(">>> PROCESS NUMBER - CALCULATOR KEY CLICK", () => {
  test("01) equals", () => {
    const setDisplay = vi.fn();
    const setRegister = vi.fn();
    const setOperation = vi.fn();
    const setPreviousAction = vi.fn();

    processAction({
      action: ACTION.Equals,
      display: "3",
      operation: ACTION.Plus,
      accumulator: 2,
      previousAction: ACTION.Number,
      setDisplay,
      setAccumulator: setRegister,
      setOperation,
      setPreviousAction,
    });

    expect(setDisplay).toHaveBeenCalledWith("5");
    expect(setRegister).toHaveBeenCalledWith(5);
    expect(setOperation).toHaveBeenCalledWith(null);
    expect(setPreviousAction).toHaveBeenCalledWith("Equals");
  });
});
