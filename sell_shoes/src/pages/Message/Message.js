import classNames from 'classnames/bind';
import styles from './Message.module.scss';
import images from '~/assets/images';
import axios from 'axios';
import Content from './Content';
import Input from './Input';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const cx = classNames.bind(styles);
function Message() {
    const user = useSelector((state) => state.user);
    const socket = useRef();

    const idAdmin = '64be8930f69afd87c7c3d31c';
    const [idRoom, setIdRoom] = useState('');
    const [data, setData] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [active, setActive] = useState(receivedMessage !== null && receivedMessage.roomId === data.roomId);
    const [dataInput, setDataInput] = useState([]);
    const [createRoom, setCreateRoom] = useState({
        firstId: user._id,
        secondId: '',
    });
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleCreate = async () => {
        // e.preventDefault();
        try {
            //   console.log("Creating with Second ID:", selectedResultId);
            //   console.log("ID:", id);
            const dataPost = {
                ...createRoom,
                secondId: idAdmin,
            };
            // setCreateRoom((prev) => ({
            //     ...prev,
            //     secondId: idAdmin,
            // }));
            console.log('createRoom', dataPost);
            const response = await axios.post('http://localhost:3000/api/create/chat', dataPost, {
                headers: {
                    token: `Bearer ${user.accessToken}`,
                },
            });
            console.log('respone', response);
            setIdRoom(response.data._id);
            // setCount(count++9);
        } catch (error) {
            console.error(error);
        }
    };
    console.log('idRoom', idRoom);
    useEffect(() => {
        socket.current = io('http://localhost:8800');
        socket.current.emit('new-add-user', user._id);
        socket.current.on('get-users', (users) => {
            setOnlineUsers(users);
        });
    }, [user, idRoom, open]);
    // Send Message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit('send-message', sendMessage);
        }
    }, [sendMessage]);

    // Get the message from socket server
    useEffect(() => {
        socket.current.on('recieve-message', (data) => {
            console.log('data1', data);
            setReceivedMessage(data);
        });
    }, [sendMessage, user, idRoom, open]);
    useEffect(() => {
        // if (receivedMessage !== null && receivedMessage.chatId === data.roomId) {
        if (receivedMessage !== null && receivedMessage.roomId === data.roomId) {
            // setData([...data, receivedMessage]);
            setData((prevData) => ({
                ...prevData,
                messages: [...prevData.messages, receivedMessage],
            }));
        }
    }, [receivedMessage]);
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/message/${idRoom}`)
            .then((res) => {
                setData(res.data.data);
                console.log('res', res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [open, idRoom, dataInput, receivedMessage, count]);
    useEffect(() => {
        // if (receivedMessage !== null && receivedMessage.roomId === data.roomId) {
        if (data && open === false) {
            // setData((prevData) => ({
            //     ...prevData,
            //     messages: [...prevData.messages, receivedMessage],
            // }));

            // Set active to false when new message is received
            setActive(false);
        }
    }, [receivedMessage, data.roomId]);

    useEffect(() => {
        // Set active to true when handleCreate is clicked
        setActive(true);
    }, [open]);
    console.log('user', data);
    return (
        <div className={cx('wrapper')}>
            <div
                onClick={() => {
                    handleOpen();
                    handleCreate();
                }}
                className={cx('message-btn')}
            >
                <img className={cx('message-img')} alt="hinh anh" src={images.message} />
                <div className={cx('alert-number', { active: active })}></div>
            </div>
            <div className={cx('modal', { active: open })}>
                <div className={cx('body')}>
                    <div className={cx('content')}>
                        <Content data={data} />
                    </div>
                    <div className={cx('action')}>
                        <Input
                            room={data}
                            setDataInput={setDataInput}
                            setSendMessage={setSendMessage}
                            onlineUsers={onlineUsers}
                            idAdmin={idAdmin}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
