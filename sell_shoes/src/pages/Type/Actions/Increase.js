import Content from '~/pages/Type/Content';
import { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import '~/components/GridStyles';
import classNames from 'classnames/bind';
import styles from '../Type.module.scss';

const cx = classNames.bind(styles);
function Increase({ product }) {
    // const [product, setProduct] = useState([]);
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const _id = searchParams.get('_id');
    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:3000/api/filterproduct?_id=${_id}`)
    //         .then((response) => {
    //             console.log(response.data.data);
    //             setProduct(response.data.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [_id]);
    if (!product) {
        return <p>Loading...</p>; // or some other placeholder while waiting for the data
    }
    const sortProducts = [...product].sort((a, b) => a.product.price_product - b.product.price_product);
    // const sortProducts = [...product].sort((a, b) => a.newPrice_product - b.newPrice_product);
    console.log('product', sortProducts);
    return (
        <div className={cx('wrapper', 'row')}>
            {Array.isArray(product) && sortProducts.length !== 0 ? (
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

export default Increase;
