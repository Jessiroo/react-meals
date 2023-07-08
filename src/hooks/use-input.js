import { useState } from 'react';


const useInput = (validationFunction) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationFunction(enteredValue);
  const hasError = !valueIsValid && isTouched;


  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  }; 

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetInput = () => {
    setEnteredValue('');
    setIsTouched(false);
  };


  return {
    enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useInput;