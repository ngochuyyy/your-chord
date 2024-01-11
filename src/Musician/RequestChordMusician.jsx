
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';


function RequestChordMusician() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'id',
            width: 100,
        },
        {
            title: 'Username',
            dataIndex: 'user_id',
        },

        {
            title: 'Song name',
            dataIndex: 'song_name',
        },
        {
            title: 'Date request',
            dataIndex: 'request_date',
            render: (text) => (
                <Space size="middle">
                    {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                </Space>
            ),
            width: 200,

        },
        {
            title: 'Date completed',
            dataIndex: 'completed_date',
            render: (text) => (
                <Space size="middle">
                    {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                </Space>
            ),
            width: 200,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <Space size="middle">
                    {record.status === 3 ? (
                        <button className='btn-accept'>
                            Completed
                        </button>
                    ) :
                        record.status === 0 ? (
                            <button className='btn-decline'>
                                Declined
                            </button>
                        ) : record.status === 2 ? (
                            <button style={{
                                width: "100px",
                                border: "transparent",
                                backgroundColor: "yellow",
                                borderRadius: "16px",
                                padding: "3px 10px",
                            }}>
                                Do task
                            </button>
                        ) : (
                            <>
                                <Button className='btn-accept' onClick={() => handleAccept(record.id)}>
                                    Accept
                                </Button>
                                {/* <Button className='btn-decline' onClick={() => handleDecline(record.id)}>
                                    Reject
                                </Button> */}
                            </>
                        )
                    }
                </Space>
            ),
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ borderRadius: '40px' }}>
                        <Link to={`/viewRequestChordMusician/${record.id}`} style={{ textDecoration: 'none', cursor: 'pointer' }}>View</Link>
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/getRequestChord`);
                if (response.data.Status === 'Success') {
                    const filteredData = response.data.data.filter(item => item.musician_id === userId || item.musician_id === null);
                    setOrderData(filteredData);
                } else {
                    console.error('Failed to fetch order data:', response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [userId, apiUrl]);

    const handleAccept = (itemId) => {
        axios
            .put(`${apiUrl}/acceptRequestChord/${itemId}/${userId}`)
            .then((res) => {
                if (res.data.Status === 'Success') {
                    window.location.reload(true);
                }
            })
            .catch((err) => console.log(err));
    };

    // const handleDecline = (itemId) => {
    //     axios
    //         .put(`${apiUrl}/declineRequestChord/${itemId}/${userId}`)
    //         .then((res) => {
    //             if (res.data.Status === 'Success') {
    //                 window.location.reload(true);
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // };
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
                <div className='d-flex flex-column pt-2'>
                    <div className='d-flex flex-column pt-4'>
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Receive Order</h3>
                    </div>
                    <div style={{ width: '90%', margin: '0 auto' }}>
                        <Table
                            columns={columns}
                            dataSource={orderData.map(item => ({
                                key: item.id,
                                id: item.id,
                                user_id: item.user_id,
                                genre: item.genre,
                                artist_name: item.artist_name,
                                status: item.status,
                                song_name: item.song_name,
                                request_date: item.request_date,
                                completed_date: item.completed_date,

                            }))}
                        />
                    </div>
                </div>
            }
        </>
    );
}
export default RequestChordMusician;