import Header from "~/layouts/components/Header";
// import Footer from '~/layouts/components/Footer';
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Sidebar from "~/layouts/components/Sidebar";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <Sidebar />
        <div className={cx("content")}>{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

DefaultLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
