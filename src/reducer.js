// const initialState = {
//   calculated: 0,
//   currentNum: "",
//   operator: null,
// };

const reducer = (state, action) => {
  //NUMBER CAPTURED
  try {
    if (action.type === "NUMBER_CAPTURED") {
      //prevents octal literal
      if (action.payload === "0" && state.currentNum === "") {
        return { ...state, currentNum: "" };
      } else {
        return { ...state, currentNum: state.currentNum + action.payload };
      }
    }
    //BASIC OPERATOR CAPTURE CAPTURED [+-*/]
    if (action.type === "BASIC_OPERATOR_CAPTURED") {
      //if operator is changed consecutively
      //__
      //if operator is changed like this consecutively (* - + - /)
      if (state.currentNum === "-") {
        return { ...state, currentNum: "", operator: action.payload };
      }
      if (state.operator && !state.currentNum) {
        //5 * -5 should output -25 and not zero.
        if (action.payload === "-") {
          return { ...state, currentNum: action.payload + state.currentNum };
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
      return {
        ...state,
        currentNum: "",
        calculated:
          state.currentNum && state.operator
            ? eval(`${state.calculated} ${state.operator} ${state.currentNum}`)
            : state.currentNum,
        operator: action.payload,
      };
    }

    // HANDLE EQUAL SIGN
    if (action.type === "EQUAL_SIGN") {
      if (!state.operator) {
        return { ...state };
      }

      let evaluated = eval(
        `${state.calculated} ${state.operator} ${state.currentNum}`
      ).toString();
      // console.log(state.operator);
      return {
        ...state,
        currentNum: evaluated,
        operator: "",
        calculated: evaluated,
      };
    }
    //TOGGLE
    if (action.type === "TOGGLE_POSITIVE_NEGATIVE") {
      //toggle shouldn't change the status if currentNum is empty
      if (state.currentNum && state.currentNum !== "-")
        return { ...state, currentNum: state.currentNum * -1 };
    }

    //HANDLE ROOT
    if (action.type === "ROOT") {
      let squaredValue =
        state.calculated === "0" && state.currentNum
          ? Math.sqrt(state.currentNum)
          : Math.sqrt(
              eval(`${state.calculated} ${state.operator} ${state.currentNum}`)
            );
      return { ...state, calculated: squaredValue, currentNum: "" };
    }

    //HANDLE DECIMAL
    if (action.type === "DECIMAL_CAPTURED") {
      if (!state.currentNum.includes(".")) {
        if (state.currentNum === "") {
          return { ...state, currentNum: "0" + state.currentNum + "." };
        }
        return { ...state, currentNum: state.currentNum + "." };
      }
    }

    //HANDLE BACKSPACE
    if (action.type === "DELETE_LAST_ENTERED_VALUE") {
      return { ...state, currentNum: state.currentNum.slice(0, -1) };
    }

    //HANDLE PERCENTAGE
    if (action.type === "PERCENTAGE") {
      let percentageVal = state.currentNum / 100;
      return { ...state, currentNum: percentageVal, calculated: percentageVal };
    }

    //CLEAR DISPLAY
    if (action.type === "CLEAR_DISPLAY") {
      return { calculated: 0, currentNum: "", operator: null };
    }

    //POWER
    if (action.type === "POWER") {
      if (state.operator === "**") {
        let evaluated = eval(
          `${state.calculated} ${state.operator} ${state.currentNum}`
        );
        return { ...state, currentNum: "", calculated: evaluated };
      }

      return {
        ...state,
        operator: "**",
        currentNum: "",
        calculated: state.currentNum,
      };
    }

    return state;

    //Try Ends Here
  } catch (error) {
    console.log(error);
    return {
      ...state,
      calculated: "INVALID EXPRESSION",
      currentNum: "",
      operator: "",
    };
  }
};

export default reducer;
