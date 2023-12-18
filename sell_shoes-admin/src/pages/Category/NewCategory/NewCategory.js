import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import axios from "axios";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const cx = classNames.bind(styles);
function NewProduct() {
  const user = useSelector((state) => state.user.accessToken);
  const [loader, setLoader] = useState(false);

  const [post, setPost] = useState({
    category: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setPost({ ...post, image: file });
  };
  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };
  const handleClearAll = () => {
    setPost({
      category: "",
      image: null,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", post.category);
    if (post.image) {
      formData.append("image", post.image);
    }

    try {
      setLoader(true);

      const response = await axios.post(
        "http://localhost:3000/api/category/create",
        formData,
        {
          headers: {
            token: `Bearer ${user}`,
          },
        }
      );
      // console.log(response);
      toast.success("Thêm thành công!", {
        autoClose: 1000,
      });
      handleClearAll();
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("heading")}>Thêm loại hàng</h3>
      <div className={cx("body")}>
        <form
          ref={inputRef}
          onSubmit={handleSubmit}
          className={cx("form")}
          id="form-1"
        >
          <div className={cx("form-group")}>
            <label htmlFor="category" className={cx("form-label")}>
              Tên loại hàng
            </label>
            <input
              id="category"
              type="text"
              placeholder="Nhập tên loại hàng"
              className={cx("form-control")}
              onChange={handleInputChange}
              name="category"
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Hình ảnh của loại hàng
            </label>
            <input
              id="image"
              type="file"
              accept=".jpg, .png"
              // placeholder="Nhập chi tiết của sản phẩm"
              className={cx("form-control")}
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <button onClick={handleClear} className={cx("form-submit")}>
            {loader === true ? <Spin /> : "Đăng tải"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
