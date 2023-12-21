import classNames from "classnames/bind";
import styles from "./Order.module.scss";
import config from "~/config";
import { Button, Input, Space, Table } from "antd";
import { useState, useRef, useEffect, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

function Order() {
  const token = useSelector((state) => state.user.accessToken);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(null);
  const [newData, setNewData] = useState([]);
  const [activeColor, setActiveColor] = useState("Tất cả");
  const handleStatus = async (id, status, id_user) => {
    // let targetStatus;
    let apiUrl;
    // Xác định trạng thái mục tiêu dựa trên trạng thái hiện tại và thiết lập apiUrl tương ứng.
    if (status === "Đã xác nhận") {
      // targetStatus = "Đã xác nhận";
      apiUrl = "http://localhost:3000/api/order/alert/confirm";
    } else if (status === "Đợi lấy hàng") {
      // targetStatus = "Đang giao";
      apiUrl = "http://localhost:3000/api/order/alert/waiting";
    } else if (status === "Đang giao") {
      // targetStatus = "Đang giao";
      apiUrl = "http://localhost:3000/api/order/alert/shipped";
    } else if (status === "Đã giao") {
      // targetStatus = "Đã giao";
      apiUrl = "http://localhost:3000/api/order/alert/delivered";
    } else {
      // Trường hợp mục tiêu khác không xác định hoặc đã giao
      console.log("Không thể thay đổi trạng thái.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/api/order/edit/${id}`,
        {
          status: status,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      await axios.post(
        apiUrl,
        {
          id_user: id_user,
          id_order: id,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCount(status);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setNewData([...data]);
  }, [data]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/all", {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // const newData = response.data.data.map((item) => {
        //   return { ...item, currentStatus: 0 }; // Gán trạng thái mặc định cho mỗi đối tượng
        // });
        setData(response.data.data);
        console.log("response.data", response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, count]);
  console.log("data", data);
  const handleAll = () => {
    setActiveColor("Tất cả");
    setNewData(data);
  };
  const handleSpending = () => {
    setActiveColor("Đang chờ");
    const Orders = data.filter((item) => item.status === "Pending");
    setNewData(Orders);
  };
  const handleConfirm = () => {
    setActiveColor("Đã xác nhận");
    const Orders = data.filter((item) => item.status === "Đã xác nhận");
    setNewData(Orders);
  };
  const handleWaiting = () => {
    setActiveColor("Đợi lấy hàng");
    const Orders = data.filter((item) => item.status === "Đợi lấy hàng");
    setNewData(Orders);
  };
  const handleDelivering = () => {
    setActiveColor("Đang giao");
    const Orders = data.filter((item) => item.status === "Đang giao");
    setNewData(Orders);
  };
  const handleDelivered = () => {
    setActiveColor("Đã giao");
    const Orders = data.filter((item) => item.status === "Đã giao");
    setNewData(Orders);
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h3 className={cx("header-text")}>Tổng các đơn hàng</h3>
      </div>
      <div className={cx("classify")}>
        <button
          onClick={handleAll}
          className={cx("classify-btn", { active: activeColor === "Tất cả" })}
        >
          Tất cả
        </button>
        <button
          onClick={handleSpending}
          className={cx("classify-btn", { active: activeColor === "Đang chờ" })}
        >
          Đang chờ
        </button>
        <button
          onClick={handleConfirm}
          className={cx("classify-btn", {
            active: activeColor === "Đã xác nhận",
          })}
        >
          Đã xác nhận
        </button>
        <button
          onClick={handleWaiting}
          className={cx("classify-btn", {
            active: activeColor === "Đợi lấy hàng",
          })}
        >
          Đã xác nhận
        </button>
        <button
          onClick={handleDelivering}
          className={cx("classify-btn", {
            active: activeColor === "Đang giao",
          })}
        >
          Đang giao
        </button>
        <button
          onClick={handleDelivered}
          className={cx("classify-btn", { active: activeColor === "Đã giao" })}
        >
          Đã giao
        </button>
      </div>
      <div className={cx("content-wrapper")}>
        {Array.isArray(newData) && newData.length !== 0 ? (
          newData.map((pro, index) => (
            <div key={index} className={cx("content")}>
              <div className={cx("address")}>
                <div className={cx("address-heading")}>
                  <h3 className={cx("address-header")}>THÔNG TIN NHẬN HÀNG</h3>
                  <p className={cx("address-time")}>{pro.dateOrder}</p>
                </div>
                <div className={cx("address-content")}>
                  <h3 className={cx("address-content-name")}>
                    Tên người nhận: {pro.id_note.fullname}
                  </h3>
                  <p className={cx("address-content-tel")}>
                    SĐT: {pro.id_note.phone}
                  </p>
                  <p className={cx("address-content-add")}>
                    Địa chỉ: {pro.adress}
                  </p>
                </div>
              </div>
              <div className={cx("content-top")}>
                <div className={cx("content-column")}>
                  {pro.orderProducts.map((orderPro, index) => (
                    <div key={index} className={cx("content-item")}>
                      <div className={cx("content-left")}>
                        <div className={cx("content-img")}>
                          <img
                            src={orderPro.id_product.image[0]}
                            alt="image"
                            className={cx("content-image")}
                          ></img>
                        </div>
                        <div className={cx("body")}>
                          <h3 className={cx("body-name")}>
                            {orderPro.id_product.name_product}
                          </h3>
                          <div className={cx("body-action")}>
                            <p className={cx("body-action-quantity")}>
                              x{orderPro.quantity}
                            </p>
                            <p className={cx("body-action-size")}>
                              size: {orderPro.size}
                            </p>
                            <p className={cx("body-action-price")}>
                              {orderPro.unit_price.toLocaleString()} VNĐ
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={cx("content-right")}>
                  <div className={cx("status")}>
                    {pro.status === "Pending" && (
                      <button
                        onClick={() =>
                          handleStatus(pro._id, "Đã xác nhận", pro.id_user)
                        }
                        className={cx("status-post")}
                      >
                        Đã xác nhận
                      </button>
                    )}
                    {pro.status === "Đã xác nhận" && (
                      <button
                        onClick={() =>
                          handleStatus(pro._id, "Đợi lấy hàng", pro.id_user)
                        }
                        className={cx("status-waiting")}
                      >
                        Đợi lấy hàng
                      </button>
                    )}
                    {pro.status === "Đợi lấy hàng" && (
                      <button
                        onClick={() =>
                          handleStatus(pro._id, "Đang giao", pro.id_user)
                        }
                        className={cx("status-delivering")}
                      >
                        Đang giao
                      </button>
                    )}
                    {pro.status === "Đang giao" && (
                      <button
                        onClick={() =>
                          handleStatus(pro._id, "Đã giao", pro.id_user)
                        }
                        className={cx("status-delivered")}
                      >
                        Đã giao
                      </button>
                    )}
                    {pro.status === "Đã giao" && (
                      <button
                        // onClick={() => handleStatus(pro._id, "Đã giao")}
                        // disabled
                        className={cx("status-deliver")}
                      >
                        Đã giao
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className={cx("content-bottom")}>
                {/* <p className={cx("content-method")}>
                  Phương thức thanh toán: {pro.method}
                </p> */}
                <p className={cx("content-bottom-price")}>
                  Tổng tiền: {pro.totalPrice.toLocaleString()} VNĐ
                </p>
                <p className={cx("content-bottom-price")}>
                  {pro.id_payment.payName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className={cx("no-product")}>Không có sản phẩm nào!</div>
        )}
      </div>
    </div>
  );
}

export default Order;
