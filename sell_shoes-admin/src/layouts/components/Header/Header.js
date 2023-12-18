import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/assets/img";
// import Search from "../Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import config from "~/config";
import routes from "~/config/routes";
import { Link, useNavigate } from "react-router-dom";
import { resetUser } from "~/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);
function Header() {
  const user = useSelector((state) => state.user);
  // console.log(user.user._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetUser());
    navigate("/");
  };
  // const isLoggedIn = !!user.email;
  // if (!isLoggedIn) {
  //   return <navigate to={config.routes.login} />;
  // }
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={config.routes.home} className={cx("logo-link")}>
            <img className={cx("logo-img")} src={images.logo} alt="Logo"></img>
          </Link>
          <h4 className={cx("logo-title")}>Không Đẹp Hoàn Tiền!</h4>
        </div>
        <div className={cx("actions")}>
          <Link to={config.routes.chat} className={cx("user")}>
            <div className={cx("action-icon")}>
              <FontAwesomeIcon icon={faMessage} />
            </div>
            <div className={cx("action-name")}>Tin nhắn</div>
          </Link>
          <Link
            to={config.routes.login}
            onClick={handleLogout}
            className={cx("user")}
          >
            <div className={cx("action-icon")}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={cx("action-name")}>Đăng xuất</div>
          </Link>
          {/* {user.email ? ( */}
          {/* // ) : (
          //   <Link to={config.routes.login} className={cx("user")}>
          //     <div className={cx("action-icon")}>
          //       <FontAwesomeIcon icon={faUser} />
          //     </div>
          //     <div className={cx("action-name")}>Đăng nhập</div>
          //   </Link>
          // )} */}
        </div>
      </div>
    </header>
  );
}

export default Header;
