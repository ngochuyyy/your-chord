
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Button } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom'


function RequestChordStatus() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'id',
            width: 150,
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
            width: 250,

        },
        {
            title: 'Date completed',
            dataIndex: 'completed_date',
            render: (text) => (
                <Space size="middle">
                    {text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : 'N/A'}
                </Space>
            ),
            width: 250,
        },
        {
            title: 'Musician ID',
            dataIndex: 'musician_id',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => (
                <Space size="middle">
                    {text === 3 && record.price !== null ? (
                        <button className='btn-accept'>
                            Completed
                        </button>
                    ) : (
                        <>
                            {text === 1 ? (
                                <p style={{ width: '100px', textAlign: 'left' }}>
                                    In process...
                                </p>
                            ) : text === 2 ? (
                                <p style={{ width: '200px', textAlign: 'left' }}>
                                    Being completed...
                                </p>
                            ) : text === 0 ? (
                                <button className='btn-decline' style={{ width: '100px', textAlign: 'left' }}>
                                    Declined
                                </button>
                            ) : null
                            }
                        </>
                    )}
                </Space>
            ),
            width: 150,

        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ borderRadius: '40px' }}>
                        <Link to={`/viewRequestChord/${record.id}`} style={{ textDecoration: 'none' }}>View</Link>
                    </Button>
                </Space >
            ),
        },
    ];
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/getRequestChord`);

                if (response.data.Status === 'Success') {
                    const userOrders = response.data.data.filter(item => item.user_id === userId);
                    setOrderData(userOrders);
                } else {
                    console.error('Failed to fetch order data:', response.data.Error);
                }
            } catch (error) {
                console.error('Error fetching order data:', error.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchOrderData();
    }, [userId]);

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
                        <h3 className="d-flex justify-content-center" style={{ color: '#0d6efd', fontWeight: 'bold' }}>Request Chord Status</h3>
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
                                musician_id: item.musician_id,

                            }))}
                        />


                        <Button type="primary" style={{ borderRadius: '40px' }}>
                            <Link to={`/requestChord/${userId}`} style={{ textDecoration: 'none' }}>Add new request</Link>
                        </Button>

                    </div>

                </div>

            }
        </>
    );
}
export default RequestChordStatus;