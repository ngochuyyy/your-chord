import axios from 'axios';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ModalPlaylist from '@mui/material/Modal';
import { useParams, useNavigate, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import SearchAppBarBackMusican from '../component/SearchAppBarBackMusician';
import InfoContainer from '../component/InfoContainer';
import { Button } from '@mui/material';
import { message, Modal } from 'antd';

function SongBeatManagerPage() {
    const [data, setData] = useState([]);
    const [allSongs, setAllSongs] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [order, setOrder] = useState('asc');
    const [modalOpen, setModalOpen] = useState(false);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const { beat_type } = useParams();
    const [beatGenres, setBeatGenres] = useState([]);
    const [beatSongCounts, setBeatSongCounts] = useState({});
    const [majorChordsData, setDataMajorChords] = useState([]);
    const [minorChordsData, setDataMinorChords] = useState([]);
    const [c7ChordsData, setDataC7Chords] = useState([]);
    const [cm7ChordsData, setDataCm7Chords] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        overflowY: 'auto',
        height: '700px',
        width: '1200px',
        borderRadius: '30px'
    };
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [isSongListOpen, setIsSongListOpen] = useState(false);


    useEffect(() => {
        axios.get(`${apiUrl}/getSongAdmin`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    setAllSongs(res.data.Result);
                } else {
                    alert("Error");
                }
            })
            .catch((err) => console.log(err))
    }, []);
    const handleMenuOpen = (event, songId) => {
        setAnchorEl(event.currentTarget);
        setSelectedSongId(songId);

    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedSongId(null);
    };
    const handleSongListToggle = () => {
        setIsSongListOpen((prev) => !prev);
    };
    useEffect(() => {
        axios.get(`${apiUrl}/getSongBeat/` + beat_type)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                } else {
                    alert('Error fetching songs.');
                }
            })
            .catch((err) => console.log(err));
    }, []);
    const beatGenresData = [
        { beat_id: 'Ballad', beat_name: 'Ballad' },
        { beat_id: 'BluesTune', beat_name: 'Blues Tune' },
        { beat_id: 'DiscoTune', beat_name: 'Disco Tune' },
        { beat_id: 'SlowTune', beat_name: 'Slow Tune' },
        { beat_id: 'BolleroTune', beat_name: 'Bollero Tune' },
        { beat_id: 'FoxTune', beat_name: 'Fox Tune' },
        { beat_id: 'ValseTune', beat_name: 'Valse Tune' },
        { beat_id: 'TangoTune', beat_name: 'Tango Tune' },
        { beat_id: 'PopTune', beat_name: 'Pop Tune' },
        { beat_id: 'BostonTune', beat_name: 'Boston Tune' },
        { beat_id: 'Waltz', beat_name: 'Waltz' },
        { beat_id: 'Chachachadance', beat_name: 'Chachacha Dance' },
        { beat_id: 'RockTune', beat_name: 'Rock Tune' },
        { beat_id: 'Dhumbadance', beat_name: 'Dhumba Dance' },
        { beat_id: 'BossaNova', beat_name: 'Bossa Nova' },
    ];

    const fetchData = async () => {
        try {
            const countRequests = beatGenresData.map((beat) =>
                axios.get(`${apiUrl}/countSongBeat/${beat.beat_id}`)
            );

            const countResponses = await Promise.all(countRequests);

            const updatedGenres = beatGenresData.map((beat, index) => ({
                ...beat,
                song_count: countResponses[index].data.songCount,
            }));

            const songCountsMap = {};
            updatedGenres.forEach((beat) => {
                songCountsMap[beat.beat_id] = beat.song_count;
            });

            setBeatGenres(updatedGenres);
            setBeatSongCounts(songCountsMap);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleSort = (field) => {
        setOrderBy(field);
        setOrder(order === 'asc');
    };
    const handleAddSongToBeatType = async (songId) => {
        try {
            const response = await axios.put(`${apiUrl}/addSongToBeatType/${songId}/${beat_type}`);
            if (response.data.Status === 'Success') {
                message.success('Add song successfully');

                fetchData();
                window.location.reload(true);
            } else {
                message.error('Failed to adding song to beat type.');
            }
        } catch (error) {
            console.error(error);
            alert('Error adding song to beat type.');
        } finally {
            handleMenuClose();
        }
    };


    function sortData(data) {
        return data.slice().sort((a, b) => {
            if (orderBy === 'created_at') {
                return order === 'asc'
                    ? a.created_at.localeCompare(b.created_at)
                    : b.created_at.localeCompare(a.created_at);
            } else if (orderBy === 'updated_at' && a.updated_at && b.updated_at) {
                return order === 'asc'
                    ? a.updated_at.localeCompare(b.updated_at)
                    : b.updated_at.localeCompare(a.updated_at);
            }
        });
    }
    const extractChords = (lyrics) => {
        const chordRegex = /\[(?<chord>[\w#]+)\]/g;
        const uniqueChords = new Set();
        let match;
        while ((match = chordRegex.exec(lyrics)) !== null) {
            uniqueChords.add(match[1]);
        }
        return Array.from(uniqueChords);
    };
    const handleDeleteSongBeat = (songId) => async () => {
        try {
            const response = await axios.delete(`${apiUrl}/deleteSongBeat/${songId}/${beat_type}`);
            if (response.data.Status === 'Success') {
                fetchData();
                window.location.reload(true);

            } else {
                alert('Error deleting song.');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting song.');
        } finally {
            handleMenuClose();
        }
    };
    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/getChord`)
            .then(res => {
                if (res.data.Status === "Success") {
                    const chordData = res.data.Result.map(chord => ({
                        name: chord.chord_name,
                        image: chord.image,
                        type: chord.type_id,
                    }));
                    const majorChordsData = {};
                    const minorChordsData = {};
                    const c7ChordsData = {};
                    const cm7ChordsData = {};

                    chordData.forEach(chord => {
                        if (chord.type === 0) {
                            majorChordsData[chord.name] = chord;
                        }
                        if (chord.type === 1) {
                            minorChordsData[chord.name] = chord;
                        }
                        if (chord.type === 2) {
                            c7ChordsData[chord.name] = chord;
                        }
                        if (chord.type === 3) {
                            cm7ChordsData[chord.name] = chord;
                        }
                    });
                    setDataMajorChords(majorChordsData);
                    setDataMinorChords(minorChordsData);
                    setDataC7Chords(c7ChordsData);
                    setDataCm7Chords(cm7ChordsData);
                    setLoading(false);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])
    const chordData = { ...majorChordsData, ...minorChordsData, ...c7ChordsData, ...cm7ChordsData };
    return (
        <>
            <SearchAppBarBackMusican />


            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p>Loading...</p>
                </div>
            )
                :
                <>
                    <div className="sort-button-container">
                        <button
                            className={`sort-button ${orderBy === 'created_at' ? 'active' : ''}`}
                            onClick={() => handleSort('created_at')}
                        >
                            New
                        </button>
                        <button
                            className={`sort-button ${orderBy === 'updated_at' ? 'active' : ''}`}
                            onClick={() => handleSort('updated_at')}
                        >
                            Updated
                        </button>
                    </div>
                    <div className="d-flex">
                        <div className="col-md-8" >
                            <div style={{ margin: '10px', marginTop: '80px', marginLeft: '50px', fontWeight: 'bold', fontSize: '20px' }}>List of {`${beat_type.charAt(0).toUpperCase()}${beat_type.slice(1)}`} songs:</div>
                            {data.length === 0 ? (
                                <div style={{
                                    margin: '10px', marginTop: '80px', textAlign: 'center'
                                }}>
                                    <p style={{ fontWeight: 'bold' }}>No results found</p>
                                </div>
                            )
                                :
                                (
                                    <div style={{
                                        borderRadius: '10px', border: '1px solid #ccc', margin: '10px', marginTop: '10px', marginLeft: '50px'
                                    }}>

                                        {
                                            sortData(currentItems).map((song, index) => {
                                                const songChords = extractChords(song.lyrics);
                                                const uniqueChordsSet = new Set(songChords);
                                                return (

                                                    <div key={index} style={{ borderBottom: '1px solid #ccc', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                                                        <div style={{ padding: '10px', paddingLeft: '10px', color: 'black' }}>

                                                            <div style={{ position: 'relative' }} >
                                                                <IconButton
                                                                    size="large"
                                                                    aria-label="menu"
                                                                    aria-haspopup="true"
                                                                    onClick={(event) => handleMenuOpen(event, song.id)}
                                                                    style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                                                                >
                                                                    <i className="bi-three-dots-vertical text-primary fs-4"></i>
                                                                </IconButton>
                                                                <Menu
                                                                    anchorEl={anchorEl}
                                                                    open={selectedSongId === song.id && Boolean(anchorEl)}
                                                                    onClose={handleMenuClose}
                                                                >
                                                                    <MenuItem >
                                                                        <h6 className="text-danger" onClick={handleDeleteSongBeat(song.id)}>
                                                                            <i className="bi bi-trash"></i> Delete
                                                                        </h6>
                                                                    </MenuItem>
                                                                </Menu>

                                                            </div>

                                                            <Link to={`/viewSongMusician/` + song.id} key={index} className="song-card-list" style={{ color: 'black', textDecoration: 'none', cursor: 'pointer' }}>
                                                                <div className='column'>
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <span style={{ fontSize: '20px', marginRight: '10px' }}>{song.song_title}</span>
                                                                        <div style={{ display: 'flex', textAlign: 'center' }}>
                                                                            {songChords.slice(0, 12).map((chord, chordIndex) => (
                                                                                <div
                                                                                    key={chordIndex}
                                                                                    style={{
                                                                                        padding: '5px',
                                                                                        marginRight: '15px',
                                                                                        marginBottom: '5px',
                                                                                        background: '#eee',
                                                                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                                                        borderRadius: '5px'
                                                                                    }}
                                                                                >
                                                                                    {chord}
                                                                                </div>
                                                                            ))}
                                                                            {songChords.length > 12 ? "..." : ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <span style={{ color: 'gray', fontStyle: 'italic' }}>{song.lyrics.substring(0, 100)}...</span>
                                                                <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                                                    {Array.from(uniqueChordsSet).slice(0, 6).map((chordName, index) => (
                                                                        <div key={index} className="chord-box" style={{ position: 'relative', textAlign: 'center', margin: '10px' }}>
                                                                            <p style={{ marginTop: '5px' }}>{chordData[chordName]?.name}</p>
                                                                            {chordData[chordName]?.image && (
                                                                                <img src={chordData[chordName].image} alt={chordData[chordName].name} style={{ width: '120px', height: '100px' }} />
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                    {Array.from(uniqueChordsSet).length > 6 && (
                                                                        <div className="chord-box" style={{ position: 'relative', textAlign: 'center', margin: '10px' }}>
                                                                            <p style={{ marginTop: '5px', fontSize: '15px' }}>View more</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                    </div>
                                )
                            }
                            <Stack spacing={2} direction="row" justifyContent="center" mt={4}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>
                        </div>


                        <div className="col-md-4">
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'fixed' }}>
                                <b style={{ color: '#0d6efd', fontWeight: 'bold', textAlign: 'center', marginTop: '90px' }}>Rhythm</b>
                                <div className="card mx-3 my-1" style={{ width: '90%', padding: '5px' }}>
                                    <div className="flex-row" style={{
                                        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', cursor: 'pointer'
                                    }}>
                                        {beatGenres.map((beatGenre, index) => (
                                            <div
                                                key={index}
                                                className={`item-grid item-${index + 1}`}
                                                onClick={() => {
                                                    navigate(`/songBeatManager/${userId}/${beatGenre.beat_id.toLowerCase()}`);
                                                    window.location.reload();
                                                }}
                                                style={{
                                                    width: 'fit-content',
                                                    padding: '0 11px',
                                                    borderRadius: '5px',
                                                    margin: '5px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <p style={{
                                                    fontSize: '11px', margin: '5px'
                                                }}>
                                                    {beatGenre.beat_name} {'('}
                                                    {beatSongCounts[beatGenre.beat_id] !== undefined
                                                        ? `${beatSongCounts[beatGenre.beat_id]} bài`
                                                        : '0 bài'}
                                                    {')'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="card mx-3 my-1" style={{ width: '90%', padding: '5px' }}>
                                    <Button onClick={handleSongListToggle} style={{ cursor: 'pointer', marginBottom: '10px' }}>
                                        Add a song to {`${beat_type}`}
                                    </Button>

                                    {isSongListOpen && (
                                        <div style={{ maxHeight: '400px', overflowY: 'scroll', padding: '10px' }}>
                                            {allSongs.map((song) => (
                                                <div
                                                    key={song.id}
                                                    style={{
                                                        cursor: 'pointer',
                                                        padding: '8px',
                                                        marginBottom: '8px',
                                                        background: '#f8f9fa',
                                                        transition: 'background 0.3s',
                                                    }}
                                                    onClick={() => {
                                                        Modal.confirm({
                                                            title: 'Confirm Deletion',
                                                            content: `Are you sure you want to add ${song.song_title} to ${beat_type} ?`,
                                                            onOk() {
                                                                handleAddSongToBeatType(song.id);
                                                            },
                                                            onCancel() {
                                                                console.log('Cancel');
                                                            },
                                                        });
                                                        handleSongListToggle();
                                                    }}
                                                >
                                                    <h6 style={{ margin: '0', color: '#0d6efd', fontSize: '16px' }}>{song.song_title}</h6>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            <InfoContainer />
            <ModalPlaylist
                open={modalOpen}
                onClose={() => { setModalOpen(false) }}
            >
                <Box sx={styles} >
                    <div className="d-flex flex-wrap justify-content-start">
                        <div className="w-100 text-center">
                            <h2 className="mb-1 pd-top" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Playlist</h2>
                        </div>

                    </div>
                </Box>
            </ModalPlaylist>
        </>
    );
}

export default SongBeatManagerPage;
