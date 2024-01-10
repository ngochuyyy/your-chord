

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function InfoContainer() {
    return (
        <>
            <div className="project-info-container" style={{ width: '100%', textAlign: 'center' }}>
                <p className="your-chord-text">
                    <span className="animated-text">Your Chord @2023</span>
                    <br />
                    <Link to="/introduction" style={{ textDecoration: 'none' }}> Introduction</Link> |
                    <Link to="/bug-report" style={{ textDecoration: 'none' }}> Report a Bug - Give Feedback</Link> |
                    <Link to="/terms" style={{ textDecoration: 'none' }}> Terms of Service</Link> |
                    <Link to="/copyright" style={{ textDecoration: 'none' }}> Copyright Policy</Link> |
                    <Link to="/guide" style={{ textDecoration: 'none' }}> How to Guide</Link>
                </p>
            </div>
        </>

    )

}


export default InfoContainer;