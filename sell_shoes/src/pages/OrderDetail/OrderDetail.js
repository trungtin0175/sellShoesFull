import styles from './OrderDetail.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import routes from '~/config/routes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHourglass,
    faHourglassStart,
    faNewspaper,
    faSquareCheck,
    faStar,
    faTruck,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function OrderDetail() {
    const token = useSelector((state) => state.user.accessToken);
    const [data, setData] = useState([]);
    const [alert, setAlert] = useState([]);
    const [confirmed, setConfirmed] = useState('');
    const { _id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/order/detail/${_id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setData(response.data.data);
                console.log('response.data', response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/alert/all', {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setAlert(response.data.data);
                const messageAlert = response.data.data.map((id) => id.message);
                // console.log(
                //     'response',
                //     response.data.data.map((id) => id.message),
                // );
                response.data.data.map((ale) => {
                    const alertIdMatch = ale.message.match(/(\d+)/);
                    const alertId = alertIdMatch ? alertIdMatch[0] : null;
                    console.log('alertId', alertId);
                });
            })
            .catch((res) => {
                console.log(res);
            });
    }, []);
    useEffect(() => {
        // Lọc các phần tử trong mảng alert có id_order trùng với _id của mảng data
        const filteredAlerts = alert.filter((alertItem) => {
            return alertItem?.id_order === data[0]?._id;
        });
        setConfirmed(filteredAlerts);
        console.log('filteredAlerts', filteredAlerts);
        // alert.map((ale) => console.log('ale', ale));
    }, [data, alert]);
    console.log('data', data);
    console.log('Alert', alert);
    console.log('confirm', confirmed);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-text')}>Chi tiết đơn hàng của tôi</h3>
                <Link to={config.routes.home} className={cx('cart-btn')}>
                    Tiếp tục mua sắm!
                </Link>
            </div>
            {Array.isArray(data) && data.length !== 0 ? (
                data.map((pro, index) => (
                    <div className={cx('information')} key={index}>
                        <div className={cx('address')}>
                            <div className={cx('address-heading')}>
                                <h3 className={cx('address-header')}>THÔNG TIN NGƯỜI NHẬN</h3>
                                <p className={cx('address-time')}>{pro.dateOrder}</p>
                            </div>
                            <div className={cx('address-content')}>
                                <h3 className={cx('address-content-name')}>Tên người nhận: {pro.id_note.fullname}</h3>
                                <p className={cx('address-content-tel')}>SĐT: {pro.id_note.phone}</p>
                                <p className={cx('address-content-add')}>Địa chỉ: {pro.adress}</p>
                                <p className={cx('address-content-payment')}>{pro.id_payment.payName}</p>
                            </div>
                        </div>
                        <div className={cx('order-status')}>
                            <div
                                className={cx('order-status--wrapper', {
                                    active:
                                        pro.status === 'Pending' ||
                                        pro.status === 'Đã xác nhận' ||
                                        pro.status === 'Đợi lấy hàng' ||
                                        pro.status === 'Đang giao' ||
                                        pro.status === 'Đã giao',
                                })}
                            >
                                <div
                                    className={cx('order-status--icon', {
                                        active:
                                            pro.status === 'Pending' ||
                                            pro.status === 'Đã xác nhận' ||
                                            pro.status === 'Đợi lấy hàng' ||
                                            pro.status === 'Đang giao' ||
                                            pro.status === 'Đã giao',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faNewspaper} />
                                </div>
                                <div className={cx('order-status--info')}>
                                    <h3 className={cx('order-status--name')}>Đơn hàng đã cài đặt</h3>
                                    <p className={cx('order-status--time')}>{pro.dateOrder}</p>
                                </div>
                            </div>
                            <div
                                className={cx('order-status--wrapper', {
                                    active:
                                        pro.status === 'Đã xác nhận' ||
                                        pro.status === 'Đợi lấy hàng' ||
                                        pro.status === 'Đang giao' ||
                                        pro.status === 'Đã giao',
                                })}
                            >
                                <div
                                    className={cx('order-status--icon', {
                                        active:
                                            pro.status === 'Đã xác nhận' ||
                                            pro.status === 'Đợi lấy hàng' ||
                                            pro.status === 'Đang giao' ||
                                            pro.status === 'Đã giao',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                </div>
                                <div className={cx('order-status--info')}>
                                    <h3 className={cx('order-status--name')}>Đã xác nhận đơn hàng</h3>
                                    <p className={cx('order-status--time')}>
                                        {confirmed[0]?.createAt ? confirmed[0].createAt : 'Dự kiến'}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={cx('order-status--wrapper', {
                                    active:
                                        pro.status === 'Đợi lấy hàng' ||
                                        pro.status === 'Đang giao' ||
                                        pro.status === 'Đã giao',
                                })}
                            >
                                <div
                                    className={cx('order-status--icon', {
                                        active:
                                            pro.status === 'Đợi lấy hàng' ||
                                            pro.status === 'Đang giao' ||
                                            pro.status === 'Đã giao',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faHourglassStart} />
                                </div>
                                <div className={cx('order-status--info')}>
                                    <h3 className={cx('order-status--name')}>Đang chờ lấy hàng</h3>
                                    <p className={cx('order-status--time')}>
                                        {confirmed[1]?.createAt ? confirmed[1].createAt : 'Dự kiến'}
                                    </p>
                                </div>
                            </div>
                            <div
                                className={cx('order-status--wrapper', {
                                    active: pro.status === 'Đang giao' || pro.status === 'Đã giao',
                                })}
                            >
                                <div
                                    className={cx('order-status--icon', {
                                        active: pro.status === 'Đang giao' || pro.status === 'Đã giao',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faTruck} />
                                </div>
                                <div className={cx('order-status--info')}>
                                    <h3 className={cx('order-status--name')}>Đang giao hàng</h3>
                                    <p className={cx('order-status--time')}>
                                        {confirmed[2]?.createAt ? confirmed[2].createAt : 'Dự kiến'}
                                    </p>
                                </div>
                            </div>
                            <div className={cx('order-status--wrapper', { active: pro.status === 'Đã giao' })}>
                                <div className={cx('order-status--icon', { active: pro.status === 'Đã giao' })}>
                                    <FontAwesomeIcon icon={faStar} />
                                </div>
                                <div className={cx('order-status--info')}>
                                    <h3 className={cx('order-status--name')}>Đã giao thành công</h3>
                                    <p className={cx('order-status--time')}>
                                        {confirmed[3]?.createAt ? confirmed[3].createAt : 'Dự kiến'}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('content')}>
                                <div className={cx('content-top')}>
                                    <div className={cx('content-column')}>
                                        {pro.orderProducts.map((orderPro, index) => (
                                            <div key={index} className={cx('content-item')}>
                                                <div className={cx('content-left')}>
                                                    <div className={cx('content-img')}>
                                                        <img
                                                            src={orderPro.id_product.image[0]}
                                                            alt="image"
                                                            className={cx('content-image')}
                                                        ></img>
                                                    </div>
                                                    <div className={cx('body')}>
                                                        <h3 className={cx('body-name')}>
                                                            {orderPro.id_product.name_product}
                                                        </h3>
                                                        <div className={cx('body-action')}>
                                                            <p className={cx('body-action-quantity')}>
                                                                x{orderPro.quantity}
                                                            </p>
                                                            <p className={cx('body-action-size')}>
                                                                size: {orderPro.size}
                                                            </p>
                                                            <p className={cx('body-action-price')}>
                                                                {orderPro.unit_price.toLocaleString()} VNĐ
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={cx('content-right')}>
                                        {/* <p className={cx('content-method')}>{data.method}</p> */}
                                        <div className={cx('status')}>
                                            <span className={cx('status-post')}>{pro.status}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('content-bottom')}>
                                    <p className={cx('content-bottom-price')}> {pro.totalPrice.toLocaleString()} VNĐ</p>
                                    Tổng tiền:
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className={cx('no-product')}>Bạn chưa mua sản phẩm nào!</div>
            )}
        </div>
    );
}

export default OrderDetail;
