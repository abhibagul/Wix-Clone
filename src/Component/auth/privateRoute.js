import { Route, Navigate, Outlet } from 'react-router-dom';
import { useUser } from './useUser';

export const PrivateRoute = () => {
    const user = useUser();

    return (user) ? <Outlet /> : <Navigate to="/login" />

}