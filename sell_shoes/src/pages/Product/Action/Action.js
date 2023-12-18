import styles from './Action.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { useState, useContext, useEffect } from 'react';
import ActionBuy from '~/pages/Product/ActionBuy';
import ActionAdd from '~/pages/Product/ActionAdd';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import config from '~/config';
import { ProductContext } from '~/layouts/HeaderOnly/HeaderOnly';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LengthContext } from '~/App';
import { IdCartItemContext } from '~/layouts/HeaderOnly/HeaderOnly';

const cx = classNames.bind(styles);
// const size = [35, 36, 37, 38, 39];

function Action({ products, productInSale }) {
    const token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    // console.log(token);
    const [activeSize, setActiveSize] = useState(null);
    const [changeNum, setChangeNum] = useState(1);
    const [dataCart, setDataCart] = useState({
        id_product: products._id,
        quantity: 1,
        size: null,
    });
    const { setProductCart } = useContext(ProductContext);
    const { setLengthCart } = useContext(LengthContext);
    const { setIdCartItem } = useContext(IdCartItemContext);
    const sale = (((products.oldPrice_product - products.newPrice_product) / products.oldPrice_product) * 100).toFixed(
        2,
    );

    const handleSize = (num, index) => {
        setActiveSize(index);
        // console.log(num);
        setDataCart((prevDataCart) => ({
            ...prevDataCart,
            size: num.size,
        }));
    };
    const handleDecrease = () => {
        setChangeNum(changeNum === 1 ? changeNum - 0 : changeNum - 1);
        setDataCart((prevDataCart) => ({
            ...prevDataCart,
            quantity: changeNum === 1 ? changeNum - 0 : changeNum - 1,
        }));
    };
    const handleIncrease = () => {
        setChangeNum(changeNum + 1);
        setDataCart((prevDataCart) => ({
            ...prevDataCart,
            quantity: changeNum + 1,
        }));
    };
    const handleAdd = async (e) => {
        e.preventDefault();
        if (!token) {
            navigate(config.routes.login);
            return;
        }
        console.log('dataCart', dataCart);
        try {
            const response = await axios.post('http://localhost:3000/api/add_to_cart', dataCart, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });

            const jsonData = response.data;
            // const detail = response.data.data.detail_cart;
            const detail = response.data.data.detail_cart;
            const lastDetailItem = detail[detail.length - 1];
            const lastDetailItemId = lastDetailItem._id;
            console.log('response123', lastDetailItemId);
            setIdCartItem(lastDetailItemId);
            // console.log('respone', response);
            setLengthCart(response.data.data.detail_cart.length);
            toast.success('Thêm sản phẩm thành công', {
                autoClose: 500,
            });
            navigate(config.routes.cart);
            // dispatch(addToCart(dataCart));
        } catch (error) {
            console.error(error);
            // toast.error(`${error}`);
            toast.error('Thất bại, vui lòng kiểm tra lại kết nối!');
        }
    };
    useEffect(() => {
        if (productInSale && productInSale.endSale) {
            const endTime = new Date(productInSale.endSale).getTime();

            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = endTime - now;

                if (distance > 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    setCountdown({ days, hours, minutes, seconds });
                } else {
                    // Countdown expired, you might want to handle this case
                    setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            };

            const intervalId = setInterval(updateCountdown, 1000);

            // Clear interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [productInSale]);
    console.log('productInsale', productInSale);
    console.log('products', products);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <h3 className={cx('name')}>{products.name_product}</h3>
                {productInSale !== null ? (
                    <div className={cx('sale')}>
                        <h3 className={cx('sale-title')}>Flash sale</h3>
                        <div className={cx('sale-action')}>
                            <p className={cx('sale-action--name')}>Kết thúc trong: </p>
                            <div className={cx('sale-time')}>
                                <span className={cx('time')}>{countdown.days.toString().padStart(2, '0')} ngày </span>
                                <span className={cx('time')}>{countdown.hours.toString().padStart(2, '0')} : </span>
                                <span className={cx('time')}>{countdown.minutes.toString().padStart(2, '0')} : </span>
                                <span className={cx('time')}>{countdown.seconds.toString().padStart(2, '0')}</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <div className={cx('prices')}>
                    {productInSale === null ? (
                        <span className={cx('price-new')}>{products.price_product.toLocaleString()} VNĐ</span>
                    ) : (
                        // <span className={cx('price-new')}>{products.newPrice_product.toLocaleString()} VNĐ</span>
                        <div>
                            <div className={cx('promotion')}>
                                <span className={cx('price-new')}>
                                    {Math.round(productInSale.saleProduct.salePrice).toLocaleString()} VNĐ
                                </span>
                                <span className={cx('price-old')}>{products.price_product.toLocaleString()} VNĐ</span>
                                <span className={cx('price-percent')}>{productInSale.saleProduct.promotion}%</span>
                            </div>
                        </div>
                    )}
                    {/* <span className={cx('price-new')}>1.300.000 VNĐ</span>
                    <span className={cx('price-old')}>1.500.000 VNĐ</span>
                    <span className={cx('price-percent')}>-86.6%</span> */}
                </div>
                <div className={cx('size')}>
                    <p className={cx('size-heading')}>Kích thước</p>
                    {products.sizes.map((num, index) => {
                        return (
                            <div className={cx('size-list')} key={index}>
                                <div
                                    className={cx(
                                        'size-item',
                                        { active: activeSize === index },
                                        { stock: num.quantity === 0 },
                                    )}
                                    onClick={() => handleSize(num, index)}
                                    key={index}
                                >
                                    {num.size}
                                </div>
                            </div>
                        );
                    })}
                    {/* {products.size.map((num, index) => {
                        const numArray = num.split(',');
                        return (
                            <div className={cx('size-list')} key={index}>
                                {numArray.map((numb, i) => (
                                    <div
                                        className={cx('size-item', { active: activeSize === i })}
                                        onClick={() => handleSize(numb, i)}
                                        key={i}
                                    >
                                        {numb}
                                    </div>
                                ))}
                            </div>
                        );
                    })} */}
                    {/* {console.log(products.size)} */}
                </div>
                <div className={cx('quantity')}>
                    <p className={cx('quantity-heading')}>Số lượng</p>
                    <div className={cx('quantity-btn')} onClick={() => handleDecrease()}>
                        -
                    </div>
                    <span className={cx('quantity-number')}>{changeNum}</span>
                    <div className={cx('quantity-btn')} onClick={() => handleIncrease()}>
                        +
                    </div>
                </div>
                <div className={cx('action')}>
                    {/* <ActionBuy /> */}
                    <div onClick={handleAdd} className={cx('buy-btn')}>
                        Mua ngay
                    </div>
                    <ActionAdd dataCart={dataCart} />
                    {/* <div className={cx('add-btn')}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        Thêm vào giỏ hàng
                    </div> */}
                </div>
                <div className={cx('policy', 'row', 'sm-gutter')}>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy1} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>Bảo hành keo vĩnh viễn</span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy2} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>
                            Miễn phí vận chuyển toàn quốc cho đơn hàng từ 150k
                        </span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy3} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>
                            Đổi trả dễ dàng (trong vòng 7 ngày nếu lỗi nhà sản xuất)
                        </span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy4} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>Hotline 1900.633.349 hỗ trợ từ 8h30-21h30</span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy5} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>Giao hàng tận nơi, nhận hàng xong thanh toán</span>
                    </div>
                    <div className={cx('policy-item', 'col', 'l-4')}>
                        <div className={cx('policy-item_img')}>
                            <img src={images.policy6} alt="hình ảnh" />
                        </div>
                        <span className={cx('policy-item_title')}>
                            Ưu đãi tích điểm và hưởng quyền lợi thành viên từ GG
                        </span>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Action;
