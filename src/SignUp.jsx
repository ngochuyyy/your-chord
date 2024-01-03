import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBarLogin from './component/AppBarLogin';
function SignUp() {
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        address: '',
        role: 'user',
    });
    const [loading, setLoading] = useState(false);
    const [isAccountExisted, setIsAccountExisted] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleSignUp = (event) => {
        setLoading(true);
        event.preventDefault();
        if (values.password !== values.confirmPassword) {
            setPasswordMismatch(true);
            setLoading(false);
            setTimeout(() => {
                setPasswordMismatch(false);
            }, 2000);
            return;
        }
        if (!values.isEmailValid) {
            setLoading(false);
            return;
        }

        axios.post(`${apiUrl}/signUp`, values)
            .then(res => {
                if (res.data.Status === 'Success') {
                    setLoading(false);
                    navigate("/login");
                } else {
                    setIsAccountExisted(true);
                    setLoading(false);
                    setTimeout(() => {
                        setIsAccountExisted(false);
                    }, 2000);

                }
            });
    }
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setValues({ ...values, email, isEmailValid: isEmailValid(email) });
    };
    return (
        <>
            <AppBarLogin />
            <div className="body-login">
                <div className="container-login">
                    <div className="form-container sign-in">
                        <form onSubmit={handleSignUp}>
                            <h1>Create Account</h1>
                            {isAccountExisted && (
                                <Stack sx={{ width: '100%' }} spacing={2} >
                                    <Alert severity="warning">Username already exists, please try again !</Alert>
                                </Stack>
                            )}
                            {passwordMismatch && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">Password and confirm password do not match. Please check again.</Alert>
                                </Stack>
                            )}
                            {values.email && !values.isEmailValid && (
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert severity="error">Invalid email format. Please enter a valid email address.</Alert>
                                </Stack>
                            )}
                            <input type="text" placeholder="Enter your name" onChange={e => setValues({ ...values, name: e.target.value })} required />
                            <input type="text" placeholder="Username" onChange={e => setValues({ ...values, username: e.target.value })} required />
                            <input type="password" placeholder="Password" onChange={e => setValues({ ...values, password: e.target.value })} required />
                            <input type="password" placeholder="Confirm Password" onChange={e => setValues({ ...values, confirmPassword: e.target.value })} required />
                            <input type="text" placeholder="Enter your email" onChange={handleEmailChange} required />
                            <input type="text" placeholder="Enter your address" onChange={e => setValues({ ...values, address: e.target.value })} required />
                            {loading ? (
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) :
                                <button>Sign Up</button>
                            }
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className="toggle-panel toggle-right">
                                <h1>Welcome Back!</h1>
                                <p>Enter your personal details to use all of site features</p>
                                <button className="hidden" id="login" onClick={() => navigate("/login")}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;
