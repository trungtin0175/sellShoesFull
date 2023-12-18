import Header from '~/layouts/components/Header';
import styles from '~/layouts/DefaultLayout/DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import Footer from '~/layouts/components/Footer';
import { useState, createContext } from 'react';

const cx = classNames.bind(styles);
export const ProductContext = createContext();
export const IdCartItemContext = createContext();
function HeaderOnly({ children }) {
    const [productCart, setProductCart] = useState([]);
    const [idCartItem, setIdCartItem] = useState(null);
    return (
        <ProductContext.Provider value={{ productCart, setProductCart }}>
            <IdCartItemContext.Provider value={{ idCartItem, setIdCartItem }}>
                <div className={cx('wrapper')}>
                    <Header />
                    <div className={cx('container')}>
                        <div className={cx('content')}>{children}</div>
                    </div>
                    <Footer />
                </div>
            </IdCartItemContext.Provider>
        </ProductContext.Provider>
    );
}

HeaderOnly.prototype = {
    children: PropTypes.node.isRequired,
};

export default HeaderOnly;
