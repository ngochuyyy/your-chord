import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchAppBar from '../component/SearchAppBar';
import moment from 'moment';
function EditRequestChordMusician() {
    const [data, setData] = useState({
        song_name: '',
        lyrics: '',
        link: '',
    });
    const [isDataChanged, setIsDataChanged] = useState(false);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/getRequestChord/` + id)
            .then((res) => {
                setData({
                    ...data,
                    song_name: res.data.Result[0].song_name,
                    lyrics: res.data.Result[0].lyrics,
                    link: res.data.Result[0].link,
                    artist_name: res.data.Result[0].artist_name,
                    genre: res.data.Result[0].genre,
                    user_id: res.data.Result[0].user_id,
                    request_date: res.data.Result[0].request_date
                });
                setLoading(false)

            })
            .catch((err) => console.log(err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
        setIsDataChanged(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isDataChanged) {
            axios
                .put(`${apiUrl}/updateRequestChord/` + id, data)
                .then((res) => {
                    if (res.data.Status === 'Success') {
                        navigate(-1);
                    }
                })
                .catch((err) => console.log(err));
        } else {
            alert("Update without changes");
        }
    };
    return (
        <>
            <SearchAppBar />
            <div className="container payment-container" style={{ width: '1200px' }}>

                <div className="py-4 text-center">
                    <h2 style={{ color: '#0d6efd', fontWeight: 'bold' }}>Request chord</h2>
                </div>
                {loading ? (
                    <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '200px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <p className="visually-hidden">Loading...</p>
                        </div>
                    </div>
                ) :
                    <>
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

                                <form className="needs-validation" onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <b htmlFor="title">Song title</b>
                                            <p>{data.song_name}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <b htmlFor="title">Username</b>
                                            <p>{data.user_id}</p>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {/* <div className="input-group">
                                    <textarea
                                        cols="80"
                                        rows="20"
                                        name="lyrics"
                                        onChange={handleInputChange}
                                        value={data.lyric}
                                        style={{ width: '100%' }}
                                    >
                                        {data.lyric}
                                    </textarea>
                                    <div className="invalid-feedback">
                                        Lyric is required.
                                    </div>
                                </div> */}
                                        <div className="col-12">
                                            <b htmlFor="lyric">Lyric</b>

                                            <div className="input-group">
                                                <div className="row">
                                                    <div className="numbers pd-right">
                                                        <textarea
                                                            cols="80"
                                                            rows="20"
                                                            name="lyrics"
                                                            onChange={handleInputChange}
                                                            value={data.lyrics}
                                                            style={{ width: '100%' }}
                                                        >
                                                            {data.lyrics}
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <b htmlFor="artist">Artist</b>
                                            <p>{data.artist_name}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <b htmlFor="duration" className="form-label">Date created:</b>
                                            <p>{moment(data.request_date).format('YYYY-MM-DD  HH:mm:ss')}</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <b htmlFor="cc-genre">Genre</b>
                                            <p>{data.genre}</p>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <b htmlFor="cc-link">Link</b>
                                            <p>{data.link}</p>
                                        </div>
                                    </div>
                                    <hr className="mb-4" />
                                    <div className="d-flex justify-content-between">
                                        <button
                                            type="submit"
                                            className="btn btn-success"
                                        >
                                            Save
                                        </button>
                                        <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                            Close
                                        </button>
                                    </div>



                                </form>

                            </div>
                        </div>
                    </>
                }
            </div>

        </>
    );
}

export default EditRequestChordMusician;
