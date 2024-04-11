import { createContext, useReducer } from "react";


export const StaffAuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}


export const StaffAuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })


    console.log('StaffContext state: ', state);

    return (
        <StaffAuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </StaffAuthContext.Provider>
    )
}