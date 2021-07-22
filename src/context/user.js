import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const [user, setUser] = useState({email: localStorage.getItem('email'), displayName: localStorage.getItem('displayName'), photoURL: localStorage.getItem('photoURL')});

    return (
        <UserContext.Provider value={{user: [user, setUser]}}>
            { props.children }
        </UserContext.Provider>
    );
}