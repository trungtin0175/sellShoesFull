import classNames from 'classnames/bind';
import styles from './Input.module.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Input({ room, setDataInput, setSendMessage, onlineUsers, idAdmin }) {
    const user = useSelector((state) => state.user);
    console.log('user', user);
    const [data, setData] = useState({
        roomId: room.roomId,
        senderId: user._id,
        content: '',
    });
    const [dataImage, setDataImage] = useState({
        roomId: room.roomId,
        senderId: user._id,
        image: [],
    });
    const [selectedFileName, setSelectedFileName] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        // setData({
        //   ...data,
        //   [name]: value,
        // });
        setData((prevData) => ({
            ...prevData,
            [name]: value,
            roomId: room.roomId, // Đảm bảo cập nhật roomId từ room
        }));
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedFileName(file.name);
            setDataImage({ ...dataImage, image: file });
        }
        console.log('file', file);
    };
    useEffect(() => {
        // Update roomId in dataImage when room changes
        setDataImage((prevData) => ({
            ...prevData,
            roomId: room.roomId,
        }));
    }, [room.roomId]);
    const handleSend = async (e) => {
        e.preventDefault();

        try {
            console.log('data', data);
            console.log('dataimage', dataImage);
            if (data.content !== '') {
                const respone = await axios.post('http://localhost:3000/api/send/message', data);
                setData((prevData) => ({
                    ...prevData,
                    content: '',
                }));
                setDataInput(respone.data);
            }
            if (dataImage.image instanceof File) {
                const formData = new FormData();
                formData.append('roomId', dataImage.roomId);
                formData.append('senderId', dataImage.senderId);
                formData.append('image', dataImage.image);
                const respone = await axios.post('http://localhost:3000/api/send/message', formData);
                console.log('image', respone.data.data);
                setDataImage((prev) => ({
                    ...prev,
                    image: [],
                }));
                setSelectedFileName('');
                setDataInput(respone.data);
            }
        } catch (error) {
            console.log(error);
        }
        const receiverUser = onlineUsers?.find((user) => user.userId !== user._id);
        // const receiverId = receiverUser ? receiverUser.userId : null;
        const receiverId = idAdmin;
        console.log('receiverId', receiverId);
        setSendMessage({ ...data, receiverId });
        console.log('onlineUser', onlineUsers);
    };
    return (
        <div className={cx('wrapper')}>
            <textarea
                className={cx('input')}
                name="content"
                value={data.content}
                onChange={handleChange}
                type="text"
                placeholder="Nhập nội dung"
                rows={1} // Số hàng tối thiểu hiển thị ban đầu
                wrap="hard"
            />
            {/* <div className={cx('icon-with-input')}> */}
            <label htmlFor="image" className={cx('icon-with-input')}>
                <FontAwesomeIcon icon={faImage} />
                <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleImageChange}
                    accept="png, jpg"
                    style={{ display: 'none' }}
                />
            </label>
            {/* {selectedFileName && <span className={cx('selected-file-name')}>{selectedFileName}</span>} */}
            {selectedFileName && typeof selectedFileName === 'string' && (
                <span className={cx('selected-file-name')}>{selectedFileName}</span>
            )}
            {/* </div> */}
            <div className={cx('send')} onClick={handleSend}>
                <button className={cx('send-btn')}>Send</button>
            </div>
        </div>
    );
}

export default Input;
