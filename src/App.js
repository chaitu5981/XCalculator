import React, { useState } from "react";
import "./App.css";
const App = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const sanitize = (newInput) => {
    const n = newInput.length;
    if (newInput.length === 0) return "";
    if ("*/-+".includes(newInput[n - 2]) && "*/+-".includes(newInput[n - 1])) {
      newInput = newInput.slice(0, n - 2) + newInput[n - 1];
    }
    return newInput;
  };
  const sanitize2 = (input) => {
    if ("+/-*".includes(input[input.length - 1]))
      return input.slice(0, input.length - 1);
    else return input;
  };
  const addInput = (c) => {
    let newInput = input + c;
    newInput = sanitize(newInput);
    setInput(newInput);
  };
  const handleChange = (e) => {
    setInput(sanitize(e.target.value));
  };
  const buildOperand = (op, c) => {
    return op * 10 + Number(c);
  };
  const calculate = () => {
    if (!input || "*/".includes(input[0])) return setAnswer("Error");

    let input1 = sanitize2(input);
    let op1 = 0,
      op2 = 0,
      haveFirstOp = false;
    let tempArr = [];
    let operator = "";
    input1.split("").forEach((c) => {
      if ("0123456789".includes(c)) {
        if (haveFirstOp) op2 = buildOperand(op2, c);
        else op1 = buildOperand(op1, c);
      }
      if ("*/".includes(c)) {
        if (haveFirstOp && operator) {
          if (operator === "*") op1 = op1 * op2;
          else {
            if (op2 === 0)
              if (op1 === 0) return setAnswer("NaN");
              else return setAnswer("Infinity");
            else op1 = op1 / op2;
          }

          op2 = 0;
          operator = c;
        } else {
          haveFirstOp = true;
          operator = c;
        }
      }
      if ("+-".includes(c)) {
        if (!haveFirstOp) {
          tempArr.push(op1);
          tempArr.push(c);
          op1 = 0;
        } else {
          operator === "*" ? (op1 = op1 * op2) : (op1 = op1 / op2);
          tempArr.push(op1);
          tempArr.push(c);
          op1 = 0;
          op2 = 0;
          operator = "";
          haveFirstOp = false;
        }
      }
    });
    if (haveFirstOp && operator) {
      operator === "*" ? (op1 = op1 * op2) : (op1 = op1 / op2);
      tempArr.push(op1);
    } else tempArr.push(op1);
    console.log(tempArr);
    let res = tempArr[0],
      operator1 = "";
    for (let i = 1; i < tempArr.length; i++) {
      if (typeof tempArr[i] === "number" && operator1) {
        operator1 === "+" ? (res += tempArr[i]) : (res -= tempArr[i]);
        operator1 = "";
      } else operator1 = tempArr[i];
    }
    setAnswer(res + "");
  };
  const deleteInput = () => {
    setInput("");
    setAnswer("");
  };
  return (
    <div className="container">
      <h1>React Calculator</h1>
      <div className="calculator">
        <input
          className="input"
          type="text"
          value={input}
          onChange={handleChange}
        />
        <p className="answer">{answer}</p>
        <div className="keypad">
          <button className="btn" onClick={() => addInput(7)}>
            7
          </button>
          <button className="btn" onClick={() => addInput(8)}>
            8
          </button>
          <button className="btn" onClick={() => addInput(9)}>
            9
          </button>
          <button className="btn" onClick={() => addInput("+")}>
            +
          </button>
          <button className="btn" onClick={() => addInput(4)}>
            4
          </button>
          <button className="btn" onClick={() => addInput(5)}>
            5
          </button>
          <button className="btn" onClick={() => addInput(6)}>
            6
          </button>
          <button className="btn" onClick={() => addInput("-")}>
            -
          </button>
          <button className="btn" onClick={() => addInput(1)}>
            1
          </button>
          <button className="btn" onClick={() => addInput(2)}>
            2
          </button>
          <button className="btn" onClick={() => addInput(3)}>
            3
          </button>
          <button className="btn" onClick={() => addInput("*")}>
            *
          </button>
          <button className="btn" onClick={deleteInput}>
            C
          </button>
          <button className="btn" onClick={() => addInput(0)}>
            0
          </button>
          <button className="btn" onClick={calculate}>
            =
          </button>
          <button className="btn" onClick={() => addInput("/")}>
            /
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
