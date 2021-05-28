import React, { useEffect } from "react";
import { useGlobalContext } from "./Context";

const labels = new Map([
  ["AC", "clear"],
  ["%", "percentage"],
  ["←", "delete"],
  ["xʸ", "power"],
  ["√n", "root"],
  ["÷", "divide"],
  ["X", "multiply"],
  ["7", "seven"],
  ["8", "eight"],
  ["9", "nine"],
  ["-", "subtract"],
  ["4", "four"],
  ["5", "five"],
  ["6", "six"],
  ["+", "add"],
  ["1", "one"],
  ["2", "two"],
  ["3", "three"],
  ["=", "equals"],
  ["+/-", "toggle"],
  ["0", "zero"],
  [".", "decimal"],
]);

export const ButtonContainer = () => {
  const { captureClick } = useGlobalContext();

  let keys = labels.keys();
  keys = [...keys];

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      let key = e.key;

      //changing certain key to make keyboard access smooth
      key =
        key === "Enter"
          ? "="
          : key === "*"
          ? "X"
          : key === "Backspace"
          ? "←"
          : key;
      //only call captureClick when it is fruitful.
      if (keys.includes(key)) {
        captureClick(key);
      }
    });
  }, []);

  return (
    <div id="buttonContainer">
      {[...labels].map(([key, value]) => (
        <button
          id={value}
          key={value}
          className="button"
          onClick={() => captureClick(key)}
        >
          {key}
        </button>
      ))}
    </div>
  );
};
