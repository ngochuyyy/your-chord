

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function InfoContainer() {
    return (
        <>
            {/* <div className="project-info-container" style={{ width: '100%', textAlign: 'center' }}>
                <p className="your-chord-text">
                    <span className="animated-text">Your Chord @2023</span>
                    <br />
                    <Link to="/introduction" style={{ textDecoration: 'none' }}> Introduction</Link> |
                    <Link to="/terms" style={{ textDecoration: 'none' }}> Terms of Service</Link> |
                    <Link to="/copyright" style={{ textDecoration: 'none' }}> Copyright Policy</Link> |
                    <Link to="/guide" style={{ textDecoration: 'none' }}> How to Guide</Link>
                </p>
            </div> */}
            <div className="project-info-container" style={{ width: '100%', textAlign: 'center' }}>
                <p className="your-chord-text">
                    <span className="animated-text">YourChords @2023</span>
                    <br />
                    <div className="animated-text">
                        <span>Email to us:</span><Link to="mailto:diepngochuy3@gmail.com" style={{ textDecoration: 'none' }}>diepngochuy3@gmail.com</Link> |
                        <span style={{ textDecoration: 'none' }}> Hotline: 0918771818</span>
                    </div>
                </p>
            </div>
        </>

    )

}


export default InfoContainer;