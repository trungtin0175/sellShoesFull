import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import '~/components/GridStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container', 'row', 'sm-gutter')}>
                <div className={cx('body', 'col', 'l-3')}>
                    <h3 className={cx('heading')}>SELLSHOES SHOP</h3>
                    <div className={cx('content')}>
                        <p className={cx('content-body')}>
                            ShellShoes Shop là project demo 1 số chức năng của một website bán giày online do GG team
                            thực hiện. Trong quá trình thực hiện project có những lỗi phát sinh, mong nhận được ý kiến
                            và đóng góp của mọi người để em/mình có thể hoàn thiện hơn. Thanks!
                        </p>
                        <div className={cx('content-wrapper')}>
                            <h3 className={cx('content-head')}>Lưu ý:</h3>
                            <p className={cx('content-body')}>
                                Vì đây là project chỉ mang tính chất demo nên không có chức năng thay thế hoàn toàn các
                                website khác.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('body', 'col', 'l-3')}>
                    <h3 className={cx('heading')}>THÔNG TIN CÔNG TY</h3>
                    <div className={cx('content')}>
                        <div className={cx('content-wrapper')}>
                            <h3 className={cx('content-head')}>Trụ sở đặt tại:</h3>
                            <p className={cx('content-body')}>
                                Đường Huỳnh Thị Hai, Khu Phố 8, Quận 12, Thành Phố Hồ Chí Minh
                            </p>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <h3 className={cx('content-head')}>Điện thoại:</h3>
                            <p className={cx('content-body')}>0967.111.JQK</p>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <h3 className={cx('content-head')}>Email:</h3>
                            <p className={cx('content-body')}>dapda@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className={cx('body', 'col', 'l-3')}>
                    <h3 className={cx('heading')}>PHƯƠNG THỨC THANH TOÁN</h3>
                    <div className={cx('content')}>
                        <div className={cx('content-item')}>
                            <FontAwesomeIcon icon={faCreditCard} className={cx('content-icon')} />
                            <p className={cx('content-body')}>VNPAY</p>
                        </div>
                        <div className={cx('content-item')}>
                            <FontAwesomeIcon icon={faMoneyBill} className={cx('content-icon')} />
                            <p className={cx('content-body')}>TIỀN MẶT</p>
                        </div>
                    </div>
                </div>
                <div className={cx('body', 'col', 'l-3')}>
                    <h3 className={cx('heading')}>LIÊN HỆ VỚI CHÚNG TÔI</h3>
                    <div className={cx('content')}>
                        <div className={cx('content-item')}>
                            <a href="https://www.facebook.com/ngay.ngo.39904" className={cx('logo-link')}>
                                <img className={cx('logo-img')} src={images.Facebook_Logo} alt="logo"></img>
                            </a>
                            <a href="https://www.instagram.com/trungtin651/" className={cx('logo-link')}>
                                <img className={cx('logo-img')} src={images.Instagram_logo} alt="logo"></img>
                            </a>
                            <a href="https://www.facebook.com/ngay.ngo.39904" className={cx('logo-link')}>
                                <img className={cx('logo-img')} src={images.Logo_Zalo} alt="logo"></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
