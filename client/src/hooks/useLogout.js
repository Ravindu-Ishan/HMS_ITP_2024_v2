import React from 'react'
import { useStaffAuthContext } from './useStaffAuthContext'

const useLogout = () => {

    const { dispatch } = useStaffAuthContext();

    const logout = () => {

        //remove user from storage
        localStorage.removeItem('user');
        //remove pathing information
        localStorage.removeItem('lastPath');

        //dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}

export default useLogout