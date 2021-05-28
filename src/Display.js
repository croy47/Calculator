import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";

export const Display = () => {
  let { calculated, currentNum, operator, encounteredError } =
    useGlobalContext();

  calculated = parseFloat(Number(calculated).toFixed(5));
  return (
    <div id="full-display">
      <div className="calculated">
        {encounteredError ? "BAD EXPRESSION " : calculated}
      </div>
      <div id="display" className="display-muted">
        {encounteredError
          ? "press AC button"
          : `${
              operator === "*" ? "X" : operator === "/" ? "÷" : operator ?? ""
            } ${
              currentNum === "" && operator
                ? ""
                : currentNum === ""
                ? 0
                : currentNum
            }`}
      </div>
    </div>
  );
};
