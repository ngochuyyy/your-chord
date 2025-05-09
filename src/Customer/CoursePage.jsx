import { useEffect, useState } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import moment from 'moment';
import Scrollbars from 'react-custom-scrollbars';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F1F1FB',
        },
    },
});

function CoursePage() {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [tabVisible, setTabVisible] = useState(true);
    const handleTabChange = (event, newValue) => {
        setSelectedCourse(newValue);
    };
    useEffect(() => {
        setSelectedCourse(null);
    }, [search]);
    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/getCourse`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setData(res.data.Result);
                    setLoading(false);
                    setSelectedCourse(res.data.Result.length > 0 ? 0 : null);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const generateBlobUrl = (data, mimeType) => {
        const blob = new Blob([data], { type: mimeType });
        return URL.createObjectURL(blob);
    };
    const getYouTubeVideoId = (url) => {
        const videoIdMatch = url.match(/[?&]v=([^&]+)/);
        return videoIdMatch ? videoIdMatch[1] : null;
    };
    const filteredRequestCourse = data
        .filter((request) => {
            return (
                (search.trim() === '' && request.status === 2) ||
                (request.course_name &&
                    request.course_name.toLowerCase().includes(search.toLowerCase()) &&
                    request.status === 2)
            );
        });
    return (
        <>
            <Box sx={{ top: 0, position: 'sticky', zIndex: '3' }}>
                <ThemeProvider theme={darkTheme}>
                    <AppBar position="static" color="primary" enableColorOnDark>
                        <Toolbar>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: '#0d6efd',
                                    textDecoration: 'none',
                                }}
                            >
                                <HeadsetIcon fontSize="large" />
                            </Typography>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{
                                    color: '#0d6efd',
                                    letterSpacing: '.3rem',
                                    fontWeight: 700,
                                    flexGrow: 1,
                                    display: { xs: 'none', sm: 'block' },
                                }}
                            >
                                <b>YOUR CHORD</b>
                            </Typography>
                            <input
                                type="text"
                                className="input-box"
                                placeholder="Search..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <SearchIcon className="inputIcon" />
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </Box>
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
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold', marginTop: "50px" }}>Course</h3>
                    </div>

                    <Box sx={{
                        display: 'flex', flexDirection: 'row', marginLeft: '10px'
                    }}>

                        {tabVisible && (
                            <Scrollbars style={{ width: '24%', height: '70vh' }}
                                renderThumbVertical={(props) => (
                                    <div
                                        {...props}
                                        style={{
                                            backgroundColor: '#0d6efd',
                                        }}
                                    />
                                )}
                                renderTrackVertical={(props) => (
                                    <div
                                        {...props}
                                        style={{ backgroundColor: '#ccc', width: '4px', borderRadius: '3px', height: '70vh' }}
                                    />
                                )}>
                                <Tabs
                                    orientation="vertical"
                                    value={selectedCourse}
                                    onChange={handleTabChange}
                                    sx={{
                                        position: 'flex',
                                        borderRight: '1.5px solid',
                                        borderTop: '1.5px solid',
                                        borderBottom: '1.5px solid',
                                        borderBottomRightRadius: '20px',
                                        minHeight: '70vh',
                                        borderColor: 'divider',
                                        width: '100%',
                                    }}>
                                    {filteredRequestCourse.length > 0 && filteredRequestCourse.map((course, index) => (
                                        <Tab
                                            key={index}
                                            label={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {selectedCourse === index && <PlayCircleIcon style={{ marginRight: '8px' }} />}
                                                    <b>{course.course_name}</b>
                                                </div>
                                            }
                                            style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}
                                        />
                                    ))}
                                    {filteredRequestCourse.length === 0 && (
                                        <Tab

                                            label={
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <b>No Search result was found</b>
                                                </div>
                                            }
                                            style={{ borderTopRightRadius: '20px', borderBottomRightRadius: '20px' }}
                                        />
                                    )}
                                </Tabs>
                            </Scrollbars>
                        )}
                        <button
                            onClick={() => setTabVisible(!tabVisible)}
                            style={{
                                height: '49px',
                                borderRight: 1,
                                borderTop: 1,
                                borderBottom: 1,
                                borderLeft: tabVisible ? 1 : null,
                                borderColor: tabVisible ? "" : "#0d6efd",
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                            }}>
                            {tabVisible ? <ChevronLeftIcon sx={{ '&:hover': { transform: 'scale(1.2)' } }} style={{ fontSize: 28, color: '#0d6efd' }} /> : <ChevronRightIcon sx={{ '&:hover': { transform: 'scale(1.2)' } }} style={{ fontSize: 28, color: '#0d6efd' }} />}
                        </button>

                        <Box sx={{ width: '55%', margin: 'auto' }}>
                            {selectedCourse !== null && filteredRequestCourse.length > 0 && selectedCourse < filteredRequestCourse.length && (
                                <div>
                                    <h3 style={{ fontWeight: 'bold', marginTop: '50px' }}>
                                        {filteredRequestCourse[selectedCourse].course_name}
                                    </h3>
                                    <p><span>Author:</span> {filteredRequestCourse[selectedCourse].userId}</p>
                                    <p><span>Date created:</span> {moment(filteredRequestCourse[selectedCourse].upload_date).format('YYYY/MM/DD - HH:mm:ss')}</p>
                                    <div style={{
                                        width: 'fit-content',
                                        border: '3px solid #0d6efd',
                                        borderRadius: '5px',
                                        paddingTop: '7px',
                                        paddingLeft: '7px',
                                        paddingRight: '7px',
                                    }}>
                                        {getYouTubeVideoId(filteredRequestCourse[selectedCourse].link) && (
                                            <YouTube
                                                videoId={getYouTubeVideoId(filteredRequestCourse[selectedCourse].link)}
                                                opts={{
                                                    playerVars: {
                                                        modestbranding: 1,
                                                    },
                                                    host: 'https://www.youtube-nocookie.com',
                                                }}
                                            />
                                        )}

                                        {filteredRequestCourse[selectedCourse].videoFile && (
                                            <video controls width="640" height="400" controlsList="nodownload">
                                                <source
                                                    src={generateBlobUrl(
                                                        new Uint8Array(filteredRequestCourse[selectedCourse].videoFile.data).buffer,
                                                        'video/*'
                                                    )}
                                                    type="video/mp4"
                                                />
                                            </video>
                                        )}
                                    </div>
                                </div>
                            )}
                        </Box>
                    </Box>
                </>
            }
        </>
    );
}

export default CoursePage;
