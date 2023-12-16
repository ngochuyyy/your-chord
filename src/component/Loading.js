import PropTypes from 'prop-types';

const Loading = ({ color = 'primary', text = 'Loading...' }) => (
    <div className={`d-flex justify-content-center align-items-center`} style={{ minHeight: '100vh' }}>
        <div className={`spinner-border text-${color}`} role="status">
            <span className="visually-hidden">{text}</span>
        </div>
    </div>
);

Loading.propTypes = {
    color: PropTypes.string, // Màu sắc của spinner, mặc định là 'primary'
    text: PropTypes.string,  // Văn bản hiển thị, mặc định là 'Loading...'
};

export default Loading;
