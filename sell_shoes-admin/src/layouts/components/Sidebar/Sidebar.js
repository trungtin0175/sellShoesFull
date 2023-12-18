import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faShop,
  faList,
  faSignOut,
  faTableCells,
  faBagShopping,
  faNewspaper,
  faChartSimple,
  faBarsProgress,
} from "@fortawesome/free-solid-svg-icons";
import config from "~/config";
import Menu, { MenuItem } from "./Menu";

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx("wrapper")}>
      <Menu>
        <MenuItem
          title="Home"
          to={config.routes.home}
          icon={<FontAwesomeIcon icon={faHome} />}
        />
        <MenuItem
          title="Statistical"
          to={config.routes.statistical}
          icon={<FontAwesomeIcon icon={faBarsProgress} />}
        />
        <MenuItem
          title="User"
          to={config.routes.user}
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <MenuItem
          title="Product"
          to={config.routes.product}
          icon={<FontAwesomeIcon icon={faList} />}
        />
        <MenuItem
          title="Category"
          to={config.routes.category}
          icon={<FontAwesomeIcon icon={faTableCells} />}
        />
        <MenuItem
          title="Order"
          to={config.routes.order}
          icon={<FontAwesomeIcon icon={faBagShopping} />}
        />
        <MenuItem
          title="Blog"
          to={config.routes.blog}
          icon={<FontAwesomeIcon icon={faNewspaper} />}
        />
        <MenuItem
          title="Sales"
          to={config.routes.sales}
          icon={<FontAwesomeIcon icon={faChartSimple} />}
        />
      </Menu>
    </aside>
  );
}

export default Sidebar;
