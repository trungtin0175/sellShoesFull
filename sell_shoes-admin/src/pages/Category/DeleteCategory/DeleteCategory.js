import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);
function DeleteCategory({ categoryId }) {
  const user = useSelector((state) => state.user.accessToken);

  console.log(categoryId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/category/delete/${categoryId}`,
        {
          headers: {
            token: `Bearer ${user}`,
          },
        }
      );
      toast.success("Xóa thành công", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Thất bại, vui lòng kiểm tra lại kết nối!");
    }
  };
  return (
    <div style={{ textAlign: "center" }} className={cx("wrapper")}>
      <h1 className={cx("heading")}>Bạn có chắc xóa loại hàng này chứ</h1>
      <button onClick={handleSubmit} className={cx("form-submit")}>
        Đồng ý!
      </button>
      <ToastContainer />
    </div>
  );
}

export default DeleteCategory;
