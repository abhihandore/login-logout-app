/**
 * * useReducer() for state management
 * - useful for more complex states
 * - useful when multiple states are related.
 * - Sometime, you have more complex state - for example if it got multiple states, multiple way of changing it, useState then often become hard or error-prone to use - 
 * * its an replacement for useState() when you need a "more powerful state management".
 * * its also useful when you have state update depends on some other state or state update.
 *   For eg., 
 *   setFormIsValid(
        event.target.value.trim().length > 6 && enteredEmail.includes('@')
    );
 *  
    Here, i'm updating the FormIsValid state [setFormIsValid] ,depending on the some other state or state update.
    with the useState, our state updating function will update the state depends on the previous value of the same state.
    But here the scenario is different, we are updating the state depending on the other state. It works fine but in some cases, depending on how react schedule the state update, it may fail to give latest state value.

    Hence Here useReducer came into the picture.

 * * React Context 
 * * Component-wide, "Behind-the-scene" State Management.
 * ! Limitations of the useContext : 
 * - React context is NOT Optimized for high frequency changes..! 
 * For e.g, if you have a state changes every second or multiple time per second.
 * - React also should not be used to replace ALL component communications and props.
 * 
 * * Rules of the Hooks : 
 * * We should call react hooks in React Function - i.e., React component function and Custom hooks.
 * * We should only call hooks at the TOP Level-{
 *    ! Dont call them in a nested functions.
 *    ! Dont call them in any block statement like if else etc.
 *  * Extra unofficial rule for useEffect -> ALWAYS add everything you refer to inside of useEffect() as a dependency. 
 * * }
 * 
 * * useRef() 
 * 
 * * ref attribute should not be assign to the react component.
 */