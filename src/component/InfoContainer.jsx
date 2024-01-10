

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function InfoContainer() {
    return (
        <>
            <div className="project-info-container" style={{ width: '100%', textAlign: 'center' }}>
                <p className="your-chord-text">
                    <span className="animated-text">Your Chord @2023</span>
                    <br />
                    <Link to="mailto:yourchord@example.com" style={{ textDecoration: 'none' }}>yourchord@example.com</Link> |
                    <p>Hotline: 0918771818</p>
                </p>
            </div>
        </>

    )

}


export default InfoContainer;