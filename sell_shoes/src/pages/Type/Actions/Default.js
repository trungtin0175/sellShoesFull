import Content from '~/pages/Type/Content';
import { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '~/components/GridStyles';
import classNames from 'classnames/bind';
import styles from '../Type.module.scss';

const cx = classNames.bind(styles);

function Default({ product }) {
    if (!product) {
        return <p>Loading...</p>; // or some other placeholder while waiting for the data
    }
    return (
        <div className={cx('wrapper', 'row')}>
            {Array.isArray(product) && product.length !== 0 ? (
                product.map((product, index) => (
                    <div className={cx('col', 'l-2-4')} key={index}>
                        <Content product={product} />
                    </div>
                ))
            ) : (
                <div className={cx('no-product')}>Không có sản phẩm nào</div>
            )}
        </div>
    );
}

export default Default;
