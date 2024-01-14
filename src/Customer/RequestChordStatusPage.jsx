
import SearchAppBar from '../component/SearchAppBar';
import { Space, Table, Button, message, Modal } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom'


function RequestChordStatusPage() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = sessionStorage.getItem('token');
    const userId = token.split(':')[0];
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const handleDelete = async (recordId) => {
        try {
            const response = await axios.delete(`${apiUrl}/deleteRequestChord/${recordId}`);

            if (response.data.Status === 'Success') {
                setOrderData((prevOrderData) => prevOrderData.filter(item => item.id !== recordId));
                message.success('Request deleted successfully');
            } else {
                message.error('Failed to delete request');
            }
        } catch (error) {
            message.error('An error occurred while deleting the request');
        }
    };
    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'id',
            width: 120,
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
            title: 'Musician ID',
            dataIndex: 'musician_id',
            render: (text) => (
                <Space size="middle">
                    {text ? text : 'Waiting for the recipient...'}
                </Space>
            ),
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
                                <span style={{ width: '100px', textAlign: 'left' }}>
                                    In process...
                                </span>
                            ) : text === 2 ? (
                                <span style={{ width: '200px', textAlign: 'left' }}>
                                    Being completed...
                                </span>
                            ) : null
                            }
                        </>
                    )}
                </Space>
            ),
            width: 200,
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="primary" style={{ borderRadius: '40px' }}>
                        <Link to={`/viewRequestChord/${record.id}`} style={{ textDecoration: 'none' }}>View</Link>
                    </Button>
                    {record.status === 1 &&
                        <Button
                            onClick={() => {
                                Modal.confirm({
                                    title: 'Confirm Deletion',
                                    content: 'Are you sure you want to delete this request?',
                                    onOk() {
                                        handleDelete(record.id);
                                    },
                                    onCancel() {
                                        console.log('Cancel');
                                    },
                                });
                            }}
                            type="primary"
                            danger
                            style={{ borderRadius: '40px' }}
                        >
                            Delete
                        </Button>
                    }
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
export default RequestChordStatusPage;