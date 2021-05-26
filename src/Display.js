import React from "react";
import { useGlobalContext } from "./Context";

export const Display = () => {
  let { calculated, currentNum, operator } = useGlobalContext();

  calculated = parseFloat(Number(calculated).toFixed(5));

  return (
    <div id="full-display">
      <div className="calculated">{calculated}</div>
      <div id="display" className="display-muted">{`${
        operator === "*" ? "X" : operator === "/" ? "÷" : operator ?? ""
      } ${
        currentNum === "" && operator ? "" : currentNum === "" ? 0 : currentNum
      }`}</div>
    </div>
  );
};
