import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function DeleteProduct({ productId }) {
  const user = useSelector((state) => state.user.accessToken);

  //   console.log(productId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/product/delete/${productId}`,
        {
          headers: {
            token: `Bearer ${user}`,
          },
        }
      );
      toast.success("Xóa thành công!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Thất bại, vui lòng kiểm tra lại kết nối!");
    }
  };
  return (
    <div style={{ textAlign: "center" }} className={cx("wrapper")}>
      <h1 className={cx("heading")}>Bạn có chắc xóa sản phẩm này chứ</h1>
      <button onClick={handleSubmit} className={cx("form-submit")}>
        Đồng ý!
      </button>
      <ToastContainer />
    </div>
  );
}

export default DeleteProduct;
