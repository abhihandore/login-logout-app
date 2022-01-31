import React,{useState , useEffect} from 'react';
/**
 * createContext will just create a default context. context here is just your app or component wide STATE.
 * AuthContext although is not a component , but an object that will contain a component.
 */
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogout: () => {}
});

export const AuthContextProvider = (props) => {
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
    return (
        <AuthContext.Provider value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext; // Here we are providing context.



/**
 * Providing will always be the first step.
 * Providing means all the components that should listen to the context will get wrapped together.
 * Not wrapped components will not able to listen.
 */