// import React, { useEffect, useState } from 'react';
import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context.js';

const App = () => {
  /** [ref 1]
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('LOGGED_IN') === '1'){
      setIsLoggedIn(true);
    }
  },[]);
  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    setIsLoggedIn(true);
    localStorage.setItem('LOGGED_IN','1');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('LOGGED_IN');
  };
   
  */
  const ctx = useContext(AuthContext);
  return (
    /** 
     * As We should use component in JSX, 
     * But AuthContext is not an component. But as learned before, AuthContext is an object that contain an Component i.e., Provider.
     * So here we'll be able to call it with <AuthContext.Provider>
     * 
     * So, now all the decendents of AuthContext i.e., all the childrens and childrens of childrens can listen to the context.
     * * Here, we have given default value for context, but it will only be used when we are consuming the context without Provider.
     * * i.e., AuthContext contained by default {isLoggedIn: false} in auth-context.js , But it will only be used when we are consuming the context in inner child compnents without a provider.
     * * technically , we do not need a AuthContext.Provider here when we have an default value in auth-context.js file.
     * * But in reality, we will use Context to have a value that can be changed and that is possible only with the Provider.
     */

      /* [ref 1]
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler}}>
        <MainHeader/>
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
      */

    <React.Fragment>
      <MainHeader/>
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
