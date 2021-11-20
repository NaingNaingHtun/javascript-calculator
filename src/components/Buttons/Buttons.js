import './style.css'
export default function Buttons(props) {
    return (
        <div className="buttons">
            <button id="clear" value="AC" onClick={props.allClear}>AC</button>
            <button id="divide" className="operator" value="/" onClick={props.handleOperators}>/</button>
            <button id="multiply" className="operator" value="x" onClick={props.handleOperators}>x</button>
            <button id="seven" className="number" value="7" onClick={props.numbers}>7</button>
            <button id="eight" className="number" value="8" onClick={props.numbers}>8</button>
            <button id="nine" className="number" value="9" onClick={props.numbers}>9</button>
            <button id="subtract" className="operator" value="-" onClick={props.handleOperators}>-</button>
            <button id="four" className="number" value="4" onClick={props.numbers}>4</button>
            <button id="five" className="number" value="5" onClick={props.numbers}>5</button>
            <button id="six" className="number" value="6" onClick={props.numbers}>6</button>
            <button id="add" className="operator" value="+" onClick={props.handleOperators}>+</button>
            <button id="one" className="number" value="1" onClick={props.numbers}>1</button>
            <button id="two" className="number" value="2" onClick={props.numbers}>2</button>
            <button id="three" className="number" value="3" onClick={props.numbers}>3</button>
            <button id="zero" className="number" value="0" onClick={props.numbers}>0</button>
            <button id="decimal" onClick={props.handleDecimal} value=".">.</button>
            <button id="equals" className="operator" onClick={props.handleEvaluate}>=</button>
        </div>
    );
};
