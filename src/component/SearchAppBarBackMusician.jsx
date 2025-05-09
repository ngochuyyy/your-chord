import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HeadsetIcon from '@mui/icons-material/Headset';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import Avatar from '@mui/material/Avatar';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import HistoryIcon from '@mui/icons-material/History';
import FlakyIcon from '@mui/icons-material/Flaky';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import axios from 'axios';
import DvrIcon from '@mui/icons-material/Dvr';
import AddIcon from '@mui/icons-material/Add';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#F1F1FB',
        },
    },
});

export default function SearchAppBarBackMusican() {
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvt, setAnchorElAvt] = useState(null);
    const [activeButton, setActiveButton] = useState(
        localStorage.getItem('activeButtonMusician')
    );
    const navigate = useNavigate();
    const { userId } = useParams();
    const [imageURL, setImageURL] = useState(null);
    const [openSong, setOpenSong] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);

    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuClickAvt = (event) => {
        setAnchorElAvt(event.currentTarget);
    };
    const handleMenuCloseAvt = () => {
        setAnchorElAvt(null);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = token.split(':')[0];
        axios.get(`${apiUrl}/getProfile/` + userId)
            .then(res => {
                setData(res.data.Result)
                if (res.data.Result.length > 0) {
                    const profileImages = res.data.Result.map(data => `${data.image}`);
                    setImageURL(profileImages);
                }
            })
            .catch(err => console.log(err));
    }, [userId])
    const handleClickManageSong = () => {
        setOpenSong(!openSong);
        setOpenOrder(false);
        setOpenCourse(false);
    };
    const handleClickOrder = () => {
        setOpenOrder(!openOrder);
        setOpenSong(false);
        setOpenCourse(false);
    };
    const handleClickCourse = () => {
        setOpenCourse(!openCourse);
        setOpenSong(false);
        setOpenOrder(false);

    };
    const menuStyles = {
        flexDirection: 'column',
        position: 'absolute',
        with: '250px',
        left: 0,
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '20px',
    };
    const handleButtonClick = (e, buttonName) => {
        e.preventDefault();
        setActiveButton(buttonName);
        localStorage.setItem('activeButtonMusician', buttonName);
    };
    const handleSignOut = () => {
        localStorage.removeItem('activeButtonMusician');
        sessionStorage.removeItem('token');
        navigate("/login");
    };
    return (
        <Box sx={{ top: 0, position: "sticky", zIndex: '3' }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky" style={{ color: '#0d6efd' }} enableColorOnDark>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            aria-label="menu"
                            onClick={handleMenuClick}
                            sx={{
                                mr: 2, color: '#0d6efd'
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#0d6efd',
                                textDecoration: 'none', cursor: 'pointer'
                            }}
                        >
                            <HeadsetIcon fontSize="large" />
                        </Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ color: '#0d6efd', letterSpacing: '.3rem', fontWeight: 700, flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <b>YOUR CHORD</b>
                        </Typography>
                        <ListItemAvatar
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <Avatar onClick={handleMenuClickAvt}
                                        style={{
                                            cursor: 'pointer'
                                        }}>
                                        {imageURL && (
                                            <img src={`data:image/png;base64,${profile.image}`} className='profile_image' />
                                        )
                                        }
                                    </Avatar>
                                </div>
                            })}
                        </ListItemAvatar>
                        <Menu
                            anchorEl={anchorElAvt}
                            open={Boolean(anchorElAvt)}
                            onClose={handleMenuCloseAvt}
                            color="#0d6efd"
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        className={`dashboard-button ${activeButton === 'profileMusician' ? 'clicked' : ''}`}
                                        onClick={(e) => {
                                            handleButtonClick(e, 'profileMusician');
                                            navigate(`/profileMusician/` + profile.userId)
                                        }}>
                                        <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                    </ListItemButton>
                                    <ListItemButton style={{ borderRadius: '20px' }} onClick={handleSignOut}>
                                        <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                    </ListItemButton>
                                </div>
                            })}
                        </Menu>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            color="#0d6efd"
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>

                                    <ListItemButton onClick={handleClickManageSong} style={{ borderRadius: '20px' }} >
                                        <ListItemIcon>
                                            <GraphicEqIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Chord</span></ListItemText>
                                        {openSong ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                    </ListItemButton>
                                    <Collapse in={openSong} timeout="auto" unmountOnExit>
                                        <List sx={{ width: '100%' }}>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'chordMusician' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'chordMusician');
                                                    navigate(`/chordMusician/`)
                                                }}>
                                                <ListItemIcon>
                                                    <FlakyIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Waiting Approve</span></ListItemText>
                                            </ListItemButton>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'rejectSong' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'rejectSong');
                                                    navigate(`/rejectSong/`)
                                                }}>
                                                <ListItemIcon>
                                                    <SentimentVeryDissatisfiedIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Not Approved</span></ListItemText>
                                            </ListItemButton>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'chordMissMusician' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'chordMissMusician');
                                                    navigate(`/chordMissMusician/`)
                                                }}>
                                                <ListItemIcon>
                                                    <MusicOffIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Missing Chord</span></ListItemText>
                                            </ListItemButton>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'requestChordMusician' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'requestChordMusician');
                                                    navigate('/requestChordMusician')
                                                }}  >
                                                <ListItemIcon>
                                                    <SpatialAudioIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Request Chord</span></ListItemText>
                                            </ListItemButton>
                                            <ListItemButton style={{ borderRadius: '20px' }}
                                                className={`dashboard-button ${activeButton === 'acceptChordRequest' ? 'clicked' : ''}`}
                                                onClick={(e) => {
                                                    handleButtonClick(e, 'acceptChordRequest');
                                                    navigate(`/acceptChordRequest/${profile.userId}`)
                                                }}  >
                                                <ListItemIcon>
                                                    <BookmarkAddedIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                </ListItemIcon>
                                                <ListItemText><span className="fontDashboard">Chord Request Received</span></ListItemText>
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'songMusician' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'songMusician');
                                                navigate(`/songMusician/`)
                                            }}>
                                            <ListItemIcon>
                                                <LibraryMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'manageBeat' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'manageBeat');
                                                navigate(`/manageBeat/`)
                                            }}>
                                            <ListItemIcon>
                                                {/* <EqualizerIcon style={{ color: '#0d6efd' }} fontSize='medium' /> */}
                                                <i className="bi bi-vinyl-fill text-primary fs-4"></i>
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Beat</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton onClick={handleClickOrder} style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <QueueMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Oder</span></ListItemText>
                                            {openOrder ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openOrder} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 1 }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'orderMusician' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'orderMusician');
                                                        navigate(`/orderMusician/`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <PlaylistAddCheckCircleIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Order</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'orderMusicianAccept' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'orderMusicianAccept');
                                                        navigate(`/orderMusicianAccept/${profile.userId}`)
                                                    }}  >
                                                    <ListItemIcon>
                                                        <BookmarkAddedIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Your Order</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'orderHistory' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'orderHistory');
                                                        navigate(`/orderHistory/${profile.userId}`)
                                                    }}  >
                                                    <ListItemIcon>
                                                        <HistoryIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">History</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton onClick={handleClickCourse} style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <DvrIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Course</span></ListItemText>
                                            {openCourse ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openCourse} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 1 }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'manageCourse' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'manageCourse');
                                                        navigate(`/manageCourse/${profile.userId}`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <AddIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Create course</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'rejectCourse' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'rejectCourse');
                                                        navigate(`/rejectCourse/${profile.userId}`)
                                                    }}>
                                                    <ListItemIcon>
                                                        <SentimentVeryDissatisfiedIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">Rejected course</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>

                                </div>
                            })}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}