import Header from '~/layouts/components/Header';
import Footer from '~/layouts/components/Footer';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '../components/Sidebar';
import PropTypes from 'prop-types';
import { useState, createContext, useContext } from 'react';
// import { LengthContext } from '~/App';

const cx = classNames.bind(styles);
export const ProductContext = createContext();
function DefaultLayout({ children }) {
    const [action, setAction] = useState('Mặc định');
    // const { lengthCart } = useContext(LengthContext);

    return (
        <ProductContext.Provider value={{ action, setAction }}>
            {/* <LengthContext.Provider value={{ lengthCart }}> */}
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <Sidebar />
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
            {/* </LengthContext.Provider> */}
        </ProductContext.Provider>
    );
}

DefaultLayout.prototype = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
