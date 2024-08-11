import { createStore, combineReducers } from 'redux';

// Actions
const CLEAR = 'CLEAR';
const INPUT_NUMBER = 'INPUT_NUMBER';
const INPUT_OPERATOR = 'INPUT_OPERATOR';
const INPUT_DECIMAL = 'INPUT_DECIMAL';
const CALCULATE = 'CALCULATE';


// To load on codepen.io remove the export keyword and keep the declared consts and read the bottom of the file

export const clear = () => ({
  type: CLEAR,
});

export const inputNumber = (number) => ({
  type: INPUT_NUMBER,
  payload: number,
});

export const inputOperator = (operator) => ({
  type: INPUT_OPERATOR,
  payload: operator,
});

export const inputDecimal = () => ({
  type: INPUT_DECIMAL,
});

export const calculate = () => ({
  type: CALCULATE,
});



// Reducer
const initialState = {
  formula: '',
  mutableFormula: '',
  answer: '',
  clearText: 'AC',
  // Memory
  prevButton: '',
  prevOperator: '',
  prevNumber: '',
  prevAnswer: 'Bug',
};

const calculatorReducer = (state = initialState, action) => {
  const operators = ['+', '-', '*', '/'];
  switch (action.type) {
    case CLEAR:
      if (operators.includes(state.formula[state.formula.length - 1]) ) {
        return {
          ...state,
          formula: state.formula.slice(0, -1),
          mutableFormula: state.formula.slice(0, -1),
          prevOperator: '',
          answer: state.prevAnswer,
        }
      } else {
        return {
          ...state,
          formula: '',
          answer: '',
          mutableFormula: '',
          prevButton: '',
        };
      }
      
    case INPUT_NUMBER:
      const firstNumber = state.answer[0];
      if (firstNumber === '0' && state.formula.length === 1) {
        return {
          ...state,
          formula: action.payload,
          answer: action.payload,
          prevAnswer: action.payload,
          mutableFormula: action.payload,
          prevButton: action.payload,
        };
      } else if (firstNumber === '0' && state.formula.length !== 1) {
        return {
          ...state,
          formula: state.formula.slice(0, -1) + action.payload,
          answer: action.payload,
          prevAnswer: action.payload,
          mutableFormula: action.payload,
          prevButton: action.payload,
        }
      } else {
        return {
          ...state,
          formula: state.formula + action.payload,
          answer: state.mutableFormula + action.payload,
          prevAnswer: state.mutableFormula + action.payload,
          mutableFormula: state.mutableFormula + action.payload,
          prevButton: action.payload,
        };
      }
    case INPUT_OPERATOR:
      if (operators.includes(state.formula[state.formula.length - 1])) {
        return {
          ...state,
          formula: state.formula.slice(0, -1) + action.payload,
          answer: action.payload,
          mutableFormula: '',
          prevButton: action.payload,
        };
      } else if (state.formula === '' && action.payload === '-') {
        return {
          ...state,
          formula: action.payload,
          answer: action.payload,
          mutableFormula: action.payload,
          prevButton: action.payload,
        };
      } else if (state.formula !== '' && !operators.includes(state.formula[state.formula.length - 1])) {
        return {
          ...state,
          formula: state.formula + action.payload,
          answer: action.payload,
          mutableFormula: '',
          prevButton: action.payload,
        };
      } 
      return state;
    case INPUT_DECIMAL:
      if (state.formula === '') {
        return {
          ...state,
          formula: '0.',
          answer: '0.',
          mutableFormula: '0.',
          prevButton: action.payload,
        };
      } else if (!state.formula.includes('.')) {
        return {
          ...state,
          formula: state.formula + '.',
          answer: state.answer + '.',
          mutableFormula: state.mutableFormula + '.',
          prevButton: action.payload,
        };
      }
      return state;
    case CALCULATE:
      try {
        // eslint-disable-next-line no-eval
        const answer = eval(state.formula);
        if (state.answer === state.formula) {
          return {
            ...state,
            // eslint-disable-next-line no-eval
            formula: eval(state.answer + '*' + state.answer),
            prevButton: action.payload,
            // eslint-disable-next-line no-eval
            mutableFormula: eval(state.answer + '*' + state.answer),
            // eslint-disable-next-line no-eval
            answer: eval(state.answer + '*' + state.answer),
          };
        } else if (toString(state.answer) === state.formula[state.formula.length - 1]) {
          return {
            ...state,
            // eslint-disable-next-line no-eval
            formula: eval(state.answer + '*' + state.answer),
            prevButton: action.payload,
            // eslint-disable-next-line no-eval
            mutableFormula: eval(state.answer + '*' + state.answer),
            // eslint-disable-next-line no-eval
            answer: eval(state.answer + '*' + state.answer),
          };
          } else {
          return {
            ...state,
            answer: answer.toString(),
            mutableFormula: '',
          };
        }
      } catch (error) {
        return state;
      }
    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({
  calculator: calculatorReducer,
});

const store = createStore(rootReducer);

export { store };

//codepen.io dependencies

// const { useState, useEffect } = React;
// const { Provider, connect } = ReactRedux;
// const { createStore, combineReducers } = Redux;

// add the code from App.js
// add the code from Index.js

// Activate Babel preprocessor in Codepen settings
// Add the following external scripts in the JS settings:
// https://unpkg.com/react@17/umd/react.development.js
// https://unpkg.com/react-dom@17/umd/react-dom.development.js
// https://cdnjs.cloudflare.com/ajax/libs/redux/5.0.1/redux.legacy-esm.js
// https://cdnjs.cloudflare.com/ajax/libs/redux/4.1.2/redux.min.js
// https://cdnjs.cloudflare.com/ajax/libs/react-redux/7.2.6/react-redux.min.js