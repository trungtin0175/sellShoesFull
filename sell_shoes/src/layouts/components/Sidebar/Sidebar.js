import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { sortDeCrease, sortIncrease } from '~/redux/actions';
import { useLocation } from 'react-router-dom';
import { ProductContext } from '~/layouts/DefaultLayout/DefaultLayout';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);
// export const ProductContext = createContext();

function Sidebar() {
    const [showSort, setShowSort] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [isActive, setIsActive] = useState('Mặc định');
    // const [action, setAction] = useState('Mặc định');
    // console.log(action);
    // console.log(action);
    const { setAction } = useContext(ProductContext);

    const handleSort = () => {
        setShowSort(!showSort);
    };
    const handlePrice = () => {
        setShowPrice(!showPrice);
    };
    const handleDefault = () => {
        setAction('Mặc định');
        setIsActive('Mặc định');
    };
    const handleIncrease = () => {
        setAction('Giá tăng dần');
        setIsActive('Giá tăng dần');
    };
    const handleDecrease = () => {
        setAction('Giá giảm dần');
        setIsActive('Giá giảm dần');
    };
    const handleSale = () => {
        setAction('Khuyến mãi tốt nhất');
        setIsActive('Khuyến mãi tốt nhất');
    };
    const handleBelow1 = () => {
        setAction('Dưới 1 triệu');
        setIsActive('Dưới 1 triệu');
    };
    const handle1to5 = () => {
        setAction('Từ 1 đến 5 triệu');
        setIsActive('Từ 1 đến 5 triệu');
    };
    const handle5to10 = () => {
        setAction('Từ 5 đến 10 triệu');
        setIsActive('Từ 5 đến 10 triệu');
    };
    const handleAllow10 = () => {
        setAction('Trên 10 triệu');
        setIsActive('Trên 10 triệu');
    };

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('sort')}>
                <h3 className={cx('sort-heading')} onClick={() => handleSort()}>
                    Sắp xếp theo
                    <div className={cx('icon-sort', { active: showSort })}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </h3>
                <div className={cx('sort-title', { active: showSort })}>
                    <span onClick={handleDefault} className={cx('sort-item', { active: isActive === 'Mặc định' })}>
                        Mặc định
                    </span>
                    <span onClick={handleIncrease} className={cx('sort-item', { active: isActive === 'Giá tăng dần' })}>
                        Giá tăng dần
                    </span>
                    <span onClick={handleDecrease} className={cx('sort-item', { active: isActive === 'Giá giảm dần' })}>
                        Giá giảm giần
                    </span>
                    <span
                        onClick={handleSale}
                        className={cx('sort-item', { active: isActive === 'Khuyến mãi tốt nhất' })}
                    >
                        Khuyến mãi tốt nhất
                    </span>
                </div>
            </div>
            <div className={cx('price')} style={{ transform: showSort ? 'translateY(-85%)' : 'translateY(0)' }}>
                <h3 className={cx('price-heading')} onClick={() => handlePrice()}>
                    Khoảng giá
                    <div className={cx('icon-price', { active: showPrice })}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </div>
                </h3>
                <div className={cx('price-title', { active: showPrice })}>
                    <span onClick={handleBelow1} className={cx('price-item', { active: isActive === 'Dưới 1 triệu' })}>
                        Dưới 1 triệu
                    </span>
                    <span
                        onClick={handle1to5}
                        className={cx('price-item', { active: isActive === 'Từ 1 đến 5 triệu' })}
                    >
                        Từ 1-5 triệu
                    </span>
                    <span
                        onClick={handle5to10}
                        className={cx('price-item', { active: isActive === 'Từ 5 đến 10 triệu' })}
                    >
                        Từ 5-10 triệu
                    </span>
                    <span
                        onClick={handleAllow10}
                        className={cx('price-item', { active: isActive === 'Trên 10 triệu' })}
                    >
                        Trên 10 triệu
                    </span>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
