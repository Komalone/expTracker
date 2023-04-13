import React, {useState} from "react";

const AuthContext=React.createContext({
    token:'',
    isLoggedIn: false,
    login: (token)=>{},
    logout: ()=>{},
    email: ""
});

export const AuthContextProvider=(props)=>{
    const [userEmail, setEmail]= useState(localStorage.getItem('email'));

    const initialToken= localStorage.getItem('token');
    const [token,setToken]=useState(initialToken);

    const userIsLoggedIn= !!token; 

    const logoutHandler=()=>{
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }
    const loginHandler=(token, userEmail)=>{
        //console.log(token, userEmail);
        localStorage.setItem('token', token);
        localStorage.setItem('email', userEmail);
        setToken(token);
        setEmail(userEmail);
    }
    const ContextValue={
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        email: userEmail,
    }
    return (
        <AuthContext.Provider value={ContextValue}>
           {props.children}
           </AuthContext.Provider>
       );
}

export default AuthContext;