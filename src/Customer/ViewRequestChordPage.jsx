import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchAppBar from '../component/SearchAppBar';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import moment from 'moment';
function ViewRequestChordPage() {
    const [requestData, setRequestData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);

        axios.get(`${apiUrl}/getRequestChord/${id}`)
            .then(res => {
                if (res.data.Status === "Success") {
                    setRequestData(res.data.Result);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [apiUrl, id]);

    const handleClose = () => {
        navigate(`/requestChordStatus/${userId}`)
    };




    const handleLyricChange = (event, index) => {
        const updatedOrderData = [...requestData];
        updatedOrderData[index].lyric = event.target.value;
        setRequestData(updatedOrderData);
    };



    return (
        <>
            <SearchAppBar />
            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            )
                :

                <div className="container payment-container" style={{ width: '1200px' }}>

                    <div className="py-4 text-center">
                        <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Your request</h2>
                    </div>
                    <div className="row">
                        <div className="col-md-4 order-md-2 mb-4" style={{ backgroundColor: "#EFFBEF", height: 'fit-content', width: '350px', padding: '10px' }}>
                            <h5 className="text-center mb-3">
                                <span>Notes</span>
                            </h5>
                            <ul className="list-group mb-3">
                                <div className='notes' style={{ marginLeft: '50px' }}>
                                    <li>Write the full name of the song</li>
                                    <li>Type in English or Vietnamese with accents</li>
                                    <li>Enter full lyricc</li>
                                    <li>Do not post songs with reactionary or sensitive content that violate Vietnamese customs and traditions.</li>
                                </div>
                            </ul>
                        </div>
                        <div className="col-md-8 order-md-1">
                            {requestData.map((request, index) => (
                                <div key={index}>
                                    <form className="needs-validation" noValidate>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="title">Song title</b>
                                                <p>{request.song_name}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-link">Musician</b>
                                                <p>{request.musician_id === null ? "None" : request.musician_id}</p>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <b htmlFor="lyric">Lyric</b>
                                            <div className="input-group">
                                                <textarea
                                                    id="lyric"
                                                    rows={15}
                                                    cols={200}
                                                    value={request.lyrics}
                                                    onChange={(e) => handleLyricChange(e, index)}
                                                    style={{ borderRadius: '10px' }}
                                                    required
                                                    readOnly

                                                />
                                                <div className="invalid-feedback">
                                                    Lyric is required.
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="artist">Artist</b>
                                                <p>{request.artist_name}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="duration" className="form-label">Date created:</b>
                                                <p>{moment(request.request_date).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-genre">Genre</b>
                                                <p>{request.genre}</p>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <b htmlFor="cc-link">Link</b>
                                                <p>{request.link}</p>
                                            </div>
                                        </div>
                                        <hr className="mb-4" />
                                        <div className="d-flex justify-content-between">
                                            <button className="btn btn-primary" onClick={handleClose}>
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ViewRequestChordPage;
