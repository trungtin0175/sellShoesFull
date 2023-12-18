import styles from './ActionBuy.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space } from 'antd';

const cx = classNames.bind(styles);

function ActionBuy() {
    const [open, setOpen] = useState(false);
    const handleBuy = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div onClick={handleBuy} className={cx('buy-btn')}>
                Đồng ý
            </div>
            <Modal
                centered
                open={open}
                footer={null}
                onCancel={() => setOpen(false)}
                width={1000}
                style={{ marginTop: 30 }}
            >
                <div className={cx('wrapper')}>
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
                            {/* {products.map(
                        (product, index) => (  */}
                            <div className={cx('product-item')}>
                                <div className={cx('body-left')}>
                                    <div className={cx('body-check')}></div>
                                    <div className={cx('body-products')}>
                                        <div className={cx('body-product')}>
                                            <img
                                                className={cx('body-product_img')}
                                                src="https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg"
                                            />
                                            <p className={cx('body-product_name')}>shfshfgs</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('body-right')}>
                                    <div className={cx('body-size')}>
                                        <div className={cx('body-price')}>37</div>
                                        <div className={cx('body-size_wrapper')}>
                                            <div className={cx('body-size_change', {})}></div>
                                        </div>
                                    </div>
                                    <div className={cx('body-price')}>14000000 VNĐ</div>
                                    <div className={cx('body-action')}>
                                        <span className={cx('quantity-number')}>1</span>
                                    </div>
                                    <div className={cx('body-price-new')}>14000000 VNĐ</div>
                                </div>
                            </div>
                            {/* ), 
                    )} */}
                        </div>
                        <div className={cx('infor')}>
                            <div className={cx('address')}>
                                <h3 className={cx('address-header')}>ĐỊA CHỈ NHẬN HÀNG</h3>
                                <div className={cx('address-content')}>
                                    <h3 className={cx('address-content-name')}>Tên người nhận: Trần trung Tín</h3>
                                    <p className={cx('address-content-tel')}>SĐT: 0325723</p>
                                    <p className={cx('address-content-add')}>Địa chỉ: quận 12 thành phố hồ chí minh</p>
                                </div>
                            </div>
                            <div className={cx('pay')}>
                                <h3 className={cx('pay-name')}>Chọn phương thức thanh toán</h3>
                                <div className={cx('button-pay')}>
                                    <button className={cx('button-submit')}>Thanh toán vnpay</button>
                                    <button className={cx('button-submit')}>Thanh toán tiền mặt</button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('footer')}>
                            <h4 className={cx('footer-all')}>Tổng thanh toán 300 sản phẩm:</h4>
                            <div className={cx('footer-price')}>3400000 VNĐ</div>
                            <ActionBuy />
                        </div>
                    </div>
                </div>
                <div className={cx('main')}>
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
                                placeholder="Trần Trung Tín"
                                className={cx('form-control')}
                                // onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="numberphone" className={cx('form-label')}>
                                Số điện thoại
                            </label>
                            <input
                                id="numberphone"
                                type="tel"
                                placeholder="0123456789"
                                className={cx('form-control')}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <label htmlFor="address" className={cx('form-label')}>
                                Địa chỉ nhận hàng
                            </label>
                            <input
                                id="address"
                                type="text"
                                placeholder="409 đ.Hùng Vương q.12 tp.HCM"
                                className={cx('form-control')}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={cx('button')}>
                            {/* <button className={cx('form-submit')}>Thanh toán vnpay</button> */}
                            <button className={cx('form-submit')}>Đồng ý</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default ActionBuy;
