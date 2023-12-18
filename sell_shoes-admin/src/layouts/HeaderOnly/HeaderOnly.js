import Header from "~/layouts/components/Header";
import styles from "~/layouts/DefaultLayout/DefaultLayout.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
// import Footer from '~/layouts/components/Footer';

const cx = classNames.bind(styles);

function HeaderOnly({ children }) {
  return (
    <div>
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("container")}>
          <div className={cx("content")}>{children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

HeaderOnly.prototype = {
  children: PropTypes.node.isRequired,
};

export default HeaderOnly;
