import styles from './Description.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
// const description = [
//     {
//         des: 'Giày thể thao nữ đế độn có thiết kế kiểu dáng buộc dây sneaker cực ngầu, trẻ trung, năng động cùng chất liệu bền bỉ hỗ trợ vận động tốt và bảo vệ đôi chân cho người mang, giày có tính năng thoáng khí, giúp cân bằng nhiệt và độ ẩm trong những điều kiện môi trường khác nhau.Mẫu giày này lấy cảm hứng từ các phong cách thể thao huyền thoại trong quá khứ và đưa đến tương lai. ',
//     },
//     {
//         des: 'Giày mang phong cách hàng ngày với thân giày bằng da mượt mà. Form giày thon gọn kiểu dáng năng động trẻ trung, phù hợp với mọi trang phục từ jean, âu đến quần sooc. mang lại cảm giác tự tin cho người dùng.',
//     },
// ];
// const detail = [
//     { det: 'Chiều cao giày 3cm. ' },
//     { det: 'Chất liệu da PU cao cấp.' },
//     { det: 'Chất liệu đế cao su đúc êm mềm, độ đàn hồi tốt, chống trơn trượt.' },
//     { det: 'Kiểu dáng giày thể thao cổ thấp.' },
//     { det: 'Size: 36 - 37 - 38 - 39 - 40.' },
// ];
function Description({ products }) {
    const describe = products.describe.split('\n');
    const detail = products.detail.split('\n');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('description')}>
                <h3 className={cx('description-heading')}>MÔ TẢ SẢN PHẨM</h3>
                <ul className={cx('description-content')}>
                    {describe.map((des, index) => (
                        <li className={cx('description-content_type')} key={index}>
                            {des}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={cx('detail')}>
                <h3 className={cx('detail-heading')}>CHI TIẾT SẢN PHẨM</h3>
                <ul className={cx('detail-content')}>
                    {detail.map((det, index) => (
                        <li className={cx('detail-content_type')} key={index}>
                            {det}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Description;
