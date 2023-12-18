import styles from './BuyNow.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, useContext } from 'react';
import ActionBuy from '../Product/ActionBuy/ActionBuy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { Link, useNavigate } from 'react-router-dom';
// import routes from '~/config/routes';
import config from '~/config/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChangeSize from '~/pages/Cart/ChangeSize';
import { ProductContext } from '~/layouts/HeaderOnly/HeaderOnly';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Cart() {
    const token = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate();
    const { productCart } = useContext(ProductContext);
    const [allPrice, setAllPrice] = useState(0);
    const [allQuantity, setAllQuantity] = useState(0);
    const [active, setActive] = useState(false);
    const [formData, setFormData] = useState({
        fullname: '',
        phone: '',
        address: '',
        payName: '',
    });
    const handlePay = () => {
        setFormData((order) => ({
            ...order,
            payName: 'Thanh toán khi nhận hàng',
        }));
        setActive(!active);
    };
    console.log('productCart', productCart);
    // const productCart = Array.isArray(productCart) ? productCart : [productCart];
    console.log('formData', formData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formdata', formData);
        if (formData.fullname === '' || formData.phone === '' || formData.address === '' || productCart.length === 0) {
            toast.error('Vui lòng điền đầy đủ thông tin theo yêu cầu và chọn sản phẩm trước khi mua.');
            return;
        }
        const form = new FormData();
        form.append('fullname', formData.fullname);
        form.append('numberpone', formData.numberpone);
        form.append('address', formData.address);
        const orderProducts = productCart.map((product) => ({
            id_product: product.id_product,
            quantity: product.quantity,
            size: product.size,
            unit_price: product.unitPrice,
            price: product.price,
        }));

        const orderData = {
            fullname: formData.fullname,
            phone: formData.phone,
            address: formData.address,
            payName: formData.payName,
            orderProducts,
        };
        try {
            console.log('orrderData', orderData);
            const response = await axios.post('http://localhost:3000/api/order/create', orderData, {
                headers: {
                    token: `Bearer ${token}`,
                },
            });
            if (response.status !== 200) {
                return toast.warning(response.data.message);
            }
            toast.success('Bạn đã mua hàng thành công', {
                autoClose: 1000,
            });
            navigate(config.routes.order);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        // Khi danh sách sản phẩm được chọn thay đổi, tính toán lại allPrice và allQuantity
        let totalPrice = 0;
        let totalQuantity = 0;

        productCart.forEach((product) => {
            // product.forEach((pro) => {
            // if (selectedProducts.includes(pro._id)) {
            totalPrice += product.price;
            totalQuantity += 1;
            // }
            // });
        });

        setAllPrice(totalPrice);
        setAllQuantity(totalQuantity);
    }, [productCart]);
    console.log('ProductCart', productCart);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <form className={cx('form')} id="form-2">
                    <h3 className={cx('heading')}>Thông tin nhận hàng</h3>
                    <div className={cx('form-group')}></div>
                    <div className={cx('form-group')}>
                        <label htmlFor="fullname" className={cx('form-label')}>
                            Tên người nhận
                        </label>
                        <input
                            id="fullname"
                            type="text"
                            placeholder="VD: Trần Trung Tín"
                            className={cx('form-control')}
                            name="fullname"
                            onChange={handleInputChange}
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="phone" className={cx('form-label')}>
                            Số điện thoại
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="VD: 0123456789"
                            className={cx('form-control')}
                            name="phone"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={cx('form-group')}>
                        <label htmlFor="address" className={cx('form-label')}>
                            Địa chỉ nhận hàng
                        </label>
                        <input
                            id="address"
                            type="text"
                            placeholder="VD: 409 đ.Hùng Vương q.12 tp.HCM"
                            className={cx('form-control')}
                            name="address"
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* <div className={cx('button')}>
                        <button className={cx('form-submit')}>Thanh toán vnpay</button>
                        <button className={cx('form-submit')}>Đồng ý</button>
                    </div> */}
                </form>
            </div>
            {/* {products.length !== 0 ? ( */}
            <div className={cx('wrapper-has')}>
                <div className={cx('header')}>
                    <h4 className={cx('product')}>Sản Phẩm</h4>
                    <div className={cx('type')}>
                        <h4 className={cx('type-item')}>Size</h4>
                        <h4 className={cx('type-item')}>Đơn Giá</h4>
                        <h4 className={cx('type-item')}>Số Lượng</h4>
                        <h4 className={cx('type-item')}>Số Tiền</h4>
                    </div>
                </div>
                <div className={cx('body')}>
                    {productCart.map((product, index) => (
                        <div key={index} className={cx('product-item')}>
                            <div className={cx('body-left')}>
                                <div className={cx('body-check')}></div>
                                <div className={cx('body-products')}>
                                    <div className={cx('body-product')}>
                                        <img
                                            className={cx('body-product_img')}
                                            alt="Hinh anh"
                                            src={product.id_product.image || product.image[0]}
                                        ></img>
                                        <p className={cx('body-product_name')}>{product.name_product}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('body-right')}>
                                <div className={cx('body-size')}>
                                    <div className={cx('body-price')}>{product.size}</div>
                                    <div className={cx('body-size_wrapper')}>
                                        <div className={cx('body-size_change', {})}></div>
                                    </div>
                                </div>
                                <div className={cx('body-price')}>{product.unitPrice.toLocaleString()} VNĐ</div>
                                <div className={cx('body-action')}>
                                    <span className={cx('quantity-number')}>{product.quantity}</span>
                                </div>
                                <div className={cx('body-price-new')}>{product.price.toLocaleString()} VNĐ</div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <div className={cx('infor')}>
                    <div className={cx('address')}>
                        <h3 className={cx('address-header')}>ĐỊA CHỈ NHẬN HÀNG</h3>
                        <div className={cx('address-content')}>
                            <h3 className={cx('address-content-name')}>Tên người nhận: Trần trung Tín</h3>
                            <p className={cx('address-content-tel')}>SĐT: 0325723</p>
                            <p className={cx('address-content-add')}>Địa chỉ: quận 12 thành phố hồ chí minh</p>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className={cx('pay')}>
                <h3 className={cx('pay-name')}>Chọn phương thức thanh toán: </h3>
                <div className={cx('button-pay')}>
                    {/* {payArr.map((pay, index) => ( */}
                    <div onClick={() => handlePay()} className={cx('button-submit', { active: active })}>
                        Thanh toán khi nhận hàng
                    </div>
                    <div onClick={() => handlePay()} className={cx('button-submit')}>
                        Thanh toán bằng vnpay
                    </div>
                    {/* ))} */}
                    {/* <div className={cx('button-submit')}>Thanh toán tiền mặt</div> */}
                </div>
            </div>
            <div className={cx('footer')}>
                <h4 className={cx('footer-all')}>Tổng thanh toán {allQuantity} sản phẩm:</h4>
                <div className={cx('footer-price')}>{allPrice.toLocaleString()} VNĐ</div>
                {/* <ActionBuy /> */}
                <div onClick={handleSubmit} className={cx('buy-btn')}>
                    Mua ngay
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Cart;
