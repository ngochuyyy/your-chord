import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Modal,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import HeadsetIcon from '@mui/icons-material/Headset';
import PersonIcon from '@mui/icons-material/Person';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Pagination from '@mui/material/Pagination';
import { Button } from 'antd';
import { Modal as ModalConfirm } from 'antd';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#F1F1FB',
        },
    },
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    borderRadius: 5,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function RequestAccountPage() {
    const [isAcceptAccount, setIsAcceptAccount] = useState(false);
    const [isRejectAccount, setIsRejectAccount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [dataProfile, setDataProfile] = useState([]);
    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(false);
    const [orderBy, setOrderBy] = useState("username");
    const [order, setOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [imageURL, setImageURL] = useState(null);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const primaryColor = '#F1F1FB';
    const itemsPerPage = 5;
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setStoredTabValue(newValue);
        setCurrentPage(1)
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${apiUrl}/getAccount`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setLoading(false);
                    setData(res.data.Result);
                    if (res.data.Result.length > 0) {
                        const profileImages = res.data.Result.map(data => `${data.image}`);
                        setImageURL(profileImages);
                    }
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleAcceptAccountMusician = (username) => {
        setLoading(true);
        axios.put(`${apiUrl}/acceptAccountMusician/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsAcceptAccount(true);
                    setLoading(false);
                    setTimeout(() => {
                        setIsAcceptAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRejectAccountMusician = (username) => {
        setLoading(true);
        axios.put(`${apiUrl}/rejectAccountMusician/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setLoading(false);
                    setIsRejectAccount(true);
                    setTimeout(() => {
                        setIsRejectAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };

    const handleAcceptAccountChordValidator = (username) => {
        setLoading(true);
        axios.put(`${apiUrl}/acceptAccountChordValidator/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsAcceptAccount(true);
                    setLoading(false);
                    setTimeout(() => {
                        setIsAcceptAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleRejectAccountChordValidator = (username) => {
        setLoading(true);
        axios.put(`${apiUrl}/rejectAccountChordValidator/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setIsRejectAccount(true);
                    setLoading(false);
                    setTimeout(() => {
                        setIsRejectAccount(false);
                        window.location.reload(true);
                    }, 2500);
                }
            })
            .catch((err) => console.log(err));
    };


    const handleProfile = (username) => {
        setLoading(true);
        setOpen(true);
        axios
            .get(`${apiUrl}/getAccount/` + username)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    setDataProfile(res.data.Result);
                    setLoading(false);
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    };

    const getStoredTabValue = () => {
        return localStorage.getItem('selectedTabRequest') || '1';
    };

    const setStoredTabValue = (newValue) => {
        localStorage.setItem('selectedTabRequest', newValue);
    };

    useEffect(() => {
        const storedTabValue = getStoredTabValue();
        setValue(storedTabValue);
    }, []);

    const handleSort = (field) => {
        const isAsc = orderBy === field && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(field);
    };

    function sortData(data) {
        return data.slice().sort((a, b) => {
            const fieldA = getFieldToSort(a);
            const fieldB = getFieldToSort(b);

            if (fieldA && fieldB) {
                if (order === "asc") {
                    return fieldA.localeCompare(fieldB);
                } else {
                    return fieldB.localeCompare(fieldA);
                }
            } else {
                return 0;
            }
        });
    }
    function getFieldToSort(item) {
        if (orderBy === "registration_time") {

            return item.registration_time;

        } else {
            return item.username;
        }
    }


    const filteredAccountChordValidatorRequest = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'chord' && userAccount.ban === 'Pending')
    const filteredAccountMusicianRequest = sortData(data)
        .filter((userAccount) => {
            return search.trim() === '' ? userAccount
                : userAccount.username.toLowerCase().includes(search.toLowerCase());
        })
        .filter((userAccount) => userAccount.role === 'musician' && userAccount.ban === 'Pending')

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const currentItemsMusician = filteredAccountMusicianRequest.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesMusician = Math.ceil(filteredAccountMusicianRequest.length / itemsPerPage);

    const currentItemsChordValidator = filteredAccountChordValidatorRequest.slice(indexOfFirstItem, indexOfLastItem);
    const totalPagesChordValidator = Math.ceil(filteredAccountChordValidatorRequest.length / itemsPerPage);
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
                                    textDecoration: 'none', cursor: 'pointer'
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
            <TabContext value={value}>
                <Box sx={{
                    borderBottom: 1,
                    borderColor: 'divider'
                }}>
                    <TabList onChange={handleChange} centered>
                        <Tab label="Chord Validator" value="1" />
                        <Tab label="Musician" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>CHORD VALIDATOR ACCOUNT REQUEST</h3>
                    </div>
                    <div className="px-2 py-4">

                        {isAcceptAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">The account has been approved !</Alert>
                            </Stack>
                        )}
                        {isRejectAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="error">The account has been denied !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountChordValidatorRequest.length === 0 ? (
                                <>

                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: primaryColor }}>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'username'}
                                                            direction={orderBy === 'username' ? order : 'asc'}
                                                            onClick={() => handleSort('username')}
                                                        >
                                                            <b>Username</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Role</b></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'registration_time'}
                                                            direction={orderBy === 'registration_time' ? order : 'asc'}
                                                            onClick={() => handleSort('registration_time')}
                                                        >
                                                            <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b><b>Register date</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Action</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                    {loading ? (
                                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
                                            <div className="spinner-border text-primary" role="status">
                                                <p className="visually-hidden">Loading...</p>
                                            </div>
                                            <p>Loading...</p>
                                        </div>
                                    ) :
                                        <div>
                                            <p className="d-flex justify-content-center" style={{ paddingTop: '50px' }}>No result. Try again !</p>
                                        </div>
                                    }
                                </>
                            ) : (

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead sx={{ backgroundColor: primaryColor }}>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'username'}
                                                        direction={orderBy === 'username' ? order : 'asc'}
                                                        onClick={() => handleSort('username')}
                                                    >
                                                        <b>Username</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Role</b></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'registration_time'}
                                                        direction={orderBy === 'registration_time' ? order : 'asc'}
                                                        onClick={() => handleSort('registration_time')}
                                                    >
                                                        <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b><b>Register date</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Action</b></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                currentItemsChordValidator.map((userAccount, index) => (
                                                    <TableRow key={index} onClick={() => handleProfile(userAccount.username)} style={{ cursor: 'pointer' }}>
                                                        <TableCell><PersonIcon /></TableCell>
                                                        <TableCell>{userAccount.username}</TableCell>
                                                        {userAccount.role === 'chord' &&
                                                            <TableCell>Chord Validator</TableCell>
                                                        }
                                                        <TableCell>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                style={{ width: '100px', textAlign: 'center', backgroundColor: '#28a745', color: '#fff', borderRadius: '40px' }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    ModalConfirm.confirm({
                                                                        title: 'Confirm',
                                                                        content: `Are you sure you want to accept "${userAccount.username}" account - Chord Validator role ?`,
                                                                        onOk() {
                                                                            handleAcceptAccountChordValidator(userAccount.username);
                                                                        },
                                                                        onCancel() {
                                                                            console.log('Cancel');
                                                                        },
                                                                    });
                                                                }}>
                                                                Accept
                                                            </Button>
                                                            <Button
                                                                style={{ width: '100px', textAlign: 'center', backgroundColor: '#dc3545', color: '#fff', marginLeft: '5px', borderRadius: '40px' }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    ModalConfirm.confirm({
                                                                        title: 'Confirm',
                                                                        content: `Are you sure you want to reject "${userAccount.username}" account - Chord Validator role ?`,
                                                                        onOk() {
                                                                            handleRejectAccountChordValidator(userAccount.username);
                                                                        },
                                                                        onCancel() {
                                                                            console.log('Cancel');
                                                                        },
                                                                    });
                                                                }}>
                                                                Decline
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            )
                            }
                            <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPagesChordValidator}
                                    page={currentPage}
                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>

                        </div>
                    </div>
                </TabPanel>


                <TabPanel value="2">
                    <div>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>MUSICIAN ACCOUNT REQUEST</h3>
                    </div>
                    <div className="px-2 py-4">

                        {isAcceptAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="success">The account has been approved !</Alert>
                            </Stack>
                        )}
                        {isRejectAccount && (
                            <Stack sx={{ width: '100%' }} spacing={2} >
                                <Alert severity="error">The account has been denied approval !</Alert>
                            </Stack>
                        )}
                        <div className='mt-4 pd-left'>
                            {filteredAccountMusicianRequest.length === 0 ? (
                                <>

                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: primaryColor }}>
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'username'}
                                                            direction={orderBy === 'username' ? order : 'asc'}
                                                            onClick={() => handleSort('username')}
                                                        >
                                                            <b>Username</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Role</b></TableCell>
                                                    <TableCell>
                                                        <TableSortLabel
                                                            active={orderBy === 'registration_time'}
                                                            direction={orderBy === 'registration_time' ? order : 'asc'}
                                                            onClick={() => handleSort('registration_time')}
                                                        >
                                                            <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b><b>Register date</b>
                                                        </TableSortLabel>
                                                    </TableCell>
                                                    <TableCell><b>Action</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableContainer>
                                    {loading ? (
                                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
                                            <div className="spinner-border text-primary" role="status">
                                                <p className="visually-hidden">Loading...</p>
                                            </div>
                                            <p>Loading...</p>
                                        </div>
                                    ) :
                                        <div>
                                            <p className="d-flex justify-content-center" style={{ paddingTop: '50px' }}>No result. Try again !</p>
                                        </div>
                                    }
                                </>
                            ) : (

                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead sx={{ backgroundColor: primaryColor }}>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'username'}
                                                        direction={orderBy === 'username' ? order : 'asc'}
                                                        onClick={() => handleSort('username')}
                                                    >
                                                        <b>Username</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell><b>Role</b></TableCell>
                                                <TableCell>
                                                    <TableSortLabel
                                                        active={orderBy === 'registration_time'}
                                                        direction={orderBy === 'registration_time' ? order : 'asc'}
                                                        onClick={() => handleSort('registration_time')}
                                                    >
                                                        <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b><b>Register date</b>
                                                    </TableSortLabel>
                                                </TableCell>
                                                <TableCell>Action</TableCell>


                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                currentItemsMusician.map((userAccount, index) => (
                                                    <TableRow key={index} onClick={() => handleProfile(userAccount.username)} style={{ cursor: 'pointer' }}>
                                                        <TableCell><PersonIcon /></TableCell>
                                                        <TableCell>{userAccount.username}</TableCell>
                                                        {userAccount.role === 'musician' &&
                                                            <TableCell>Musician</TableCell>
                                                        }
                                                        <TableCell>{moment(userAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                                style={{ width: '100px', textAlign: 'center', backgroundColor: '#28a745', color: '#fff', borderRadius: '40px' }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    ModalConfirm.confirm({
                                                                        title: 'Confirm',
                                                                        content: `Are you sure you want to accept "${userAccount.username}" account - Musician role ?`,
                                                                        onOk() {
                                                                            handleAcceptAccountMusician(userAccount.username);
                                                                        },
                                                                        onCancel() {
                                                                            console.log('Cancel');
                                                                        },
                                                                    });
                                                                }}>
                                                                Accept
                                                            </Button>
                                                            <Button
                                                                style={{ width: '100px', textAlign: 'center', backgroundColor: '#dc3545', color: '#fff', marginLeft: '5px', borderRadius: '40px' }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    ModalConfirm.confirm({
                                                                        title: 'Confirm',
                                                                        content: `Are you sure you want to reject "${userAccount.username}" account - Musician role ?`,
                                                                        onOk() {
                                                                            handleRejectAccountMusician(userAccount.username);
                                                                        },
                                                                        onCancel() {
                                                                            console.log('Cancel');
                                                                        },
                                                                    });
                                                                }}>
                                                                Decline
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            )}
                            <Stack spacing={2} direction="row" justifyContent="center" mt={3}>
                                <Pagination
                                    count={totalPagesMusician}
                                    page={currentPage}
                                    onChange={(event, value) => setCurrentPage(value)}
                                    color="primary"
                                    size="large"
                                />
                            </Stack>

                        </div>
                    </div>
                </TabPanel>
            </TabContext>
            <Modal
                open={open}
                onClose={() => { setOpen(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    {loading ? (
                        <div className="d-flex flex-column justify-content-center align-items-center" style={{ paddingTop: '50px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <p className="visually-hidden">Loading...</p>
                            </div>
                            <p>Loading...</p>

                        </div>
                    ) :
                        <>
                            {dataProfile.map((viewAccount, index) => {
                                return <div key={index}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ flex: '1 1 auto' }}>Profile - <b>{viewAccount.name}</b></span>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setOpen(false)}></button>
                                    </Typography>
                                    <div className="container rounded bg-white mt-6 mb-5">
                                        <div className="row">
                                            <div className="col-md-4 border-right">
                                                <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                                                        {imageURL && (
                                                            viewAccount.image !== '' ?
                                                                <img className="profile-avatar-account" src={`data:image/png;base64,${viewAccount.image}`} width="150px" />
                                                                :
                                                                <AccountCircleIcon fontSize="large" />
                                                        )}
                                                    </div>
                                                    <span className="text-black-50">{viewAccount.email}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-7 border-right">
                                                <div className="py-5">
                                                    <div className="row mt-2">
                                                        <div className="col-md-6"><b>Name: </b><p>{viewAccount.name}</p></div>
                                                        {viewAccount.surname ?
                                                            <div className="col-md-6"><b>Sur name: </b><p>{viewAccount.surname}</p></div>
                                                            :
                                                            <div className="col-md-6"><b>Sur name: </b><p>None</p></div>

                                                        }
                                                    </div>
                                                    <div className="row mt-2">
                                                        <div className="col-md-6"><label><b>Active: </b></label>
                                                            {viewAccount.ban === 'Enable' ? (
                                                                <p style={{ color: 'green' }}><b>{viewAccount.ban}</b></p>
                                                            ) : (
                                                                <p style={{ color: 'red' }}><b>{viewAccount.ban}</b></p>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6"><label>
                                                            <b className="bi bi-calendar-day text-primary fs-5 pd-right"></b>
                                                            <b>Register date: </b></label><p>{moment(viewAccount.registration_time).format('YYYY/MM/DD - HH:mm:ss')}</p></div>
                                                        <div className="col-md-6"><label><b>Username: </b></label><p>{viewAccount.username}</p></div>
                                                        <div className="col-md-6"><label><b>Role: </b></label><p>{viewAccount.role}</p></div>

                                                        {viewAccount.phoneNumber !== "" ?
                                                            <div className="col-md-12"><b>Phone number: </b><p>{viewAccount.phoneNumber}</p></div>
                                                            : <div className="col-md-12"><b>Phone number: </b><p>None</p></div>
                                                        }
                                                        {viewAccount.address !== "" ?
                                                            <div className="col-md-12"><b>Address Line: </b><p>{viewAccount.address}</p></div>
                                                            :
                                                            <div className="col-md-12"><b>Address Line: </b><p>None</p></div>
                                                        }
                                                        {viewAccount.job !== "" ?
                                                            <div className="col-md-12"><b>Job: </b><p>{viewAccount.job}</p></div>
                                                            :
                                                            <div className="col-md-12"><b>Job: </b><p>None</p></div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </>
                    }
                </Box>
            </Modal>
        </>
    );
}

export default RequestAccountPage;
