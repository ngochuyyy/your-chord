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
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import DvrIcon from '@mui/icons-material/Dvr';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AddIcon from '@mui/icons-material/Add';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: '#F1F1FB',
        },
    },
});

export default function SearchAppBarBackAdmin() {
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAvt, setAnchorElAvt] = useState(null);
    const [openSong, setOpenSong] = useState(false);

    const [activeButton, setActiveButton] = useState(
        localStorage.getItem('activeButtonAdmin')
    );
    const navigate = useNavigate();
    const { userId } = useParams();
    const [imageURL, setImageURL] = useState(null);

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
    const handleClickSong = () => {
        setOpenSong(!openSong);
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
        localStorage.setItem('activeButtonAdmin', buttonName);
    };
    const handleSignOut = () => {
        localStorage.removeItem('activeButtonAdmin');
        sessionStorage.removeItem('token');
        navigate("/login");
    };
    return (
        <Box sx={{ top: 0, position: "sticky", zIndex: '3' }}>
            <ThemeProvider theme={darkTheme}>
                <AppBar position="sticky" color="primary" enableColorOnDark>
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
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>
                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        className={`dashboard-button ${activeButton === 'profile' ? 'clicked' : ''}`}
                                        onClick={(e) => {
                                            handleButtonClick(e, 'profile');
                                            navigate(`/profile/` + profile.userId)
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
                            PaperProps={{
                                style: menuStyles,
                            }}
                        >
                            {data.map((profile, index) => {
                                return <div key={index}>

                                    <ListItemButton style={{ borderRadius: '20px' }}
                                        className={`dashboard-button ${activeButton === 'manageAccount' ? 'clicked' : ''}`}
                                        onClick={(e) => {
                                            handleButtonClick(e, 'manageAccount');
                                            navigate(`/manageAccount`)
                                        }}>

                                        <ListItemIcon>
                                            <ManageAccountsIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                        </ListItemIcon>
                                        <ListItemText><span className="fontDashboard">Manage Account</span></ListItemText>
                                    </ListItemButton>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'requestAccount' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'requestAccount');
                                                navigate(`/requestAccount`)
                                            }}>

                                            <ListItemIcon>
                                                <ManageAccountsIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Request Account</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    {/* <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'Song' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'Song');
                                                navigate(`/Song`)
                                            }}>

                                            <ListItemIcon>
                                                <QueueMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                        </ListItemButton>
                                    </List> */}
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            onClick={handleClickSong} >
                                            <ListItemIcon>
                                                <MusicNoteIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Song</span></ListItemText>
                                            {openSong ? <ExpandLess style={{ color: '#0d6efd' }} fontSize='medium' /> : <ExpandMore style={{ color: '#0d6efd' }} fontSize='medium' />}
                                        </ListItemButton>
                                        <Collapse in={openSong} timeout="auto" unmountOnExit>
                                            <List sx={{ width: '100%', pl: 1 }}>
                                                <ListItemButton style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'Song' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'Song');
                                                        navigate('/Song')
                                                    }}
                                                >
                                                    <ListItemIcon>
                                                        <LibraryMusicIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">List Song</span></ListItemText>
                                                </ListItemButton>
                                                <ListItemButton
                                                    style={{ borderRadius: '20px' }}
                                                    className={`dashboard-button ${activeButton === 'createSong' ? 'clicked' : ''}`}
                                                    onClick={(e) => {
                                                        handleButtonClick(e, 'createSong');
                                                        navigate('/createSong')
                                                    }} >
                                                    <ListItemIcon>
                                                        <AddIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                                    </ListItemIcon>
                                                    <ListItemText><span className="fontDashboard">New Song</span></ListItemText>
                                                </ListItemButton>
                                            </List>
                                        </Collapse>
                                    </List>
                                    <List sx={{
                                        paddingTop: '20px'
                                    }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'requestCourse' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'requestCourse');
                                                navigate(`/requestCourse`)
                                            }}>
                                            <ListItemIcon>
                                                <DvrIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Request Course</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'manageFeedback' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'manageFeedback');
                                                navigate('/manageFeedback/' + profile.userId)
                                            }}>

                                            <ListItemIcon>
                                                <ThumbUpAltIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Manage Feedback</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    {/* <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton style={{ borderRadius: '20px' }}
                                            className={`dashboard-button ${activeButton === 'profile' ? 'clicked' : ''}`}
                                            onClick={(e) => {
                                                handleButtonClick(e, 'profile');
                                                navigate(`/profile/${profile.userId}`)
                                            }}>

                                            <ListItemIcon>
                                                <ModeIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Profile</span></ListItemText>
                                        </ListItemButton>
                                    </List>
                                    <List sx={{ paddingTop: '20px' }}>
                                        <ListItemButton to="/login" style={{ borderRadius: '20px' }}>
                                            <ListItemIcon>
                                                <LogoutIcon style={{ color: '#0d6efd' }} fontSize='medium' />
                                            </ListItemIcon>
                                            <ListItemText><span className="fontDashboard">Logout</span></ListItemText>
                                        </ListItemButton>
                                    </List> */}
                                </div>
                            })}
                        </Menu>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </Box>
    );
}