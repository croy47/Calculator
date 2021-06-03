// const initialState = {
//   calculated: 0,
//   currentNum: "",
//   operator: null,
// };

const reducer = (state, action) => {
  const { calculated, currentNum, operator, encounteredError } = state;
  state.equalToPressed = false;
  try {
    switch (action.type) {
      //NUMBER CAPTURED
      case "NUMBER_CAPTURED":
        //prevents octal literal
        if (action.payload === "0" && currentNum === "") {
          return { ...state, currentNum: "0" };
        } else if (action.payload === "0" && currentNum === "0") {
          return { ...state };
        } else if (action.payload !== "0" && currentNum === "0") {
          return { ...state, currentNum: action.payload };
        } else {
          return { ...state, currentNum: currentNum + action.payload };
        }

      //BASIC OPERATOR CAPTURE CAPTURED [+-*/]
      case "BASIC_OPERATOR_CAPTURED":
        //if operator is changed consecutively
        //__
        //if operator is changed like this consecutively (* - + - /)
        if (currentNum === "-") {
          return { ...state, currentNum: "", operator: action.payload };
        }
        if (operator && !currentNum) {
          //5 * -5 should output -25 and not zero.
          if (action.payload === "-") {
            return { ...state, currentNum: action.payload + currentNum };
          }
          return { ...state, operator: action.payload };
        }

        //evaluation of calculated
        if (action.payload === "X") {
          action.payload = "*";
        }
        if (action.payload === "÷") {
          action.payload = "/";
        }
        //handles evaluation
        return {
          ...state,
          currentNum: "",
          calculated:
            currentNum && operator
              ? eval(`(${calculated}) ${operator} ${currentNum}`)
              : !currentNum && calculated
              ? calculated
              : currentNum,
          operator: action.payload,
        };

      // HANDLE EQUAL SIGN
      case "EQUAL_SIGN":
        if (!operator) {
          return { ...state };
        }

        let evaluated = eval(
          `(${calculated}) ${operator} ${currentNum}`
        ).toString();

        return {
          ...state,
          currentNum: evaluated,
          operator: "",
          calculated: evaluated,
          equalToPressed: true,
        };

      //TOGGLE
      case "TOGGLE_POSITIVE_NEGATIVE":
        //toggle shouldn't change the status if currentNum is empty
        if (currentNum && currentNum !== "-")
          return { ...state, currentNum: currentNum * -1 };

      //HANDLE ROOT
      case "ROOT":
        let squaredValue =
          calculated === "0" || (calculated === "" && currentNum)
            ? Math.sqrt(currentNum)
            : calculated && !operator
            ? Math.sqrt(calculated)
            : Math.sqrt(eval(`(${calculated}) ${operator} ${currentNum}`));
        return { ...state, calculated: squaredValue, currentNum: "" };

      ////HANDLE DECIMAL
      case "DECIMAL_CAPTURED":
        if (!currentNum.includes(".")) {
          if (currentNum === "") {
            return { ...state, currentNum: "0" + currentNum + "." };
          }
          return { ...state, currentNum: currentNum + "." };
        } else {
          return { ...state };
        }

      //HANDLE BACKSPACE
      case "DELETE_LAST_ENTERED_VALUE":
        return { ...state, currentNum: currentNum.slice(0, -1) };

      //HANDLE PERCENTAGE
      case "PERCENTAGE":
        //if prev calc is pending, it should be executed before calcing perc val

        let percentageVal =
          (calculated === "0" || calculated === "") && currentNum
            ? currentNum / 100
            : calculated && !operator
            ? calculated / 100
            : eval(`(${calculated}) ${operator} ${currentNum}`) / 100;

        return {
          ...state,
          currentNum: percentageVal,
          calculated: percentageVal,
          operator: "",
        };

      //CLEAR DISPLAY
      case "CLEAR_DISPLAY":
        return {
          ...state,
          calculated: "0",
          currentNum: "0",
          operator: "",
          encounteredError: false,
        };

      // HANDLE POWER BUTTON
      case "POWER":
        // if (operator === "**") {
        //   let evaluated = eval(
        //     `${calculated} ${operator} ${currentNum}`
        //   );
        //   console.log("this");
        //   return { ...state, currentNum: "", calculated: evaluated };
        // }

        if (currentNum && operator && calculated) {
          let evaluated = eval(`(${calculated}) ${operator} ${currentNum}`);

          return {
            ...state,
            currentNum: "",
            calculated: evaluated,
            operator: "**",
          };
        }

        return {
          ...state,
          operator: "**",
          currentNum: "",
          calculated: currentNum,
        };

      //default value => return state value as it is
      default:
        return state;

      //SWITCH ENDS HERE
    }

    //Try Ends Here
  } catch (error) {
    return {
      ...state,
      encounteredError: true,
    };
  }
};

export default reducer;
