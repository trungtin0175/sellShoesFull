import classNames from "classnames/bind";
import styles from "./Statiscal.module.scss";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import RequestRevenue from "./RequestRevenue";
import Inventory from "./Inventory";
import SaleRevenue from "./SaleRevenue";

const cx = classNames.bind(styles);

function Statistical() {
  const token = useSelector((state) => state.user.accessToken);
  const [activeColor, setActiveColor] = useState("Daily revenue");
  // const [activePlace, setActivePlace] = useState('')

  const handleDaily = () => {
    setActiveColor("Daily revenue");
  };
  const handleInventory = () => {
    setActiveColor("Inventory");
  };
  const handleSale = () => {
    setActiveColor("Sale revenue");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("classify")}>
          <button
            onClick={handleDaily}
            className={cx("classify-btn", {
              active: activeColor === "Daily revenue",
            })}
          >
            Doanh thu từng ngày
          </button>
          <button
            onClick={handleInventory}
            className={cx("classify-btn", {
              active: activeColor === "Inventory",
            })}
          >
            Tồn kho
          </button>
          <button
            onClick={handleSale}
            className={cx("classify-btn", {
              active: activeColor === "Sale revenue",
            })}
          >
            Doanh thu đợt sale
          </button>
        </div>
      </div>
      <div className={cx("request")}>
        {activeColor === "Daily revenue" && (
          <>
            <h2 className={cx("request-name")}>
              Doanh thu theo từng ngày (không quá 30 ngày)
            </h2>
            <RequestRevenue />
          </>
        )}
        {activeColor === "Inventory" && (
          <>
            <h2 className={cx("request-name")}>Tồn kho của sản phẩm</h2>
            <Inventory />
          </>
        )}
        {activeColor === "Sale revenue" && (
          <>
            <h2 className={cx("request-name")}>Doanh thu từng đợt sale</h2>
            <SaleRevenue />
          </>
        )}
      </div>
    </div>
  );
}

export default Statistical;
