import { useState, useEffect } from 'react';

export const useToken = () => {
    const [token, setTokenInternal] = useState(() => {
        return localStorage.getItem('token');
    })


    useEffect(() => {
    }, [token])

    const setToken = newToken => {
        localStorage.setItem('token', newToken);

        setTokenInternal(newToken);

    }

    return [token, setToken]

}