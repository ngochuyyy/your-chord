import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const isAuthenticated = () => {
    // Implement your authentication logic here
    const token = sessionStorage.getItem('token');
    return !!token; // Example: Check if the token exists
};

// const RedirectLogin = () => {
//     const navigate = useNavigate();
//     navigate('/login');
//     return null; // This component doesn't render anything
// };

const PrivateRoute = ({ ...rest }) => {
    const token = sessionStorage.getItem('token');
    const userId = token ? token.split(':')[0] : null;
    const navigate = useNavigate();

    if (!isAuthenticated() || (userId && userId !== rest.userId)) {
        // Redirect to login if not authenticated or userId is different
        navigate('/login');
    }

};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    userId: PropTypes.string,
    // Add any other props you are using in 'rest'
};

export default PrivateRoute;
