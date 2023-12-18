import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slide from './Slide';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import Category from './Category';
import Content from './Content';
import '~/components/GridStyles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Message from '../Message';
import { Pagination } from 'antd';
import { Wrapper } from '~/components/Popper';

const cx = classNames.bind(styles);
function Home() {
    const [showBtn, setShowBtn] = useState(false);
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [productCount, setProductCount] = useState(10);
    const [productFavorite, setProductFavorite] = useState([]);
    const [productSorted, setProductSorted] = useState([]);
    const [productSale, setProductSale] = useState([]);
    const [saleLimit, setSaleLimit] = useState({});
    const [saleSold, setSaleSold] = useState({});
    const [productSaleMap, setProductSaleMap] = useState({});
    const [pagination, setPagination] = useState({
        total: 0,
        current: 1,
        pageSize: 10,
    });
    console.log('products', products);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/allproduct')
            .then((response) => {
                console.log('API response:', response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const sorted = [...products].sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        console.log('Sorted products:', sorted);
        setSortedProducts(sorted);
    }, [products]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const height = 350;

            setShowBtn(scrollPosition > height);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/home')
            .then((respone) => {
                setPagination((oldPage) => ({
                    ...oldPage,
                    current: respone.data.data.current,
                    total: products.length,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [products]);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/product/favorite')
            .then((res) => {
                console.log('res', res.data.data);
                // setProductSorted(res.data.data)
                setProductSorted(res.data.data.sort((a, b) => b.totalQuantity - a.totalQuantity).slice(0, 5));
                // console.log('productSort', productSorted);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [products]);
    useEffect(() => {
        const favoriteIds = productSorted.map((pro) => pro._id);
        const productCountFavo = products.filter((pro) => favoriteIds.includes(pro._id));
        // Tạo một mảng mới bằng cách duyệt qua favoriteIds và tìm sản phẩm tương ứng trong productCountFavo
        const sortedProductCountFavo = favoriteIds.map((favId) => productCountFavo.find((pro) => pro._id === favId));
        console.log('favoIds', favoriteIds);
        console.log('productfavoIds', productCountFavo);
        console.log('sortedproductfavoIds', sortedProductCountFavo);
        // setProductFavorite(productCountFavo);
        setProductFavorite(sortedProductCountFavo);
    }, [products]);
    useEffect(() => {
        const saleProduct = products.filter((pro) => pro.salePrice !== null);
        setProductSale(saleProduct);
    }, [products]);
    console.log('profavorite', productFavorite);
    useEffect(() => {
        axios
            .get('http://localhost:3000/api/sale/active')
            .then((res) => {
                const saleData = res.data.data;
                console.log('res123', saleData);
                const saleMap = {};
                const saleLimit = {};
                const saleSold = {};

                saleData.forEach((sale) => {
                    sale.saleProducts.forEach((product) => {
                        const remainingQuantity =
                            typeof product.limit === 'number' && typeof product.soldQuantity === 'number'
                                ? Math.max(0, product.limit - product.soldQuantity)
                                : 0;
                        // console.log('sale', product);

                        saleMap[product.id_product._id] = remainingQuantity;
                        saleLimit[product.id_product._id] = product.limit;
                        saleSold[product.id_product._id] = product.soldQuantity;
                    });
                });

                setProductSaleMap(saleMap);
                setSaleLimit(saleLimit);
                setSaleSold(saleSold);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [products]);
    const handleLoadMore = () => {
        setProductCount(productCount + 10);
    };
    const handlePageChange = (page, pageSize) => {
        setPagination((oldPage) => ({
            ...oldPage,
            current: page,
            pageSize: pageSize,
        }));
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const productsToShow = products.slice(startIndex, endIndex);
        // // Cập nhật trạng thái sortedProducts hoặc productCount
        setSortedProducts(productsToShow);
    };
    // console.log('sortedProducts:', products);
    console.log('productCount:', productSale);

    return (
        <div className={cx('wrapper')}>
            <Slide />
            {/* <Slide arrImages={[images.banner4, images.banner2, images.banner3]} /> */}
            <Category />
            {Array.isArray(productSale) && productSale.length > 0 && (
                <div className={cx('wrapper-sale')}>
                    <div className={cx('wrapper-title')}>
                        {/* <h1 className={cx('title')}>Các sản phẩm đang giảm giá</h1> */}
                    </div>
                    <img className={cx('wrapper-title-img')} alt="sale" src={images.flashsale}></img>
                    <div className={cx('container', 'row', 'sm-gutter')}>
                        {productSale.map((product, index) => (
                            <div className={cx('col', 'l-2-4', 'c-6')} key={index}>
                                <div className={cx('wrap-content')}>
                                    <Content product={product} />
                                    <div className={cx('content-limit')}>
                                        <div className={cx('crossbar')}>
                                            <div className={cx('progress-bar')}>
                                                <div
                                                    className={cx('progress-indicator')}
                                                    style={{
                                                        width: `${
                                                            ((saleLimit[product._id] - saleSold[product._id]) /
                                                                saleLimit[product._id]) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <p className={cx('content-inventory')}>
                                            {productSaleMap[product._id] !== 0
                                                ? `Còn lại ${productSaleMap[product._id]} sản phẩm`
                                                : `Hết hàng`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {Array.isArray(productFavorite) && productFavorite.length > 0 && (
                <>
                    <div className={cx('wrapper-title')}>
                        <h1 className="title">Các sản phẩm được yêu thích nhất</h1>
                    </div>
                    <div className={cx('container', 'row', 'sm-gutter')}>
                        {productFavorite.map((product, index) => (
                            <div className={cx('col', 'l-2-4', 'c-6')} key={index}>
                                <Content product={product} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className={cx('wrapper-title')}>
                <h1 className="title">Tất cả sản phẩm</h1>
            </div>
            <div className={cx('container', 'row', 'sm-gutter')}>
                {Array.isArray(sortedProducts) ? (
                    sortedProducts.slice(0, productCount).map((product, index) => (
                        <div className={cx('col', 'l-2-4', 'c-6')} key={index}>
                            <Content product={product} />
                        </div>
                    ))
                ) : (
                    <p>Product not found</p>
                )}
            </div>
            {/* {productCount < sortedProducts.length && (
                <div className={cx('wrapper-btn')}>
                    <button onClick={handleLoadMore} className={cx('btn')}>
                        Xem thêm
                    </button>
                </div>
            )} */}
            <Pagination
                // defaultCurrent={1}
                // pageSize={products.length}
                pageSize={pagination.pageSize}
                current={pagination.current}
                total={pagination.total}
                onChange={handlePageChange}
                // total={products.length}
                className={cx('pagination')}
            />
            <div className={cx('message')}>
                <Message />
                {/* <div className={cx('alert-number')}></div> */}
            </div>
            <div
                className={cx('wrapper-scroll')}
                style={{ display: showBtn ? 'flex' : 'none' }}
                onClick={() => {
                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                }}
            >
                <FontAwesomeIcon className={cx('scroll-icon')} icon={faChevronUp} />
            </div>
        </div>
    );
}

export default Home;
