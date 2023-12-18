import styles from './Order.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import config from '~/config';
import routes from '~/config/routes';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

// const data = [
//     {
//         _id: 1,
//         orderProduct: [
//             {
//                 id: 1,
//                 img: 'https://res.cloudinary.com/dgczeeypr/image/upload/v1691132026/BanGiay/juss6nurwh3rc17enipw.jpg',
//                 name: 'Vans Old Skool Classic Blackádgsdgsdfg đậpVans Old Skool Classic Blackádgsdgsdfg đậpVans Old Skool Classic Blackádgsdgsdfg đập',
//                 quantity: 1,
//                 size: 39,
//                 price: 1000000,
//                 // method: 'VNPAY',
//             },
//             {
//                 id: 2,
//                 img: 'https://res.cloudinary.com/dgczeeypr/image/upload/v1691132026/BanGiay/juss6nurwh3rc17enipw.jpg',
//                 name: 'Vans Old Skool Classic Blackádgsdgsdfg đập',
//                 quantity: 1,
//                 size: 39,
//                 price: 1000000,
//             },
//         ],
//         method: 'VNPAY',
//         address: 'Quận 12 thành phố hồ chí minh',
//         status: 'Đang chuyển',
//         dateOrder: '12/08/2023 09:10',
//     },
//     {
//         _id: 2,
//         orderProduct: [
//             {
//                 id: 1,
//                 img: 'https://res.cloudinary.com/dgczeeypr/image/upload/v1691132026/BanGiay/juss6nurwh3rc17enipw.jpg',
//                 name: 'Vans Old Skool Classic Blackádgsdgsdfg đập',
//                 quantity: 1,
//                 size: 39,
//                 price: 1000000,
//             },
//         ],
//         method: 'VNPAY',
//         address: 'Quận 12 thành phố hồ chí minh',
//         status: 'Đang chuyển',
//         dateOrder: '12/08/2023 09:10',
//     },
// ];
function Order() {
    const token = useSelector((state) => state.user.accessToken);
    const [data, setData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [activeColor, setActiveColor] = useState('Tất cả');
    const [count, setCount] = useState(null);

    console.log('data', data);
    console.log('newData', newData);
    useEffect(() => {
        setNewData([...data]);
    }, [data]);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/user/purchase', {
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
    }, [count]);
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/order/delete/${id}`, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            setCount(response);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAll = () => {
        setActiveColor('Tất cả');
        setNewData(data);
    };
    const handleSpending = () => {
        setActiveColor('Đang chờ');
        const Orders = data.filter((item) => item.status === 'Pending');
        setNewData(Orders);
    };
    const handleConfirm = () => {
        setActiveColor('Đã xác nhận');
        const Orders = data.filter((item) => item.status === 'Đã xác nhận');
        setNewData(Orders);
    };
    const handleWaiting = () => {
        setActiveColor('Đợi lấy hàng');
        const Orders = data.filter((item) => item.status === 'Đợi lấy hàng');
        setNewData(Orders);
    };
    const handleDelivering = () => {
        setActiveColor('Đang giao');
        const Orders = data.filter((item) => item.status === 'Đang giao');
        setNewData(Orders);
    };
    const handleDelivered = () => {
        setActiveColor('Đã giao');
        const Orders = data.filter((item) => item.status === 'Đã giao');
        setNewData(Orders);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('header-text')}>Các đơn hàng của tôi</h3>
                <Link to={config.routes.home} className={cx('cart-btn')}>
                    Tiếp tục mua sắm!
                </Link>
            </div>
            <div className={cx('classify')}>
                <button onClick={handleAll} className={cx('classify-btn', { active: activeColor === 'Tất cả' })}>
                    Tất cả
                </button>
                <button onClick={handleSpending} className={cx('classify-btn', { active: activeColor === 'Đang chờ' })}>
                    Đang chờ
                </button>
                <button
                    onClick={handleConfirm}
                    className={cx('classify-btn', { active: activeColor === 'Đã xác nhận' })}
                >
                    Đã xác nhận
                </button>
                <button
                    onClick={handleWaiting}
                    className={cx('classify-btn', { active: activeColor === 'Đợi lấy hàng' })}
                >
                    Đợi lấy hàng
                </button>
                <button
                    onClick={handleDelivering}
                    className={cx('classify-btn', { active: activeColor === 'Đang giao' })}
                >
                    Đang giao
                </button>
                <button onClick={handleDelivered} className={cx('classify-btn', { active: activeColor === 'Đã giao' })}>
                    Đã giao
                </button>
            </div>
            <div className={cx('content-wrapper')}>
                {Array.isArray(newData) && newData.length !== 0 ? (
                    newData.map((pro, index) => (
                        <div key={index} className={cx('content')}>
                            {/* <Link key={index} to={config.routes.orderDetail}> */}
                            <Link key={index} to={`/api/order/detail/${pro._id}`}>
                                <div className={cx('content-top')}>
                                    <div className={cx('content-column')}>
                                        {Array.isArray(pro.orderProducts) && pro.orderProducts.length !== 0 ? (
                                            pro.orderProducts.map((orderPro, index) => (
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
                                            ))
                                        ) : (
                                            <div className={cx('no-product')}>Bạn chưa mua sản phẩm nào!</div>
                                        )}
                                    </div>
                                    <div className={cx('content-right')}>
                                        {/* <p className={cx('content-method')}>{pro.method}</p> */}
                                        <div className={cx('status')}>
                                            <span className={cx('status-post')}>{pro.status}</span>
                                        </div>
                                        {/* {pro.status === 'Pending' ? (
                                            <div onClick={() => handleDelete(pro._id)} className={cx('delete')}>
                                                Xóa
                                            </div>
                                        ) : (
                                            <></>
                                        )} */}
                                    </div>
                                </div>
                                <div className={cx('content-bottom')}>
                                    <p className={cx('content-bottom-price')}> {pro.totalPrice.toLocaleString()} VNĐ</p>
                                    Tổng tiền:
                                </div>
                            </Link>
                            {pro.status === 'Pending' ? (
                                <div onClick={() => handleDelete(pro._id)} className={cx('delete')}>
                                    Xóa
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))
                ) : (
                    <div className={cx('no-product')}>Không có sản phẩm nào!</div>
                )}
            </div>
        </div>
    );
}

export default Order;
