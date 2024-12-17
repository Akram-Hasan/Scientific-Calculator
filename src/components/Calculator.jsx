// import React, { useState } from "react";
// import DisplayWindow from "./DisplayWindow";
// import KeysWindow from "./KeysWindow";

// const Calculator = () => {
//   const [expression, setExpression] = useState("");
//   const [displayEXP, setDisplayEXP] = useState("");
//   const [result, setResult] = useState("0");

//   const sciFunc = {
//     sin: "Math.sin",
//     cos: "Math.cos",
//     tan: "Math.tan",
//     ln: "Math.log",
//     log: "Math.log10",
//     π: "Math.PI",
//     e: "Math.E",
//     "^": "**",
//     "√": "Math.sqrt",
//   };

//   function calcResult() {
//     if (expression.length !== 0) {
//       try {
//         let compute = eval(expression);
//         compute = parseFloat(compute.toFixed(4));
//         setResult(compute);
//       } catch (error) {
//         setResult("An Error Occurred!");
//       }
//     } else {
//       setResult("An Error Occurred!");
//     }
//   }

//   function handleButton(value) {
//     if (value === "AC") {
//       setExpression("");
//       setDisplayEXP("");
//       setResult("0");
//     } else if (value === "DEL") {
//       setDisplayEXP(displayEXP.slice(0, -1));
//       setExpression(expression.slice(0, -1));
//     } else if (sciFunc.hasOwnProperty(value)) {
//       setDisplayEXP(displayEXP + value);
//       setExpression(expression + sciFunc[value]);
//     } else if (value === "!") {
//       const lastNum = extractLastNum(expression);
//       if (lastNum != null) {
//         const num = parseFloat(lastNum);
//         setDisplayEXP(displayEXP + value);
//         setExpression(expression.replace(lastNum, factorial(num)));
//       }
//     } else if (value === "=") calcResult();
//     else {
//       setExpression(expression + value);
//       setDisplayEXP(displayEXP + value);
//     }
//   }

//   function factorial(n) {
//     let result = 1;
//     for (let i = 1; i <= n; i++) result *= i;
//     return result;
//   }

//   function extractLastNum(exp) {
//     const numbers = exp.match(/\d+/g);
//     return numbers ? numbers[numbers.length - 1] : null;
//   }

//   return (
//     <div className="calculator">
//       <DisplayWindow expression={displayEXP} result={result} />
//       <KeysWindow handleButton={handleButton} />
//     </div>
//   );
// };

// export default Calculator;

import React, { useState } from "react";
import DisplayWindow from "./DisplayWindow";
import KeysWindow from "./KeysWindow";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [displayEXP, setDisplayEXP] = useState("");
  const [result, setResult] = useState("0");

  const sciFunc = {
    sin: "Math.sin",
    cos: "Math.cos",
    tan: "Math.tan",
    ln: "Math.log",
    log: "Math.log10",
    π: "Math.PI",
    e: "Math.E",
    "^": "**",
    "√": "Math.sqrt",
  };

  // Calculate the result safely with auto-balanced parentheses
  function calcResult() {
    if (expression.length !== 0) {
      try {
        let balancedExpression = expression;

        // Auto-close parentheses
        const openParens = (expression.match(/\(/g) || []).length;
        const closeParens = (expression.match(/\)/g) || []).length;
        for (let i = 0; i < openParens - closeParens; i++) {
          balancedExpression += ")";
        }

        let compute = eval(balancedExpression);
        compute = parseFloat(compute.toFixed(4));
        setResult(compute);
      } catch (error) {
        setResult("An Error Occurred!");
      }
    } else {
      setResult("An Error Occurred!");
    }
  }

  // Handle button click
  function handleButton(value) {
    if (value === "AC") {
      setExpression("");
      setDisplayEXP("");
      setResult("0");
    } else if (value === "DEL") {
      setDisplayEXP(displayEXP.slice(0, -1));
      setExpression(expression.slice(0, -1));
    } else if (sciFunc.hasOwnProperty(value)) {
      if (value === "√") {
        // Special handling for square root
        setDisplayEXP(displayEXP + "√(");
        setExpression(expression + "Math.sqrt(");
      } else {
        setDisplayEXP(displayEXP + value);
        setExpression(expression + sciFunc[value]);
      }
    } else if (value === "!") {
      const lastNum = extractLastNum(expression);
      if (lastNum != null) {
        const num = parseFloat(lastNum);
        setDisplayEXP(displayEXP + value);
        setExpression(expression.replace(lastNum, factorial(num)));
      }
    } else if (value === "=") {
      calcResult();
    } else {
      setExpression(expression + value);
      setDisplayEXP(displayEXP + value);
    }
  }

  // Factorial function
  function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) result *= i;
    return result;
  }

  // Extract last number from the expression
  function extractLastNum(exp) {
    const numbers = exp.match(/\d+/g);
    return numbers ? numbers[numbers.length - 1] : null;
  }

  return (
    <div className="calculator bg-gray-900 p-6 rounded-lg text-white">
      <DisplayWindow expression={displayEXP} result={result} />
      <KeysWindow handleButton={handleButton} />
    </div>
  );
};

export default Calculator;
