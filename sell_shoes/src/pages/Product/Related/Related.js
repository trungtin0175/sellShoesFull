import classNames from 'classnames/bind';
import styles from './Related.module.scss';
import Content from '~/pages/Home/Content';
import '~/components/GridStyles';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Related({ products }) {
    const [category, setCategory] = useState([]);
    console.log('12345', products);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('heading')}>Có thể bạn cũng thích</h3>
            <div className={cx('container', 'row', 'sm-gutter')}>
                <div className={cx('col', 'l-2-4')}>
                    <Content product={products} />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content product={products} />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content product={products} />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content product={products} />
                </div>
                <div className={cx('col', 'l-2-4')}>
                    <Content product={products} />
                </div>
            </div>
        </div>
    );
}

export default Related;
