import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

/**
 * * Breif Understanding of useEffect
 * * From the Below code - as i added few console's in between the code.
 * * We can understand Behaviour of useEffect with console in browser : as follow -
 * ! When we refresh the page i.e., app render very first time 
 * ? Console :: 
 * * 1 - Component Rendered..!
 * * 2 - EFFECT 1 RUNNING
 * * 3 - EFFECT 2 RUNNING
 * * 4 - Checking Validity..!
 * * As state value is not updated/ changed, hence component not rendered again.
 * 
 * ! When i entered an word into the input
 * ? Console :: 
 * * 1 - Component Rendered..!
 * * 2 - Clean Up Called
 * * 3 - EFFECT 1 RUNNING
 * * 4 - EFFECT 2 RUNNING
 * * 5 - Checking Validity..!
 * * ? - Component Rendered..!
 */


const Login = (props) => {
  const [enteredEmail,    setEnteredEmail]    = useState('');
  const [emailIsValid,    setEmailIsValid]    = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid,     setFormIsValid]     = useState(false);

  /**
   * * This useEffect will run on every rendering of the component ,as we've not added second parameter to the useEffect.
   */
  useEffect( () => {
    console.log("EFFECT 1 RUNNING");
  });

  useEffect( () => {
    const identifier = setTimeout( () => {
      console.log("EFFECT 2 RUNNING");
      console.log('Checking Validity..!');
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
      console.log('validated..!')
    }, 500);

    /**
     * * It's an clean up function.
     * * It will never run when component render at very first time.
     * * If any of the dependancies changed, clean up function will run first then only, useEffect code will go for run.
     * * on every re-rendering of component, clean up function will get run first and then useEffect code.
     */
    return () => { // Clean up function.
      console.log('Clean Up Called');
      clearTimeout(identifier);
    }
  }, [enteredEmail, enteredPassword]);
  /**
   * * After component re-rendered, if certain dependancy changed, then useEffect will run again. i.e.,
   * * in the abve example, on the very first time, useEffect code will run . after that, on user enter emailid/password, emailChangeHandler function call the setEnteredEmail state updating function, so component re-renders. 
   * * AFTER RE_RENDERED, IF any of the given dependancy changed, then useEffect will run again.
   * * --React re-renders as states change.
   */

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    /*
    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6
    ); 
    */
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    /*
    setFormIsValid(
      event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
    */
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  console.log('Component Rendered..!');

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler} 
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
