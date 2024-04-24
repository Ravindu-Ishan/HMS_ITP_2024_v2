import { useState } from "react";
import { useStaffAuthContext } from "./useStaffAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useStaffAuthContext();

    const login = (username, password) => {

        setIsLoading(true);
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
                    setIsLoading(false);
                }
                else {
                    //save the user to local storage
                    localStorage.setItem('user', JSON.stringify(response))

                    //update auth context
                    dispatch({ type: 'LOGIN', payload: response })

                    //test - print token info on console
                    //console.log(jwtDecode(JSON.stringify(response)));
                    setIsLoading(false);
                }

            }).catch((error) => {
                alert('An error occured')
                console.log(error);
                setIsLoading(false);
            });
    }

    return { login, error, isLoading }

}
