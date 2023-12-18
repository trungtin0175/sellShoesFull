import Content from '~/pages/Type/Content';
import { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '~/components/GridStyles';
import classNames from 'classnames/bind';
import styles from '../Type.module.scss';

const cx = classNames.bind(styles);

function BestSale({ product }) {
    if (!product) {
        return <p>Loading...</p>; // or some other placeholder while waiting for the data
    }
    // const sale = (((product.oldPrice_product - product.newPrice_product) / product.oldPrice_product) * 100).toFixed(2);
    // const calculateDiscountPercentage = (oldPrice, newPrice) => {
    //     return (((oldPrice - newPrice) / oldPrice) * 100).toFixed(2);
    // };
    // const salePrice = product.productInSale?.saleProduct?.salePrice || 0;
    // const sale = (((product.product.price_product - salePrice) / product.product.price_product) * 100).toFixed(2);
    const sortProducts = [...product].sort((a, b) => {
        const priceA = a.productInSale?.saleProduct?.salePrice || 0;
        const priceB = b.productInSale?.saleProduct?.salePrice || 0;

        console.log('Price A:', priceA);
        console.log('Price B:', priceB);

        return priceB - priceA;
    });
    return (
        <div className={cx('wrapper', 'row')}>
            {Array.isArray(sortProducts) && sortProducts.length !== 0 ? (
                sortProducts.map((pro, index) => (
                    <div className={cx('col', 'l-2-4')} key={index}>
                        <Content product={pro} />
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

export default BestSale;
