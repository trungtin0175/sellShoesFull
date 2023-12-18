import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect } from 'react';
import config from '~/config';
import { useSelector } from 'react-redux';
import axios from 'axios';

const cx = classNames.bind(styles);
function Content({ product }) {
    const getFavoriteid = localStorage.getItem('favoriteId');
    const initialIsSolidHeart = getFavoriteid ? getFavoriteid.includes(product._id) : false;
    const [isSolidHeart, setIsSolidHeart] = useState(initialIsSolidHeart);
    const token = useSelector((state) => state.user.accessToken);
    const user = useSelector((state) => state.user);
    const [data, setData] = useState({ id_user: user._id, id_product: product._id });
    const [favorite, setFavorite] = useState([]);
    const [allFavorite, setAllFavorite] = useState([]);
    const [favoriteNumber, setFavoriteNumber] = useState(0);
    const navigate = useNavigate();
    // const sale = ((product.newPrice_product / product.oldPrice_product) * 100).toFixed(2);
    const sale = (((product.price_product - product.salePrice) / product.price_product) * 100).toFixed(2);
    const dataDelete = { id_product: product._id };

    // console.log('pro', product);
    useEffect(() => {
        // if (favorite.data) {
        //     const favoriteIds = favorite.data.map((id) => id._id);
        //     if (favoriteIds.includes(product._id)) {
        //         setIsSolidHeart(true);
        //         // console.log('true', favoriteIds);
        //     }
        //     // setFavoriteNumber(favorite.length);
        // }
        axios
            .get('http://localhost:3000/api/product/favorite', {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFavorite(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        // setSelectedProducts([...selectedProducts, idCartItem]);
    }, [token, favoriteNumber, product._id]);
    // useEffect(() => {
    //     const storedIsSolidHeart = localStorage.getItem('isSolidHeart');
    //     if (storedIsSolidHeart === 'true') {
    //         setIsSolidHeart(true);
    //     }
    //     // ... (code khác)
    // }, []);
    useEffect(() => {
        // if (allFavorite.data && allFavorite.data.some((item) => item.id_product === product._id)) {
        //     setIsSolidHeart(true);
        // }
        axios
            .get('http://localhost:3000/api/all/favorite', {
                headers: {
                    token: `Bearer ${token}`,
                },
            })
            .then((response) => {
                // console.log('Response from server:', response.data);
                setAllFavorite(response.data);
                if (response.data) {
                    localStorage.setItem('favoriteId', JSON.stringify(response.data));
                }
                console.log('1');
                // if (Array.isArray(response.data)) {
                // Handle array data
                // const allFavoriteId = response?.data.map((item) => item.id_product);
                // setIsSolidHeart(allFavoriteId.includes(product._id));
                // // localStorage.setItem('isSolidHeart', isSolidHeart.toString());
                // console.log('all', allFavoriteId);
                // } else {
                //     console.log('Invalid data structure. Expected an array.');
                // }
            })
            .catch((error) => {
                console.log(error);
            });
        // setSelectedProducts([...selectedProducts, idCartItem]);
    }, [favoriteNumber]);
    useEffect(() => {
        // if (allFavorite.data && allFavorite.data.some((item) => item.id_product === product._id)) {
        //     setIsSolidHeart(true);
        // }
        // if (Array.isArray(getFavoriteid)) {
        //     const getFavorite = getFavoriteid.filter((item) => item.id_product);

        //     console.log('get', getFavorite);
        // }
        // if(getFavorite )
        setIsSolidHeart(getFavoriteid?.includes(product._id));
    }, [getFavoriteid, product._id]);

    // console.log('favorite', allFavorite);

    const toggleHeart = async (e) => {
        e.preventDefault();
        if (!token) {
            navigate(config.routes.login);
            return;
        }

        // axios.interceptors.request.use(
        //     (config) => {
        //         if (token) {
        //             config.headers.token = `Bearer ${token}`;
        //         }
        //         return config;
        //     },

        //     (error) => {
        //         return Promise.reject(error);
        //     },
        // );

        // const res = await axios.delete('http://localhost:3000/api/delete/favorite', {
        //     id_product: product._id,
        // });
        try {
            // Nếu đã thả tim rồi, thực hiện hành động xóa
            if (isSolidHeart === true) {
                console.log('Toggle Heart - Token:', token);
                console.log('Toggle Heart - Data:', dataDelete);
                // const response = await axios.delete('http://localhost:3000/api/delete/favorite', dataDelete, {
                //     headers: {
                //         token: `Bearer ${token}`,
                //     },
                // });
                const response = await axios.delete('http://localhost:3000/api/delete/favorite', {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                    data: dataDelete,
                });
                console.log(response.data);
                setFavoriteNumber((prevNumber) => prevNumber - 1);
                setIsSolidHeart(false);
            } else {
                // Ngược lại, thực hiện hành động thêm mới
                const response = await axios.post('http://localhost:3000/api/favorite', data, {
                    headers: {
                        token: `Bearer ${token}`,
                    },
                });
                setFavoriteNumber((prevNumber) => prevNumber + 1);
                setIsSolidHeart(true);
            }
            // Cập nhật trạng thái của nút Favorite
            // localStorage.setItem('isSolidHeart', (!isSolidHeart).toString());
        } catch (error) {
            console.error(error);
        }
    };
    // console.log('length', favorite.data.totalQuantity);
    // const heartIcon = isSolidHeart ? solidHeart : regularHeart;
    // console.log('product1', product);
    return (
        <Link className={cx('wrapper')} to={`/api/product/detail/${product._id}`}>
            <div className={cx('container')}>
                <div className={cx('wrapper-img')}>
                    <img
                        className={cx('img')}
                        //src="https://img.mwc.com.vn/giay-thoi-trang?w=640&h=640&FileInput=/Resources/Product/2023/01/02/z4003668433045_8dd8f2344fa5c837544609c6fda41b4f.jpg"
                        src={product.image[0]}
                        alt="giày"
                    />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('name')}>{product.name_product}</h4>
                    <div>
                        {product.salePrice === null ? (
                            <div className={cx('action')}>
                                <div className={cx('price-new')}>{product.price_product.toLocaleString()} VNĐ</div>
                                <div className={cx('favorite-wrapper')}>
                                    <div onClick={toggleHeart} className={cx('favorite')}>
                                        <FontAwesomeIcon
                                            icon={getFavoriteid?.includes(product._id) ? solidHeart : regularHeart}
                                        />
                                    </div>
                                    <span className={cx('favorite-number')}>
                                        Lượt thích:{' '}
                                        {favorite.data
                                            ? favorite.data.find((item) => item._id === product._id)?.totalQuantity || 0
                                            : 0}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className={cx('action')}>
                                    <div className={cx('price-new')}>
                                        {Math.round(product.salePrice).toLocaleString()} VNĐ
                                    </div>
                                    <div className={cx('favorite-wrapper')}>
                                        <div onClick={toggleHeart} className={cx('favorite')}>
                                            <FontAwesomeIcon
                                                icon={getFavoriteid?.includes(product._id) ? solidHeart : regularHeart}
                                            />
                                        </div>
                                        <span className={cx('favorite-number')}>
                                            Lược thích:
                                            {favorite.data
                                                ? favorite.data.find((item) => item._id === product._id)
                                                      ?.totalQuantity || 0
                                                : 0}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('promotion')}>
                                    <span className={cx('price-old')}>
                                        {product.price_product.toLocaleString()} VNĐ
                                    </span>
                                    <span className={cx('price-percent')}>{sale}%</span>
                                </div>
                            </div>
                        )}
                        {/* <div className={cx('price-new')}>{product.price_product.toLocaleString()} VNĐ</div> */}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Content;
