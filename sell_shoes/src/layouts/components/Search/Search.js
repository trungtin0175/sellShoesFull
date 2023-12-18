import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Link } from 'react-router-dom';
import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, useRef } from 'react';
import { useDebounce } from '~/hook';
import axios from 'axios';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([1, 2, 3]);
    //     }, 3000);
    // }, []);
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }
        fetch(`http://localhost:3000/api/search?search=${encodeURIComponent(debounced)}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [debounced]);
    console.log('result', searchResult);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    console.log('result', searchResult);
    return (
        <div>
            <Tippy
                interactive
                visible={showResult && (searchResult ?? []).length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <div className={cx('search-result-wrapper')}>
                                {Array.isArray(searchResult) &&
                                    searchResult.map((result) => (
                                        <Link
                                            className={cx('search-link')}
                                            to={`/api/product/detail/${result.product._id}`}
                                            key={result.product._id}
                                            onClick={() => {
                                                handleHideResult();
                                                handleClear();
                                            }}
                                        >
                                            <img
                                                src={result.product.image[0]}
                                                alt="search"
                                                className={cx('search-result-img')}
                                            ></img>
                                            <div className={cx('search-result-info')}>
                                                <h4 className={cx('search-result-name')}>
                                                    {result.product.name_product}
                                                </h4>
                                                {result.productInSale !== null ? (
                                                    <div className={cx('result-price')}>
                                                        <p className={cx('search-result-price')}>
                                                            {
                                                                // result.salePrice.toLocaleString() ||
                                                                result.productInSale.saleProduct.salePrice.toLocaleString()
                                                            }{' '}
                                                            VNĐ
                                                        </p>
                                                        <p className={cx('search-result-price', 'price-old')}>
                                                            {
                                                                // result.salePrice.toLocaleString() ||
                                                                result.product.price_product.toLocaleString()
                                                            }{' '}
                                                            VNĐ
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <p className={cx('search-result-price')}>
                                                        {
                                                            // result.salePrice.toLocaleString() ||
                                                            result.product.price_product.toLocaleString()
                                                        }{' '}
                                                        VNĐ
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </PopperWrapper>
                        {/* <h4 className={cx('search-title')}>Kết quả</h4>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link>
                            <Link className={cx('search-link')}>
                                <img
                                    src="https://d2308c07sw6r8q.cloudfront.net/media/catalog/product/cache/29162ccbe9d79568e67e3d26712ec350/S/a/Sandro_SHACH00899-20_V_2_1.webp"
                                    alt="search"
                                    className={cx('search-result-img')}
                                ></img>
                                <div className={cx('search-result-info')}>
                                    <h4 className={cx('search-result-name')}>Giày sneaker da Square Cross</h4>
                                    <p className={cx('search-result-price')}>8.120.000 ₫</p>
                                </div>
                            </Link> */}
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder="Tìm kiếm tên giày, hãng giày, ..."
                        spellCheck={false}
                        onChange={handleChange}
                        onFocus={() => setShowResult(true)}
                    ></input>
                    {!!searchValue && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    <Link to={`/api/search?search=${encodeURIComponent(debounced)}`}>
                        <button
                            className={cx('search-btn')}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </Link>
                    {/* <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button> */}
                </div>
            </Tippy>
        </div>
    );
}

export default Search;
