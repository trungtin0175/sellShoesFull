import classNames from 'classnames/bind';
import styles from './Type.module.scss';
import Content from './Content';
import '~/components/GridStyles';
import { useState, useEffect, createContext, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import config from '~/config';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Increase from './Actions/Increase';
import Decrease from './Actions/Decrease';
import Allow from './Actions/Allow';
import Bellow from './Actions/Bellow';
import BestSale from './Actions/BestSale';
import FivetoTen from './Actions/FivetoTen';
import OnetoFive from './Actions/OnetoFive';
import Default from './Actions/Default';
import { ProductContext } from '~/layouts/DefaultLayout/DefaultLayout';

const cx = classNames.bind(styles);

function Type() {
    const [product, setProduct] = useState([]);
    const [initialProduct, setInitialProduct] = useState([]);
    const { action } = useContext(ProductContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const _id = searchParams.get('_id');
    // const { _id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/filterproduct?_id=${_id}`)
            .then((response) => {
                console.log('resspone', response.data.data);
                setProduct(response.data.data);
                setInitialProduct(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [_id]);
    // if (product.length === 0) {
    //     return <p>Loading...</p>; // or some other placeholder while waiting for the data
    // }
    console.log('product', product);
    return (
        <div className={cx('wrapper')}>
            {/* <Sidebar setAct={setProduct} /> */}
            <div className={cx('container', 'row', 'sm-gutter')}>
                {action === 'Giá tăng dần' ? (
                    <Increase product={product} />
                ) : action === 'Giá giảm dần' ? (
                    <Decrease product={product} />
                ) : action === 'Khuyến mãi tốt nhất' ? (
                    <BestSale product={product} />
                ) : action === 'Mặc định' ? (
                    <Default product={initialProduct} />
                ) : action === 'Dưới 1 triệu' ? (
                    <Bellow product={product} />
                ) : action === 'Từ 1 đến 5 triệu' ? (
                    <OnetoFive product={product} />
                ) : action === 'Từ 5 đến 10 triệu' ? (
                    <FivetoTen product={product} />
                ) : action === 'Trên 10 triệu' ? (
                    <Allow product={product} />
                ) : Array.isArray(product) ? (
                    product.map((pro, index) => (
                        <div key={index} className={cx('col', 'l-2-4')}>
                            <Content product={pro} />
                        </div>
                    ))
                ) : (
                    <p>Product</p>
                )}
                {/* {Array.isArray(product) ? (
                    product.map((pro, index) => (
                        <div key={index} className={cx('col', 'l-2-4')}>
                            <Content product={pro} />
                        </div>
                    ))
                ) : (
                    <></>
                )} */}
            </div>
        </div>
    );
}

export default Type;
