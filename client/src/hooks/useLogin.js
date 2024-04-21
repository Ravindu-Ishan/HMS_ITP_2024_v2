import { useState } from "react";
import { useStaffAuthContext } from "./useStaffAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {

    const [error, setError] = useState(null);

    const { dispatch } = useStaffAuthContext();

    const login = (username, password) => {

        setError(null);

        const data = {
            username,
            password,
        }
        axios
            .post('/login', data)
            .then((response) => {

                if (response.data.message) {
                    setError(response.data.message);
                }
                else {
                    //save the user to local storage
                    localStorage.setItem('user', JSON.stringify(response))

                    //update auth context
                    dispatch({ type: 'LOGIN', payload: response })

                    //test - print token info on console
                    //console.log(jwtDecode(JSON.stringify(response)));

                }

            }).catch((error) => {
                alert('An error occured')
                console.log(error);
            });
    }

    return { login, error }

}
