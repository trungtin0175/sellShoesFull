import styles from '../Action/Action.module.scss';
import classNames from 'classnames/bind';
import { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { LengthContext } from '~/App';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ActionAdd({ dataCart }) {
    const token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();

    // console.log(token);
    const { id_product, quantity, size } = dataCart;
    const { setLengthCart } = useContext(LengthContext);
    // console.log(dataCart);

    const handleAdd = async (e) => {
        if (!token) {
            navigate(config.routes.login);
            return;
        }
        const sizeValue = size;
        e.preventDefault();
        try {
            const payload = {
                id_product: id_product,
                quantity: quantity,
                size: sizeValue,
            };
            const response = await axios.post('http://localhost:3000/api/add_to_cart', payload, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            setLengthCart(response.data.length);
            const jsonData = response.data;
            console.log('payload', payload);
            toast.success('Thêm sản phẩm thành công', {
                autoClose: 1000,
            });
            // dispatch(addToCart(dataCart));
        } catch (error) {
            console.error(error);
            toast.error('Thất bại, vui lòng kiểm tra lại kết nối!');
        }
    };
    console.log('dataCart', dataCart);
    return (
        <div className={cx('wrapper')}>
            <div onClick={handleAdd} className={cx('add-btn')}>
                <FontAwesomeIcon icon={faCartShopping} />
                Thêm vào giỏ hàng
            </div>
            <ToastContainer />
        </div>
    );
}

export default ActionAdd;
