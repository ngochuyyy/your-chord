import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './authService'; // Adjust the import according to your authService

const PrivateRoute = ({ ...rest }) => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const userId = token ? token.split(':')[0] : null;

    if (!isAuthenticated() || (userId && userId !== rest.userId)) {
        // Redirect to login if not authenticated or userId is different
        navigate('/login');
        return null; // You can return null or any other content if needed
    }

};

export default PrivateRoute;
