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
 * 
 */