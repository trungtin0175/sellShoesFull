import classNames from 'classnames/bind';
import styles from './ChangeProfile.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/redux/userSlice';

const cx = classNames.bind(styles);
function ChangeProfile({ userId }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.accessToken);
    const [infoUser, setInfoUser] = useState({
        fullname: '',
        numberphone: '',
    });
    const inputRef = useRef();
    const handleClear = () => {
        inputRef.current.reset();
    };
    const handleClearAll = () => {
        setInfoUser({
            fullname: '',
            numberphone: '',
        });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfoUser({ ...infoUser, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', infoUser.fullname);
        formData.append('numberphone', infoUser.numberphone);
        console.log('formdata', formData.fullname);
        // console.log('formdata2', formData.fullname);
        try {
            const response = await axios.put(
                `http://localhost:3000/api/user/account/edit/${userId}`,
                {
                    fullname: formData.get('fullname'),
                    numberphone: formData.get('numberphone'),
                },
                {
                    headers: {
                        token: `Bearer ${user}`,
                    },
                },
            );
            toast.success('Thay đổi thành công!', {
                autoClose: 1000,
            });
            console.log('respone', response.data.data);
            // dispatch(updateUser(response.data));
            handleClearAll();
            // return response.data;
        } catch (error) {
            console.error(error);
            toast.error('Thất bại, vui lòng kiểm tra lại kết nối!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Thay đổi thông tin của bạn</h3>
            <div className={cx('body')}>
                <form ref={inputRef} onSubmit={handleSubmit} className={cx('form')} id="form-1">
                    <div className={cx('form-group')}>
                        <label htmlFor="fullname" className={cx('form-label')}>
                            Tên Đầy đủ
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            name="fullname"
                            value={infoUser.fullname}
                            onChange={handleInputChange}
                            placeholder="Nhập tên của bạn"
                            className={cx('form-control')}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="numberphone" className={cx('form-label')}>
                            Số điện thoại của bạn
                        </label>
                        <input
                            id="numberphone"
                            type="text"
                            placeholder="Nhập số điện thoại"
                            name="numberphone"
                            className={cx('form-control')}
                            onChange={handleInputChange}
                            value={infoUser.numberphone}
                        />
                    </div>
                    <button className={cx('form-submit')}>Sửa đổi</button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default ChangeProfile;
