import { describe, it, expect } from "vitest";
import { formatDisplay, performCalculation } from "../src/app/lib/utils";
import { ACTION, MAX_INPUT_LENGTH } from "../src/app/lib/constants";

describe(">>> FORMAT DISPLAY", () => {
  it("01) should strip leading zeroes", () => {
    expect(formatDisplay("005")).toBe("5");
    expect(formatDisplay(".005")).toBe("0.005");
  });

  it(`02) should display an exponent for values longer than ${MAX_INPUT_LENGTH} chars`, () => {
    const longNumber = Number("9".repeat(MAX_INPUT_LENGTH + 1));
    const result = `1.00e+${MAX_INPUT_LENGTH + 1}`; // "1.00e+9"
    expect(formatDisplay(longNumber)).toBe(result);
  });

  it("03) should display exponent when too large", () => {
    expect(formatDisplay("-0")).toBe("0");
  });
});

describe(">>> PERFORM CALCULATION", () => {
  it("01) should add two numbers", () => {
    expect(
      performCalculation({ display: "12", register: 13, action: ACTION.Plus })
    ).toBe(25);
  });
  it("02) should subtract two numbers", () => {
    expect(
      performCalculation({ display: "12", register: 13, action: ACTION.Minus })
    ).toBe(1);
  });
  it("03) should multiply two numbers", () => {
    expect(
      performCalculation({ display: "12", register: 13, action: ACTION.Times })
    ).toBe(156);
  });
  it("04) should divide two numbers", () => {
    expect(
      performCalculation({ display: "12", register: 13, action: ACTION.Divide })
    ).toBe(1.0833333333333333);
  });
  it("05) should just return the display value if the action is not known", () => {
    expect(
      performCalculation({ display: "12", register: 13, action: ACTION.Delete })
    ).toBe(12);
  });
});
