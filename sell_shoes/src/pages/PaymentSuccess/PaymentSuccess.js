import classNames from 'classnames/bind';
import styles from './PaymentSuccess.module.scss';
import images from '~/assets/images';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clear } from '../../redux/orderPaymentSlice';

const cx = classNames.bind(styles);

function PaymentSuccess() {
    const token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();
    const { OrderPayment } = useSelector((state) => state.orderPayment);
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/order/create', OrderPayment, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            dispatch(clear());
            navigate(config.routes.order);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <img src={images.iconthanhcong} alt="success" className={cx('success-img')} />
            <h1 className={cx('success-title')}>Thanh toán thành công !</h1>
            <button onClick={() => handleSubmit()} className={cx('success-btn')}>
                Chuyển tới đơn hàng của bạn !
            </button>
        </div>
    );
}

export default PaymentSuccess;
