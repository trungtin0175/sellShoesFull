import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import Search from '../Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import routes from '~/config/routes';
import { useSelector } from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LengthContext } from '~/App';

const cx = classNames.bind(styles);
function Header() {
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.user.accessToken);
    const [products, setProducts] = useState([]);
    const { lengthCart } = useContext(LengthContext);
    const [alert, setAlert] = useState([]);
    const [lengthAlert, setLengthAlert] = useState(0);
    const [actiive, setActive] = useState(false);
    // const { lengthCart2 } = useContext(Length2Context);
    // const lengthContext = useContext(LengthContext);
    // const lengthCart = lengthContext.lengthCart;
    // console.log('lengthCart', lengthCart);
    console.log(user);
    const navigate = useNavigate();
    const [count, setCount] = useState(null);
    const current = 0;
    useEffect(() => {
        axios
            .all([
                axios.get('http://localhost:3000/api/cart', {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                }),
                axios.get('http://localhost:3000/api/alert/all', {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                }),
            ])

            .then(
                axios.spread((productResponse, alertResponse) => {
                    setProducts(productResponse.data.data);
                    setAlert(alertResponse.data.data);
                    const unreadAlerts = alertResponse.data.data.filter((item) => !item.read);
                    setLengthAlert(unreadAlerts.length);
                    // setCount(response.data.data);
                    // current = current++;
                }),
            )
            .catch((error) => {
                console.log(error);
            });
    }, [lengthCart, actiive, token]);
    console.log('alert', alert);
    console.log('lengthalert', lengthAlert);
    // setCount(!count);
    console.log('123', products);
    const handleRead = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/alert/read/${id}`,
                { read: true },
                {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                },
            );
            setActive(true);
        } catch (error) {
            console.log(error);
        }
    };
    console.log('active', actiive);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to={config.routes.home} className={cx('logo-link')}>
                        <img className={cx('logo-img')} src={images.logo} alt="Logo"></img>
                    </Link>
                    <h4 className={cx('logo-title')}>Không Đẹp Hoàn Tiền!</h4>
                </div>
                <Search />
                <div className={cx('actions')}>
                    <Link to={user.email ? config.routes.cart : config.routes.login} className={cx('cart')}>
                        <div className={cx('action-icon')}>
                            <FontAwesomeIcon icon={faCartShopping} />
                        </div>
                        <div className={cx('action-name')}>Giỏ hàng</div>
                        {/* <div className={cx('action-number')}>{products[0]?.detail_cart.length || 0}</div> */}
                        <div className={cx('action-number')}>{products?.length || 0}</div>
                    </Link>
                    <div className={cx('cart')}>
                        <div className={cx('action-icon')}>
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <ul className={cx('bell-list')}>
                            <h3 className={cx('bell-list-header')}>Thông báo</h3>
                            <div className={cx('bell-list-wrapper')}>
                                {Array.isArray(alert) && alert.length !== 0 ? (
                                    alert.map((item, index) => (
                                        <li
                                            onClick={() => handleRead(item._id)}
                                            key={index}
                                            className={cx('bell-item')}
                                        >
                                            <Link
                                                to={config.routes.order}
                                                className={cx('bell-item-link', { active: !item.read })}
                                            >
                                                <h3 className={cx('bell-item-status')}>{item.title}</h3>
                                                <p className={cx('bell-item-content')}>{item.message}</p>
                                                <p className={cx('bell-item-time')}>{item.createAt}</p>
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <p className={cx('bell-item-no')}>Bạn không có thông báo nào</p>
                                )}
                            </div>
                        </ul>
                        <div className={cx('action-name')}>Thông báo</div>
                        <div className={cx('alert-number')}>{lengthAlert}</div>
                    </div>
                    {user.email ? (
                        <Link to={config.routes.profile} className={cx('user')}>
                            <div className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={cx('action-name')}>Tài khoản</div>
                        </Link>
                    ) : (
                        <Link to={config.routes.login} className={cx('user')}>
                            <div className={cx('action-icon')}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className={cx('action-name')}>Đăng nhập</div>
                            {/* <li className={cx('bell-item')}>
                                        <Link to={config.routes.order} className={cx('bell-item-link')}>
                                            <h3 className={cx('bell-item-status')}>Đơn hàng đã vận chuyển</h3>
                                            <p className={cx('bell-item-content')}>
                                                Đơn hàng của bạn đã được chuyển đi
                                            </p>
                                            <p className={cx('bell-item-time')}>20/8 3:13</p>
                                        </Link>
                                    </li>
                                    <li className={cx('bell-item')}>
                                        <Link to={config.routes.order} className={cx('bell-item-link')}>
                                            <h3 className={cx('bell-item-status')}>Đơn hàng đã vận chuyển</h3>
                                            <p className={cx('bell-item-content')}>
                                                Đơn hàng của bạn đã được chuyển đi
                                            </p>
                                            <p className={cx('bell-item-time')}>20/8 3:13</p>
                                        </Link>
                                    </li>
                                    <li className={cx('bell-item')}>
                                        <Link to={config.routes.order} className={cx('bell-item-link')}>
                                            <h3 className={cx('bell-item-status')}>Đơn hàng đã vận chuyển</h3>
                                            <p className={cx('bell-item-content')}>
                                                Đơn hàng của bạn đã được chuyển đi
                                            </p>
                                            <p className={cx('bell-item-time')}>20/8 3:13</p>
                                        </Link>
                                    </li> */}
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
