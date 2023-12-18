import Content from '~/pages/Type/Content';
import { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '~/components/GridStyles';
import classNames from 'classnames/bind';
import styles from '../Type.module.scss';

const cx = classNames.bind(styles);

function Bellow({ product }) {
    if (!product) {
        return <p>Loading...</p>; // or some other placeholder while waiting for the data
    }
    const sortProducts = product.filter((pro) => pro.product.price_product < 1000000);
    // const sortProducts = product.filter((pro) => pro.newPrice_product < 1000000);
    // .newPrice_productsort < 1000000;
    // console.log('acb', product);
    return (
        <div className={cx('wrapper', 'row')}>
            {Array.isArray(sortProducts) && sortProducts.length !== 0 ? (
                sortProducts.map((product, index) => (
                    <div className={cx('col', 'l-2-4')} key={index}>
                        <Content product={product} />
                    </div>
                ))
            ) : (
                <div className={cx('no-product')}>Không có sản phẩm nào</div>
            )}
            {/* {sortProducts.map((pro, index) => (
                <Content key={index} product={pro} />
            ))} */}
        </div>
    );
}

export default Bellow;
