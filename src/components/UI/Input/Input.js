import React, {useRef, useImperativeHandle} from 'react';
import classes from './Input.module.css';

/**
 * * Here we want to focus on the first invalid input element. 
 * * But this is not possible with useEffect because it will run after component re-rendered.
 * * We want to focus an Input element on click of submit. So here we are using useRef 
 */


/**
 * * To enable the second parameter , we need to export our content in React.forwardRef
 */
const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();
    const activate = () => {
        inputRef.current.focus();
    }

    /**
     * * It allows us to use this component or functionality inside the component imperatively that means not with the regular state or props management not controlling through the state in the parent component, but directly calling or manipulating something in the component programatically.
     * 
     * *2 parameters = {
     *      -- second parameter is an function which should always return an object and contain all the data you'll be using outside. 
     *      -- First parameter is an ref which we have accected in the component arguments.
     * }  
     * 
     * * With useImperativeHandle and useRef , you can expose functionalities from react component to its parent component to then use your component in parent component through refs and trigger certain functionalities. 
     * 
     * * You should avoid this most of the time. But usecases like this, e.g., focus an input, scrolling etc we can use useImperativeHandle.  
     */
    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    })

    return (
        <div
        className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
        }`}
        >
        <label htmlFor={props.id}>{props.label}</label>
        <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur} 
        />
        </div>
    )
})

export default Input;