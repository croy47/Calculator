import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";

export const Display = () => {
  let { calculated, currentNum, operator, encounteredError, equalToPressed } =
    useGlobalContext();

  calculated = parseFloat(Number(calculated).toFixed(5)).toString();

  //check if it fits on the screen
  let windowWidth = window.innerWidth < 500;
  let overflowed = windowWidth && calculated.length > 15;

  useEffect(() => {
    if (windowWidth) {
      let displayMuted = document.querySelector(".display-muted");
      if (equalToPressed) {
        displayMuted.classList.add("hide");
      } else {
        displayMuted.classList.remove("hide");
      }
    }
  }, [equalToPressed, windowWidth]);

  return (
    <div id="full-display">
      <div className="calculated">
        {encounteredError
          ? "BAD EXPRESSION "
          : overflowed
          ? "OVERFLOWED"
          : calculated}
      </div>
      <div
        id="display"
        className={`display-muted ${
          currentNum === "" && operator == "" ? "hide" : ""
        }`}
      >
        {encounteredError
          ? "press AC button"
          : overflowed
          ? "Sorry, I am just a kid"
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
