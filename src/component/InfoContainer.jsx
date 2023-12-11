

import 'bootstrap/dist/css/bootstrap.min.css';


function InfoContainer() {
    return (
        <>
            <div className="project-info-container" style={{ width: '100%', textAlign: 'center' }}>
                <p style={{ padding: '10px', fontSize: '12px' }}>
                    Your Chord @2023
                    <br />
                    <a to="/introduction" style={{ textDecoration: 'none' }}> Introduction</a> |
                    <a to="/bug-report" style={{ textDecoration: 'none' }}> Report a Bug - Give Feedback</a> |
                    <a to="/terms" style={{ textDecoration: 'none' }}> Terms of Service</a> |
                    <a to="/copyright" style={{ textDecoration: 'none' }}> Copyright Policy</a> |
                    <a to="/guide" style={{ textDecoration: 'none' }}> How to Guide</a>
                </p>
            </div>
        </>

    )

}


export default InfoContainer;