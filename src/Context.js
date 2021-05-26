import React, { useContext, useReducer } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();
//Provider, Consumer

const initialState = {
  calculated: "0",
  currentNum: "",
  operator: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const captureClick = (key) => {
    console.log(key);
    //SPECIAL OPERTATORS
    //________________________________________________
    //HANDLE NEGATIVE/POSITIVE
    if (key === "+/-") {
      return dispatch({ type: "TOGGLE_POSITIVE_NEGATIVE" });
    }

    //handle AC button
    if (key === "AC") {
      console.log(key);
      return dispatch({ type: "CLEAR_DISPLAY" });
    }
    // HANDLE EQUAL(=) BUTTON
    if (key === "=") {
      //null has to be tackled
      return dispatch({ type: "EQUAL_SIGN" });
    }

    //HANDLE DECIMAL BUTTON
    if (key === ".") {
      return dispatch({ type: "DECIMAL_CAPTURED" });
    }

    //HANDLE BACKSPACE
    if (key === "←") {
      return dispatch({ type: "DELETE_LAST_ENTERED_VALUE" });
    }

    //HANDLE ROOT
    if (key === "√n") {
      return dispatch({ type: "ROOT" });
    }

    //HANDLE PERCENTAGE
    if (key === "%") {
      return dispatch({ type: "PERCENTAGE" });
    }

    if (key === "xʸ") {
      return dispatch({ type: "POWER" });
    }

    //________________________________________________________________

    //handle numbers

    let numReg = /[0-9]/;
    let isNum = numReg.test(key);
    if (isNum) {
      return dispatch({ type: "NUMBER_CAPTURED", payload: key });
    }

    //handle basic operators
    let operatorReg = /[-+X÷]/;
    let isOperator = operatorReg.test(key);

    if (isOperator) {
      return dispatch({ type: "BASIC_OPERATOR_CAPTURED", payload: key });
    }

    //////CODE BLOCK ENDS HERE
  };

  return (
    <AppContext.Provider value={{ ...state, captureClick }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
