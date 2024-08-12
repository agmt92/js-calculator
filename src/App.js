import React from 'react';
import { connect } from 'react-redux';
import {
  clear,
  inputNumber,
  inputOperator,
  inputDecimal,
  calculate,
} from './redux';
import './App.scss';

class CalculatorButtons extends React.Component {
  handleClick = (event) => {
    const button = event.target;
    const buttonValue = button.innerHTML;

    if (button.id === 'clear') {
      this.props.clear();
    } else if (['+', '-', '*', '/'].includes(buttonValue)) {
      this.props.inputOperator(buttonValue);
    } else if (button.id === 'decimal') {
      this.props.inputDecimal();
    } else if (button.id === 'equals') {
      this.props.calculate();
    } else {
      this.props.inputNumber(buttonValue);
    }
  };

  render() {
    return (
      <div className="calculator-buttons">
        <button id="clear" className="ac-button" onClick={this.handleClick}>{this.props.clearText}</button>
        <button id="divide" className="button division side" onClick={this.handleClick}>/</button>
        <button id="seven" className="button" onClick={this.handleClick}>7</button>
        <button id="eight" className="button" onClick={this.handleClick}>8</button>
        <button id="nine" className="button" onClick={this.handleClick}>9</button>
        <button id="multiply" className="button side" onClick={this.handleClick}>*</button>
        <button id="four" className="button" onClick={this.handleClick}>4</button>
        <button id="five" className="button" onClick={this.handleClick}>5</button>
        <button id="six" className="button" onClick={this.handleClick}>6</button>
        <button id="subtract" className="button side" onClick={this.handleClick}>-</button>
        <button id="one" className="button" onClick={this.handleClick}>1</button>
        <button id="two" className="button" onClick={this.handleClick}>2</button>
        <button id="three" className="button" onClick={this.handleClick}>3</button>
        <button id="add" className="add-button side" onClick={this.handleClick}>+</button>
        <button id="zero" className="zero-button" onClick={this.handleClick}>0</button>
        <button id="decimal" className="button" onClick={this.handleClick}>.</button>
        <button id="equals" className="equal-button side" onClick={this.handleClick}>=</button>
      </div>
          );
  }
}

const mapDispatchToProps = {
  clear,
  inputNumber,
  inputOperator,
  inputDecimal,
  calculate,
};

const mapStateToProps = (state) => {
  return {
    formula: state.calculator.formula,
    answer: state.calculator.answer,
    clearText: state.calculator.clearText,
  };
};

const ConnectedCalculatorButtons = connect(mapStateToProps, mapDispatchToProps)(CalculatorButtons);

class CalculatorDisplay extends React.Component {
  render() {
    return (
      <div className="calculator-display">
        <div id="display-formula">{this.props.formula}</div>
        <div id="display-answer">{this.props.answer}</div>
      </div>
    );
  }
}


const ConnectedCalculatorDisplay = connect(mapStateToProps)(CalculatorDisplay);

class Calculator extends React.Component {
  render() {
    return (
      <div className="calculator">
        <ConnectedCalculatorDisplay />
        <ConnectedCalculatorButtons />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Calculator />
      </div>
    );
  }
}

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;