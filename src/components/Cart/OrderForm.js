import classes from './OrderForm.module.css';
import useInput from '../../hooks/use-input';


const OrderForm = (props) => {
  const {
    enteredValue: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetInput: resetFirstName,
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetInput: resetLastName,
  } = useInput(value => value.trim() !== '');

  const {
    enteredValue: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetInput: resetEmailAddress,
  } = useInput(value => value.includes('@'));

  const {
    enteredValue: cardNumberValue,
    isValid: cardIsValid,
    hasError: cardHasError,
    valueChangeHandler: cardChangeHandler,
    inputBlurHandler: cardBlurHandler,
    resetInput: resetCardNumber,
  } = useInput(value => value.trim().length === 16);


  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && cardIsValid) {
    formIsValid = true;
  }; 


  const firstNameInputClasses = firstNameHasError ? classes.invalidInput : classes.validInput;
  const lastNameInputClasses = lastNameHasError ? classes.invalidInput : classes.validInput;
  const emailInputClasses = emailHasError ? classes.invalidInput : classes.validInput;
  const cardInputClasses = cardHasError ? classes.invalidInput : classes.validInput;  


  const placeOrderHandler = (event) => {
    event.preventDefault();
    const customerData = {firstNameValue, lastNameValue, emailValue, cardNumberValue};

    props.onPlaceOrder(customerData);

    resetFirstName();
    resetLastName();
    resetEmailAddress();
    resetCardNumber();
  }


  if (!props.showOrderForm) {
    return;
  }

  return (
    <section className={classes.input}>
      <form>
        <div className={firstNameInputClasses}>
          <label>First Name:</label>
          <input 
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameHasError && <p>Please enter a valid first name.</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label>Last Name:</label>
          <input 
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && <p>Please enter a valid last name.</p>}
        </div>
        <div className={emailInputClasses}>
          <label>Email Address:</label>
          <input 
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type="email"
          />
          {emailHasError && <p>Please enter a valid email address.</p>}
        </div>
        <div className={cardInputClasses}>
          <label>Card Number:</label>
          <input 
            value={cardNumberValue}
            onChange={cardChangeHandler}
            onBlur={cardBlurHandler}
            type="number"
          />
          {cardHasError && <p>Please enter a valid credit or debit card number.</p>}
          <p className={classes.notice}>*Please note this is for demonstration purposes only, please do not enter a real card number.</p>
        </div>
        <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          onClick={props.onCancel}
        >Cancel</button>
        {formIsValid && <button
          type="submit"
          className={classes.button}
          onClick={placeOrderHandler}
        >Place Order</button>}
        </div>
      </form>
    </section>
  )
};

export default OrderForm;