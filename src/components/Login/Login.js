import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
    if(action.type === 'change'){
        return {value: action.value, isValid: action.value.includes('@')}
    }
    if(action.type === 'blur'){
        return {value: state.value, isValid: state.value.includes('@')}
    }
    return {value: '', isValid: false}
}
const passwordReducer = (state, action) => {
    if(action.type === 'change'){
        return {value: action.value, isValid: action.value.length > 6}
    }
    if(action.type === 'blur'){
        return {value: state.value, isValid: state.value.length > 6}
    }
    return {value: '', isValid: false}
}


const Login = (props) => {
    const initInputState = ({
        value: '', 
        isValid : null,
    });
    const [emailState, dispatchEmail] = useReducer(emailReducer, initInputState);
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, initInputState);

    // const [enteredEmail, setEnteredEmail] = useState('');
    // const [isEnteredEmailValid, setIsEnteredEmailValid] = useState();

    // const [enteredPassword, setEnteredPassword] = useState('');
    // const [isEnteredPasswordValid, setIsEnteredPasswordValid] = useState();

    const [isFormvalid, setIsFormvalid] = useState(null);

    // Used Object Destructuring
    const {isvalid: isEmailValid} = emailState;
    const {isvalid: isPasswordValid} = passwordState;

    /**
     * Here the reason behind using useEffect is ,
     * When we are updating the state depending on some other state, it will create a conflict with useState because, we dont know that , the state value on which we are dependent to update state is correct or not OR its an exact state value.
     * useEffect will work here.. Because useEffect will always run after component renders/ re-renders.
     */
    useEffect( () => {
        const identifier = setTimeout( () => {
            setIsFormvalid(isEmailValid && isPasswordValid);
        }, 500);
        return () => {
            clearTimeout(identifier);
        }
    }, [isEmailValid,isPasswordValid]);

    const emailChangeHandler = (e) => {
        dispatchEmail({
            value : e.target.value,
            type  : e.type
        });
        // setEnteredEmail(e.target.value);
        // setIsFormvalid(e.target.value.includes('@') && enteredPassword.length > 6);
        /**
         * This way of updating the state depends on the another state may result in invalid values. 
         * This will work in normal way, but in some cases or complex cases, it will result in invalid state value.
         * so here we can use 'useEffect' function to update the state depending on some another state because , useEffect function will always run after component re-rendered.
         */

    }
    const passwordChangeHandler = (e) => {
        dispatchPassword({
            value: e.target.value,
            type : e.type
        })
        // setEnteredPassword(e.target.value);
        // setIsFormvalid( enteredEmail.includes('@') && e.target.value.length > 6 );
    }
    const validateEmailHandler = (e) => {
        dispatchEmail({
            type  : e.type
        });
        // setIsEnteredEmailValid(emailState.isValid);
    }
    const validatePasswordHandler = (e) => {
        dispatchPassword({
            type : e.type
        })
        // setIsEnteredPasswordValid(enteredPassword.length > 6);
    }
    const submitHandler = (e) => {
        e.preventDefault();
        props.onLogin(emailState.value,passwordState.value);
    }
    return(
        <Card className={classes.login} >
        <form onSubmit={submitHandler}>
            <div
            className={`${classes.control} ${
                emailState.isValid === false ? classes.invalid : ''
            }`}
            >
            <label htmlFor="email">E-Mail</label>
            <input
                type="email"
                id="email"
                name="email"
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler} 
            />
            </div>
            <div
            className={`${classes.control} ${
                passwordState.isValid === false ? classes.invalid : ''
            }`}
            >
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
            />
            </div>
            <div className={classes.actions}>
            <Button type="submit" className={classes.btn} disabled={!isFormvalid}>
                Login
            </Button>
            </div>
        </form>
    </Card>
    )
}

export default Login;