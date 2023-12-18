import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logOut, registerUser } from '~/services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { resetUser } from '~/redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import config from '~/config';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import ChangeProfile from './ChangeProfile';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Profile() {
    const { id } = useParams();
    // const [user, setUser] = useState({});
    const user = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    console.log('id', user._id);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        dispatch(resetUser());
        navigate('/');
    };
    const handleChange = () => {
        setOpen(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-wrapper')}>
                    <h4 className={cx('name')}>Hồ sơ của tôi</h4>
                    <span className={cx('name-title')}>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                </div>
                <div className={cx('order-wrapper')}>
                    <Link to={config.routes.order} className={cx('order-link')}>
                        <FontAwesomeIcon className={cx('order-icon')} icon={faBagShopping} />
                        <p className={cx('order-text')}>Đơn hàng của tôi</p>
                    </Link>
                </div>
            </div>
            <div className={cx('body')}>
                <div className="image">
                    <img
                        className={cx('img')}
                        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONMpTVitnj-onZXLRtC3zeGulSoco33oo-r78JyvtlA&s"
                        src={images.user}
                        alt="product"
                    />
                    {/* <div className={cx('form-group')}>
                        <label htmlFor="myfile" className={cx('form-label')}>
                            Đổi ảnh đại diện của bạn:
                        </label>
                        <input id="myfile" name="myfile" type="file" className={cx('form-control')} accept="image/*" />
                    </div> */}
                </div>
                <div className={cx('info')}>
                    <div className={cx('info-group')}>
                        <span className={cx('info-title')}>Tên đầy đủ: </span>
                        <p className={cx('info-describe')}>{user?.fullname}</p>
                    </div>
                    <div className={cx('info-group')}>
                        <span className={cx('info-title')}>Số điện thoại: </span>
                        <p className={cx('info-describe')}>{user?.numberphone}</p>
                    </div>
                    <div className={cx('info-group')}>
                        <span className={cx('info-title')}>Email: </span>
                        <p className={cx('info-describe')}>{user?.email}</p>
                    </div>
                    <button onClick={handleChange} className={cx('change')}>
                        Đổi thông tin tài khoản
                    </button>
                </div>
                <Modal
                    // title="Thay đổi sản phẩm"
                    centered
                    open={open}
                    footer={null}
                    // onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={1000}
                    style={{ marginTop: 30 }}
                >
                    <ChangeProfile userId={user._id} />
                </Modal>
            </div>
            <button onClick={handleLogout} className={cx('logout')}>
                Đăng xuất
            </button>
        </div>
    );
}

export default Profile;
