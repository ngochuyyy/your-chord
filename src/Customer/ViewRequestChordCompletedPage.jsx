import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SearchAppBarBackCustomer from "../component/SearchAppBarBackCustomer";
import { Button } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import finger_1 from '../../src/assets/finger/finger_1.png'
import finger_2 from '../../src/assets/finger/finger_2.png'
import finger_3 from '../../src/assets/finger/finger_3.png'
import finger_4 from '../../src/assets/finger/finger_4.png'
import Tooltip from '@material-ui/core/Tooltip';
import InfoContainer from "../component/InfoContainer";
function ViewRequestChordCompletedPage() {
    const [data, setData] = useState([]);
    const [majorChordsData, setDataMajorChords] = useState([]);
    const [minorChordsData, setDataMinorChords] = useState([]);
    const [c7ChordsData, setDataC7Chords] = useState([]);
    const [cm7ChordsData, setDataCm7Chords] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [alignment, setAlignment] = useState('left');
    const [formats, setFormats] = useState(() => ['italic']);
    const [isOn, setIsOn] = useState(true);
    const [isRight, setIsRight] = useState(false);
    const [isLeft, setIsLeft] = useState(true);
    const [isBold, setIsBold] = useState(false);
    const [chordPopups, setChordPopups] = useState({});
    const [currentKey, setCurrentKey] = useState(0);
    const [, setIsAnyPopupOpen] = useState(false);
    const [transpose, setTranspose] = useState(0);
    const [imageURL, setImageURL] = useState(null);
    const [hoveredTooltip, setHoveredTooltip] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
        '& .MuiToggleButtonGroup-grouped': {
            margin: theme.spacing(0.5),
            border: 0,
            '&.Mui-disabled': {
                border: 0,
            },
            '&:not(:first-of-type)': {
                borderRadius: theme.shape.borderRadius,
            },
            '&:first-of-type': {
                borderRadius: theme.shape.borderRadius,
            },
        },
    }));
    useEffect(() => {
        axios.get(`${apiUrl}/getRequestChord/` + id, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    setLoading(false);
                    setData(res.data.Result);
                    setImageURL(`data:image/png;base64, ${res.data.Result.image}`);

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
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
                    setDataC7Chords(c7ChordsData)
                    setDataCm7Chords(cm7ChordsData)

                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [id, currentKey])

    const chordData = { ...majorChordsData, ...minorChordsData, ...c7ChordsData, ...cm7ChordsData };
    const majorKeys = Object.keys(majorChordsData);
    const minorKeys = Object.keys(minorChordsData);
    const c7Keys = Object.keys(c7ChordsData);
    const cm7Keys = Object.keys(cm7ChordsData);

    const keys = {
        major: majorKeys,
        minor: minorKeys,
        c7: c7Keys,
        cm7: cm7Keys,

    };

    const increaseKey = (isMajorChord) => {
        let chordNames;
        if (isMajorChord) {
            chordNames = keys.major;
        } else if (!isMajorChord && keys.minor.includes(currentKey)) {
            chordNames = keys.minor;
        } else if (!isMajorChord && keys.c7.includes(currentKey)) {
            chordNames = keys.c7;
        } else if (!isMajorChord && keys.cm7.includes(currentKey)) {
            chordNames = keys.cm7;
        }
        setCurrentKey((currentKey + 1) % chordNames.length);
        handleCloseAllPopups();
    };

    const decreaseKey = (isMajorChord) => {
        let chordNames;
        if (isMajorChord) {
            chordNames = keys.major;
        } else if (!isMajorChord && keys.minor.includes(currentKey)) {
            chordNames = keys.minor;
        } else if (!isMajorChord && keys.c7.includes(currentKey)) {
            chordNames = keys.c7;
        } else if (!isMajorChord && keys.cm7.includes(currentKey)) {
            chordNames = keys.cm7;
        }
        setCurrentKey((currentKey - 1 + chordNames.length) % chordNames.length);
        handleCloseAllPopups();
    };

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleChordOn = () => {
        setIsOn(false)

    }
    const handleChordOff = () => {
        setIsOn(true)

    }
    const handleChordRight = () => {
        setIsRight(true)
        setIsLeft(false)

    }
    const handleChordLeft = () => {
        setIsLeft(true)
        setIsRight(false)

    }
    const handleChordCenter = () => {
        setIsLeft(false)
        setIsRight(false)
    }
    const handleChordOffBold = () => {
        setIsBold(true)
    }
    const handleChordOnBold = () => {
        setIsBold(false)
    }
    const toggleChordPopup = (chordName, isHovered) => {
        setChordPopups((prevPopups) => {
            const updatedPopups = { ...prevPopups };
            updatedPopups[chordName] = isHovered;
            if (!isHovered) {
                Object.keys(updatedPopups).forEach((prevChord) => {
                    updatedPopups[prevChord] = false;
                });
            }
            const anyPopupOpen = Object.values(updatedPopups).some((value) => value);
            setIsAnyPopupOpen(anyPopupOpen);
            return updatedPopups;
        });
    };
    const handleCloseAllPopups = () => {
        setChordPopups({});
        setIsAnyPopupOpen(false);
    };

    const renderChordPopup = (chordName) => {
        const chordImage = chordData[chordName];
        const handleTransposition = (direction) => {
            let chordNames
            if (chordData[chordName].type === 0) {
                chordNames = Object.keys(majorChordsData)
            }
            if (chordData[chordName].type === 1) {
                chordNames = Object.keys(minorChordsData)
            }
            if (chordData[chordName].type === 2) {
                chordNames = Object.keys(c7ChordsData)
            }
            if (chordData[chordName].type === 3) {
                chordNames = Object.keys(cm7ChordsData)
            }
            const currentIndex = chordNames.indexOf(chordName);
            let newIndex;
            if (direction === 'increase') {
                newIndex = (currentIndex + 1) % chordNames.length;
                setTranspose((transpose + 1) % chordNames.length);
            } else if (direction === 'decrease') {
                newIndex = (currentIndex - 1 + chordNames.length) % chordNames.length;
                setTranspose((transpose - 1 + chordNames.length) % chordNames.length);
            }
            const newChord = chordNames[newIndex];
            toggleChordPopup(chordName, false);
            toggleChordPopup(newChord, true);
        };


        return (
            chordPopups[chordName] && (
                <div className="chord-popup" style={{ display: chordPopups[chordName] ? 'block' : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h2>{chordName}</h2>
                        {imageURL &&
                            <img src={chordImage.image} style={{ width: '100%', height: '100%' }} />
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <IconButton
                                style={{ padding: '1px' }}
                                color="#0d6efd"
                                onClick={() => handleTransposition('decrease')}
                                size="small"
                            >
                                <ArrowLeftIcon style={{ color: 'white' }} />
                            </IconButton>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <p style={{ margin: 8, color: 'black', fontSize: '13px' }}><b>Đổi tông</b></p>
                            </div>
                            <IconButton
                                style={{ padding: '1px' }}
                                color="#0d6efd"
                                onClick={() => handleTransposition('increase')}
                                size="small"
                            >
                                <ArrowRightIcon style={{ color: 'white' }} />
                            </IconButton>
                        </div>
                    </div>
                </div>
            )
        );
    };
    return (
        <>
            <SearchAppBarBackCustomer />
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
                    <div className='d-flex flex-column align-items-center pt-5'>
                        {data.map((viewSong, index) => {
                            let dataChord = viewSong.lyrics;
                            dataChord = dataChord.replace(/.+/g, "<section>$&</section>");
                            const chordNamesMajor = majorKeys
                            const chordNamesMinor = minorKeys
                            const chordNamesC7 = c7Keys
                            const chordNamesCm7 = cm7Keys

                            let hiddenChord = dataChord.replace(
                                /\[(?<chord>\w+)\]/g,
                                "<strong></strong>"
                            );
                            let songChord = dataChord.replace(/\[(?<chord>[\w#]+)\]/g, (match, chord) => {
                                if (chordNamesMajor.includes(chord)) {
                                    const indexInKeys = chordNamesMajor.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMajor.length;
                                    return `<strong class='chord'>${chordNamesMajor[transposedIndex]}</strong>`;
                                }
                                if (chordNamesMinor.includes(chord)) {
                                    const indexInKeys = chordNamesMinor.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMinor.length;
                                    return `<strong class='chord'>${chordNamesMinor[transposedIndex]}</strong>`;
                                }
                                if (chordNamesC7.includes(chord)) {
                                    const indexInKeys = chordNamesC7.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesC7.length;
                                    return `<strong class='chord'>${chordNamesC7[transposedIndex]}</strong>`;
                                }
                                if (chordNamesCm7.includes(chord)) {
                                    const indexInKeys = chordNamesCm7.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesCm7.length;
                                    return `<strong class='chord'>${chordNamesCm7[transposedIndex]}</strong>`;
                                }
                                return match;
                            });
                            const uniqueChords = new Set();
                            dataChord = dataChord.replace(/\[(?<chord>[\w#]+)\]/g, (match, chord) => {
                                if (chordNamesMajor.includes(chord)) {
                                    const indexInKeys = chordNamesMajor.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMajor.length;
                                    const transposedChord = chordNamesMajor[transposedIndex];
                                    uniqueChords.add(transposedChord);
                                    return `<strong class='chord' data-chord="${transposedChord}">${transposedChord}</strong>`;
                                }
                                if (chordNamesMinor.includes(chord)) {
                                    const indexInKeys = chordNamesMinor.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesMinor.length;
                                    const transposedChord = chordNamesMinor[transposedIndex];
                                    uniqueChords.add(transposedChord);
                                    return `<strong class='chord' data-chord="${transposedChord}">${transposedChord}</strong>`;
                                }
                                if (chordNamesC7.includes(chord)) {
                                    const indexInKeys = chordNamesC7.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesC7.length;
                                    const transposedChord = chordNamesC7[transposedIndex];
                                    uniqueChords.add(transposedChord);
                                    return `<strong class='chord' data-chord="${transposedChord}">${transposedChord}</strong>`;
                                }
                                if (chordNamesCm7.includes(chord)) {
                                    const indexInKeys = chordNamesCm7.indexOf(chord);
                                    const transposedIndex = (indexInKeys + currentKey + transpose) % chordNamesCm7.length;
                                    const transposedChord = chordNamesCm7[transposedIndex];
                                    uniqueChords.add(transposedChord);
                                    return `<strong class='chord' data-chord="${transposedChord}">${transposedChord}</strong>`;
                                }
                                return match;
                            });
                            let firstChord = '';
                            const firstChordMatch = songChord.match(/<strong class='chord'>(.*?)<\/strong>/);
                            if (firstChordMatch) {
                                firstChord = firstChordMatch[1];
                            }
                            const chordContainer = document.getElementById('chordContainer');
                            if (chordContainer) {
                                chordContainer.innerHTML = isOn ? songChord : hiddenChord;
                                const chordElements = document.querySelectorAll('.chord');
                                chordElements.forEach(chord => {
                                    let chordName = chord.textContent;
                                    chord.addEventListener('click', function () {
                                        Object.keys(chordPopups).forEach(existingChord => {
                                            if (existingChord !== chordName && chordPopups[existingChord]) {
                                                toggleChordPopup(existingChord, false);
                                            }
                                        });
                                        toggleChordPopup(chordName, !chordPopups[chordName]);
                                    });

                                    chord.addEventListener('mouseenter', function () {
                                        if (isOn) {
                                            Object.keys(chordPopups).forEach(existingChord => {
                                                if (existingChord !== chordName && chordPopups[existingChord]) {
                                                    toggleChordPopup(existingChord, false);
                                                }
                                            });
                                            toggleChordPopup(chordName, true);
                                        }
                                    });
                                });
                            }
                            return <div key={index}>
                                <h3 className="d-flex justify-content-center"><b>{viewSong.song_name}</b></h3>
                                <div className="row mt-5 d-flex justify-content-center">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-6">
                                                {viewSong.artist_name != null ? <p><b>Artist:</b> {viewSong.artist_name}</p>
                                                    :
                                                    <p><b>Artist:</b> Updating</p>
                                                }
                                                {viewSong.link != null ? (
                                                    <p><b>Link:</b> <Link to={viewSong.link} style={{ textDecoration: 'none', cursor: 'pointer' }}>{viewSong.link.substring(0, 30)}</Link></p>
                                                ) : (
                                                    <p><b>Link:</b> Updating...</p>
                                                )}
                                            </div>
                                            <div className="col-md-6">
                                                <p><b>Date created:</b> {moment(viewSong.request_date).format('YYYY/MM/DD - HH:mm:ss')}</p>
                                                <p><b>Author:</b> {viewSong.musician_id}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex flex-column align-items-center'>
                                    <div onMouseLeave={handleCloseAllPopups}>
                                        {Object.keys(chordData).map((chordName) => (
                                            <div key={chordName} >
                                                {renderChordPopup(chordName, chordData[chordName])}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-2">
                                        <div className="row">
                                            <div className="card_song" style={{ width: 'fit-content' }}>
                                                <Paper
                                                    elevation={1}
                                                    sx={{
                                                        display: 'flex',
                                                        border: (theme) => `1px solid ${theme.palette.divider}`,
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        flexWrap: 'wrap',
                                                        borderRadius: '40px'
                                                    }}
                                                >
                                                    <Tooltip title={<p>Decrease Key</p>}
                                                        arrow
                                                        placement="top">
                                                        <Button onClick={decreaseKey} style={{ borderRadius: '40px', marginLeft: '5px' }}><RemoveIcon /></Button>
                                                    </Tooltip>
                                                    <Button style={{ color: "#0d6efd" }}><b>{firstChord}</b></Button>
                                                    <Tooltip title={<p>Increase Key</p>}
                                                        arrow
                                                        placement="top">
                                                        <Button onClick={increaseKey} style={{ borderRadius: '40px' }}><AddIcon /></Button>
                                                    </Tooltip>
                                                    <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1, border: '0.2px dashed black' }} />
                                                    <StyledToggleButtonGroup
                                                        size="small"
                                                        value={alignment}
                                                        exclusive
                                                        onChange={handleAlignment}
                                                        aria-label="text alignment"
                                                        sx={{
                                                            marginRight: 'auto',
                                                        }}
                                                    >
                                                        <ToggleButton value="left" aria-label="left aligned" onClick={handleChordLeft}>
                                                            <FormatAlignLeftIcon />
                                                        </ToggleButton>
                                                        <ToggleButton value="center" aria-label="centered" onClick={handleChordCenter}>
                                                            <FormatAlignCenterIcon />
                                                        </ToggleButton>
                                                        <ToggleButton value="right" aria-label="right aligned" onClick={handleChordRight}>
                                                            <FormatAlignRightIcon />
                                                        </ToggleButton>
                                                        <StyledToggleButtonGroup
                                                            size="small"
                                                            value={formats}
                                                            onChange={handleFormat}
                                                            aria-label="text formatting"
                                                        >
                                                            {isBold ?
                                                                <ToggleButton value="bold" aria-label="bold" onClick={handleChordOnBold}>
                                                                    <FormatBoldIcon />
                                                                </ToggleButton>
                                                                :
                                                                <ToggleButton value="bold" aria-label="bold" onClick={handleChordOffBold}>
                                                                    <FormatBoldIcon />
                                                                </ToggleButton>
                                                            }

                                                        </StyledToggleButtonGroup>

                                                    </StyledToggleButtonGroup>
                                                    <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1, border: '0.1px solid black' }} />
                                                    <StyledToggleButtonGroup
                                                        size="small"
                                                        value={formats}
                                                        onChange={handleFormat}
                                                        aria-label="text formatting"
                                                    >
                                                        <Tooltip title={<p>On/Off Chord</p>}
                                                            arrow
                                                            placement="top">
                                                            {isOn ?
                                                                <ToggleButton value="#F1F1FB" onClick={handleChordOn} style={{ borderBottomRightRadius: '40px', borderTopRightRadius: '40px' }}>
                                                                    <VisibilityOffIcon fontSize="medium" />  Chord
                                                                </ToggleButton>

                                                                :
                                                                <ToggleButton value="#F1F1FB" onClick={handleChordOff} style={{ borderBottomRightRadius: '40px', borderTopRightRadius: '40px' }}>
                                                                    <RemoveRedEyeIcon fontSize="medium" />  Chord
                                                                </ToggleButton>
                                                            }
                                                        </Tooltip>
                                                    </StyledToggleButtonGroup>
                                                </Paper>

                                                <div className="pd-left">

                                                    <div className="d-flex align-items-center  mb-md-1 mt-md-3  text-white row">
                                                        <div className="container">
                                                            <div
                                                                id="chordContainer"
                                                                className={`font ${isBold ? 'bold' : ''}`}
                                                                style={{
                                                                    textAlign: isRight ? 'right' : isLeft ? 'left' : 'center',
                                                                    fontWeight: isBold ? 'bold' : 'normal',
                                                                }}
                                                                onMouseEnter={() => {
                                                                    if (isOn) {
                                                                        const firstChordName = Object.keys(chordData);
                                                                        toggleChordPopup(firstChordName, true);
                                                                    }
                                                                }}
                                                                dangerouslySetInnerHTML={{ __html: songChord }}>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <h5 className="font" style={{ color: "#0d6efd", fontWeight: 'bold' }}>Danh sách các hợp âm:</h5>
                                                    <div className="chord-list-container" style={{ maxWidth: '1400px' }}>
                                                        {[...uniqueChords].map((chordName) => (
                                                            <div key={chordName} className="chord-box" style={{ position: 'relative', paddingLeft: '30px' }}>
                                                                <Tooltip
                                                                    title={
                                                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                            <div style={{
                                                                                padding: '10px',
                                                                                marginBottom: '20px',
                                                                                height: 'auto',
                                                                                textAlign: 'center',
                                                                                margin: '10px',
                                                                            }}>
                                                                                <h5 style={{ fontWeight: 'bold', marginTop: '20px' }}>How to Read Chords</h5>
                                                                                <p>Here is a guide to reading chords and finger positions:</p>
                                                                                <ul>
                                                                                    <li style={{ textAlign: 'left' }}>Finger Positions:</li>
                                                                                    <div className="row" style={{ textAlign: 'left', paddingLeft: '50px', paddingTop: '10px' }}>
                                                                                        <div className="column" >
                                                                                            <img src={finger_1} style={{ height: '60%' }} /> <b> Index finger</b>
                                                                                        </div>
                                                                                        <div className="column" >
                                                                                            <img src={finger_2} style={{ height: '60%' }} /> <b> Middle finger</b>
                                                                                        </div>
                                                                                        <div className="column" >
                                                                                            <img src={finger_3} style={{ height: '60%' }} /> <b> Ring finger</b>
                                                                                        </div>
                                                                                        <div className="column" >
                                                                                            <img src={finger_4} style={{ height: '60%' }} /> <b> Pinky finger</b>
                                                                                        </div>
                                                                                    </div>
                                                                                </ul>
                                                                                <ul style={{ textAlign: 'left' }}>
                                                                                    <li><b style={{ fontSize: '12px' }}>O:</b> String on the first fret (open string)</li>
                                                                                    <li><b style={{ fontSize: '12px' }}>X:</b> Unfretted string</li>
                                                                                    <li><b style={{ fontSize: '12px' }}>3fr:</b> Third fret on the guitar</li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                    arrow
                                                                    placement="right"
                                                                    open={hoveredTooltip === chordName}
                                                                >
                                                                    <div
                                                                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                                                        onMouseEnter={() => setHoveredTooltip(chordName)}
                                                                        onMouseLeave={() => setHoveredTooltip(null)}
                                                                    >
                                                                        <p>{chordData[chordName].name}</p>
                                                                        {imageURL && <img src={chordData[chordName].image} alt={chordData[chordName].name} style={{ width: '120px', height: '100px' }} />}
                                                                    </div>
                                                                </Tooltip>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <IconButton
                                                                        style={{ padding: '1px' }}
                                                                        color="#0d6efd"
                                                                        onClick={() => decreaseKey('decrease')}
                                                                        size="small"
                                                                    >
                                                                        <ArrowLeftIcon style={{ color: 'white' }} />
                                                                    </IconButton>

                                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                                        <p style={{ margin: 8, color: 'black', fontSize: '13px' }}><b>Đổi tông</b></p>
                                                                    </div>
                                                                    <IconButton
                                                                        style={{ padding: '1px' }}
                                                                        color="#0d6efd"
                                                                        size="small"
                                                                        onClick={() => increaseKey('increase')}
                                                                    >
                                                                        <ArrowRightIcon style={{ color: 'white' }} />
                                                                    </IconButton>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                </div>

                                                <div className="footer" style={{ paddingBottom: '20px', paddingLeft: '10px' }}>
                                                    <hr />
                                                    <Button variant="contained" onClick={() => navigate(-1)} className='btn-success' >CLOSE
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </>
            }
            <InfoContainer />
        </>
    )

}
export default ViewRequestChordCompletedPage;
