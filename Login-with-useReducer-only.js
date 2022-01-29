import React, { useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
const formReducerFn = (state,action) => {
  let isEmailValid, isPasswordValid;
  let obj = {
    ...state,
    [action.key] : action.value,
  };
  isEmailValid    = obj.email.includes('@');
  isPasswordValid = obj.password.length > 6;
  obj.isFormValid = (isEmailValid && isPasswordValid) ?  true : false;
  return obj;
}
const Login = (props) => {
  const initialFormState = {
    email       : '',
    password    : '',
    isFormValid : null,
  }
  const [formState, dispatchFormFn] = useReducer(formReducerFn, initialFormState);
  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(formState.email, formState.password);
  };
  const inputChangeHandler = (event) => {
    dispatchFormFn({
      event : event.type,
      key   : event.target.name,
      value : event.target.value,
    })
  }
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} `} >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={`${classes.control} `} >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes.actions} >
          <Button type="submit" className={classes.btn} disabled={!formState.isFormValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
