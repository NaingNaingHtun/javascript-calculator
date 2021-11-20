import Buttons from '../components/Buttons/Buttons';
import FormulaScreen from '../components/FormulaScreen/FormulaScreen';
import Output from '../components/Output/Output';
import './App.css';
import { useState } from 'react';

//VARS:
const isOperator = /[x+/-]/,
  endsWithOperator = /[-+x/]$/,
  endsWithNegativeSign = /\d[+-x/]?-$/;
function App() {
  const [currentVal, setCurrentVal] = useState('0');
  const [formula, setFormula] = useState('');
  const [preVal, setPreVal] = useState('0');
  const [evaluated, setEvaluated] = useState(false);
  function maxDigitWarning() {
    setCurrentVal('Digit Limit Met');
    setTimeout(() => setCurrentVal(currentVal), 1000);
  }

  function allClear() {
    setCurrentVal('0');
    setFormula('');
    setPreVal('0');
    setEvaluated(false);
  }
  function handleNumbers(e) {
    if (!currentVal.includes('Limit')) {
      const value = e.target.value;
      setEvaluated(false);
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (evaluated) {
        setCurrentVal(value);
        setFormula(value !== '0' ? value : '');
      } else {
        setCurrentVal(currentVal === '0' || isOperator.test(currentVal) ? value : currentVal + value);
        setFormula(currentVal === '0' && value === '0' ? formula === '' ? value : formula : /([^.0-9]0|^0)$/.test(formula) ? formula.slice(0, -1) + value : formula + value);
      }
    }
  }

  function handleOperators(e) {
    if (!currentVal.includes('Limit')) {
      const value = e.target.value;
      setCurrentVal(value);
      setEvaluated(false);
      if (evaluated) {
        setFormula(preVal + value);
      } else if (!endsWithOperator.test(formula)) {
        setPreVal(formula);
        setFormula(formula + value);
      } else if (!endsWithNegativeSign.test(formula)) {
        setFormula((endsWithNegativeSign.test(formula + value) ? formula : preVal) + value);
      } else {
        console.log("End with negative sign.", formula);
        endsWithNegativeSign.test(formula + value) ? setFormula(formula + value) : setFormula(value === '-' ? formula : preVal + value);
      }
    }
  }

  function handleDecimal() {
    if (evaluated) {
      setCurrentVal('0.');
      setFormula('0.');
      setEvaluated(false);
    } else if (
      !currentVal.includes('.') &&
      !currentVal.includes('Limit')
    ) {
      setEvaluated(false);
      if (currentVal.length > 21) {
        maxDigitWarning();
      } else if (
        endsWithOperator.test(formula) ||
        (currentVal === '0' && formula === '')
      ) {
        setCurrentVal('0.');
        setFormula(formula + '0.');
      } else {
        setCurrentVal(formula.match(/(-?\d+\.?\d*)$/)[0] + '.');
        setFormula(formula + '.');
      }
    }
  }

  function handleEvaluate() {
    if (!currentVal.includes('Limit')) {
      let expression = formula;
      while (endsWithOperator.test(expression)) {
        expression = expression.slice(0, -1);
      }
      expression = expression
        .replace(/x/g, '*')
        .replace(/‑/g, '-')
        .replace('--', '+');
      let answer = '';
      try {
        answer = eval(expression).toString();
      } catch {
        answer = 'NAN';
      }

      setCurrentVal(answer);
      setFormula(formula + `=${answer}`);
      setPreVal(answer);
      setEvaluated(true);
    }
  }
  return (
    <div>
      <div id="calculator">
        <FormulaScreen formula={formula} />
        <Output output={currentVal} />
        <Buttons
          numbers={handleNumbers}
          allClear={allClear}
          handleDecimal={handleDecimal}
          handleEvaluate={handleEvaluate}
          handleOperators={handleOperators}
        />
      </div>
      <div id="footer">
        Coded by <a href="https://github.com/naingnainghtun">NaingNaingHtun</a>
      </div>
    </div>
  );
}

export default App;
