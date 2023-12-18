import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import Action from './Action';
import Image from './Image';
import Description from './Description';
import Related from './Related';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './Comments';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Product() {
    const [product, setProduct] = useState([]);
    const [productInSale, setProductInsale] = useState([]);
    const { _id } = useParams();
    const userId = useSelector((state) => state.user._id);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        console.log('product', _id);
        axios
            .get(`http://localhost:3000/api/product/detail/${_id}`)
            .then((response) => {
                setProduct(response.data.data.product);
                setProductInsale(response.data.data.productIsInSale);
                console.log('response', response);
            })
            .catch((error) => {
                console.log('API Error:', error);
            });
    }, [_id]);
    if (!product._id) {
        return null; // Hoặc hiển thị một màn hình loading nếu cần
    }
    console.log('productsss', product);
    console.log('productInsale', productInSale);
    // console.log('abc');
    // useEffect(() => {
    //     console.log('This will run only once on mount');
    // }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-info')}>
                {/* IMG */}
                <Image products={product} />
                {/* Action */}
                <Action products={product} productInSale={productInSale} />
            </div>
            <div className={cx('wrapper-container')}>
                <Description products={product} />
                {/* <Related products={product} /> */}
                <Comments id={_id} />
            </div>
        </div>
    );
}

export default Product;
