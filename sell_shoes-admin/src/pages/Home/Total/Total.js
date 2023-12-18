import classNames from "classnames/bind";
import styles from "./Total.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faBagShopping,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import config from "~/config";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const cx = classNames.bind(styles);

function Total() {
  const token = useSelector((state) => state.user.accessToken);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [revenueCount, setRevenueCount] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    axios
      .all([
        axios.get("http://localhost:3000/api/order/number", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/api/user/number", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/api/sell/number", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
        axios.get("http://localhost:3000/api/total/revenue", {
          headers: {
            token: `Bearer ${token}`,
          },
        }),
      ])
      .then(
        axios.spread(
          (orderResponse, usersResponse, productResponse, revenueResponse) => {
            const orderData = orderResponse.data;
            const usersData = usersResponse.data;
            const productData = productResponse.data; // Thay đổi dựa trên cấu trúc của dữ liệu từ yêu cầu API này
            const revenueData = revenueResponse.data; // Thay đổi dựa trên cấu trúc của dữ liệu từ yêu cầu API này

            // Tiếp tục xử lý dữ liệu của bạn
            setOrderCount(orderData);
            setUserCount(usersData);
            setProductCount(productData);
            setRevenueCount(revenueData);
            setCount(count + 1);
            // setOrderLength(orderData.length);
          }
        )
      )
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  console.log("order", orderCount);
  // useEffect(() => {
  //   const priceTotal = orderCount.reduce((total, order) => {
  //     if (order.status === "Đã giao") {
  //       return total + order.totalPrice;
  //     }
  //     return total;
  //   }, 0);
  //   setRevenueCount(priceTotal);
  // }, [count]);
  // console.log("1234", revenueCount);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("title")}>
        <div className={cx("icon", "first")}>
          <FontAwesomeIcon icon={faDollar} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng doanh thu</h4>
          <span className={cx("item-result")}>
            {revenueCount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "second")}>
          <FontAwesomeIcon icon={faBagShopping} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Sản phẩm đã bán</h4>
          <span className={cx("item-result")}>{productCount.data}</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "third")}>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng số đơn</h4>
          <span className={cx("item-result")}>{orderCount}</span>
        </div>
      </div>
      <div className={cx("title")}>
        <div className={cx("icon", "four")}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className={cx("item")}>
          <h4 className={cx("item-name")}>Tổng người dùng</h4>
          <span className={cx("item-result")}>{userCount}</span>
        </div>
      </div>
    </div>
  );
}

export default Total;
