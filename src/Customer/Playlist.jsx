import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import HeadsetIcon from "@mui/icons-material/Headset";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
function Playlist() {
    const [data, setData] = useState([]);
    const { userId } = useParams();
    const [search, setSearch] = useState("");
    const [imageURL, setImageURL] = useState(null);
    const [loading, setLoading] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [playlistSongsCount, setPlaylistSongsCount] = useState([]);
    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
                main: "#F1F1FB",
            },
        },
    });
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
    const handleMenuOpen = (event, playlistId) => {
        setAnchorEl(event.currentTarget);
        setSelectedPlaylistId(playlistId);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedPlaylistId(null);
    };
    const fetchPlaylistData = async () => {
        setLoading(true);
        try {
            const playlistResponse = await axios.get(`${apiUrl}/getPlaylist/` + userId);
            if (playlistResponse.data.Status === "Success") {

                setData(playlistResponse.data.Result);
                if (playlistResponse.data.Result.length > 0) {
                    const playlistImages = playlistResponse.data.Result.map(playlist => `${playlist.image}`);
                    setImageURL(playlistImages);

                    for (const playlist of playlistResponse.data.Result) {
                        try {
                            const countResponse = await axios.get(`${apiUrl}/countSongPlaylist/` + playlist.id);
                            setLoading(false);
                            setPlaylistSongsCount((prevCounts) => {
                                return { ...prevCounts, [playlist.id]: countResponse.data.songCount };
                            });
                        } catch (countError) {
                            console.error("Error fetching song count", countError);
                        }
                    }
                }
            } else {
                alert("Error");
            }
        } catch (error) {
            console.error(error);
        }
    };
    const playlistItemStyle = {
        maxWidth: '200px', // Adjust the width as needed
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease-in-out',
        ':hover': {
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        },
    };
    useEffect(() => {
        fetchPlaylistData();
    }, []);

    const handleDelete = (id) => {
        axios.delete(`${apiUrl}/deleteCollection/ ` + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                }
            })
            .catch(err => console.error(err));
    };
    const filteredPlaylist = data.filter((playlist) => {
        return search.trim() === '' ||
            playlist.collection_name.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <>
            <Box sx={{ flexGrow: 1, top: 0, position: "sticky", zIndex: "3" }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontFamily: "monospace",
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "#0d6efd",
                                    textDecoration: "none",
                                }}
                            >
                                <HeadsetIcon fontSize="large" />
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    color: "#0d6efd",
                                    letterSpacing: ".3rem",
                                    fontWeight: 700,
                                    flexGrow: 1,
                                    display: { xs: "none", sm: "block" },
                                }}
                            >
                                <b>YOUR CHORD</b>
                            </Typography>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Search.."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
            <div className='d-flex flex-column align-items-center pt-4'>
                <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Library</h3>
            </div>
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
                    {filteredPlaylist.length === 0 ? (
                        <p className="d-flex justify-content-center" style={{ color: '#0d6efd', paddingTop: '200px' }}>No result found. Try again !</p>
                    ) : (
                        <>
                            <div className="d-flex flex-wrap justify-content-start" style={{ marginLeft: '70px' }}>

                                {filteredPlaylist.map((playlist, index) => (
                                    <div key={index} className="m-4 p-4" style={playlistItemStyle} >
                                        <div className="container rounded bg-white" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div className="rounded-image-container" >
                                                    {imageURL && (
                                                        <img
                                                            className="rounded-square-image"
                                                            src={`data:image/png;base64,${playlist.image}`}
                                                        />
                                                    )}
                                                    <Tooltip title={<b>{playlistSongsCount[playlist.id]} Tracks</b>}
                                                        arrow
                                                        placement="top">
                                                        <div className="image-overlay">
                                                            <Link to={'/viewPlaylist/' + playlist.id} style={{ textDecoration: 'none' }}><b>View Playlist</b></Link>
                                                        </div>
                                                    </Tooltip>
                                                    <div>
                                                        <IconButton
                                                            size="large"
                                                            aria-label="menu"
                                                            aria-haspopup="true"
                                                            onClick={(event) => handleMenuOpen(event, playlist.id)}
                                                            style={{ position: 'absolute', top: 0, right: 0 }}
                                                            className="favorite-button"
                                                        >
                                                            <i className="bi-three-dots-vertical text-white fs-20"></i>
                                                        </IconButton>
                                                        <Menu
                                                            anchorEl={anchorEl}
                                                            open={selectedPlaylistId === playlist.id && Boolean(anchorEl)}
                                                            onClose={handleMenuClose}
                                                        >
                                                            <MenuItem onClick={() => handleDelete(playlist.id)}>
                                                                <h6 className="text-danger">
                                                                    <i className="bi bi-trash"></i> Delete
                                                                </h6>
                                                            </MenuItem>
                                                        </Menu>
                                                    </div>

                                                </div>
                                                <Link to={'/viewPlaylist/' + playlist.id} className="playlist-name" style={{ textDecoration: 'none' }} >
                                                    <b >{playlist.collection_name}
                                                    </b>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </>
            }
        </>
    );
}


export default Playlist;
