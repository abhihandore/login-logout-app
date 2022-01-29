import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  /**
   * * As per the requirement, we need to stay logged in , if i.ve already logged to system.
   * * But the problem is , when i checked the condition and based on this condition, changed loggedin state,
   * * react will re-render the components and again check the condition and re-render and follow on the same.
   * * so it will create a infinite loop and will break the page.
   * ! Uncaught Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.
   * 
  console.log(localStorage.getItem('isLogged'));
  if(localStorage.getItem('isLogged') == 1){
    setIsLoggedIn(true);
  }
  */


  /**
   * * As we faced the issue shown above, we have a solution i.e., useEffect Hook of react.
   * * useEffect will run AFTER every component rendered/ evaluated, i.e., code in useEffect will run AFTER component is completely rendered.
   * * When app starts, will be the case when useEffect code will run, because function is running for the very first time and 
   * * another case is, when the dependancies mentioned in the second parameter get changed.
   * * But if we did not given any dependancies i.e., assign an empty array, the useEffect will run only once when the app runs very first time. Because there is no dependancies given, so it will nerver run again. that's simple.
   * * and that is exactly we want in the current situation i.e., only run the code when app is running very first time to check , user is logged in previously or not.
   * 
   * ! NOTE : useEffect will be not responsible for calling the component or rendering the component.
   * ! in the below example, component re-rendered because of "setIsLoggedIn"- state changing function., not because of useEffect hook of react. 
   * 
   * * data fetching is not related to rendering the UI on frontend, its indirectly relate to the fetching, not directly.
   * * Hence useEffect will help us in this. 
   * * useEffect help you to deal with code that should be executed in respons to something.
   * * whenever you have an action that should be executed in response to some other action, that is side effect. and that is where useEffect will help you.!
   * 
   * 
   * ! NOTE : We learned, that you can add "everything" you use in effect function as a dependency i.e., all state variables and functions you use in there.
   * ! But there are exceptions, 
   * ! --- You dont need to add state updating function as - React gurranty that state updating functions never change.(you could though)
   * ! --- You also don't need to add "build-in" API or functions like localStorage ,fetch() etc.
   * ! --- You also don't need to add variables or functions might've defined OUTSIDE of your component. :Such functions or variables also are not created inside of a component function and hence changing them won't affect your components (components won't be re-evaluated if such variables or functions change and vice-versa)
   * 
   * *IN SHORT : You must add all "things" you use in your effect function, if those "things" could change because your component (or some parent component) re-rendered.

 
   */
  useEffect (() => {
    // console.log('c');
    if(localStorage.getItem('isLogged') === '1'){
      setIsLoggedIn(true);
    }

    return () => {
      // console.log('b');
    }
  }, [])
  

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('isLogged', '1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLogged');
  };
  // console.log('a');

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment> 
  );
}

export default App;
