import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { addSnackbarData } from '../reduxtoolkit/slices/SnakbarMessageSlice';

const PrivateRoutes = () => {
    const { token } = useSelector((state) => state.LoginUser);
    const dispatch = useDispatch();

    const handleNavigateToLogin = () => {
        dispatch(addSnackbarData({ message: 'Please login First', variant: 'error' }));
        return <Navigate to="/login" />;
    };

    return (
        token ? <Outlet /> : handleNavigateToLogin()
    );
};

export default PrivateRoutes;