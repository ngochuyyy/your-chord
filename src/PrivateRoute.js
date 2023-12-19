import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './authService'; // Adjust the import according to your authService

const PrivateRoute = ({ ...rest }) => {
    const token = sessionStorage.getItem('token');
    const userId = token ? token.split(':')[0] : null;

    if (!isAuthenticated() || (userId && userId !== rest.userId)) {
        // Redirect to login if not authenticated or userId is different
        return <Navigate to="/login" />;
    }


};

export default PrivateRoute;
