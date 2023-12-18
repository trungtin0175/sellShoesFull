import Header from "~/layouts/components/Header";
import styles from "~/layouts/DefaultLayout/DefaultLayout.module.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";
import Sidebar from "~/layouts/components/Sidebar";
// import Footer from '~/layouts/components/Footer';

const cx = classNames.bind(styles);

function SidebarOnly({ children }) {
  return (
    <div>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <Sidebar />
          <div className={cx("content")}>{children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

SidebarOnly.prototype = {
  children: PropTypes.node.isRequired,
};

export default SidebarOnly;
