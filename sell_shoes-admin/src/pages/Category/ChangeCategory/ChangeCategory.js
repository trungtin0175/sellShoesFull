import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";

const cx = classNames.bind(styles);
function ChangeCategory({ categoryId }) {
  const user = useSelector((state) => state.user.accessToken);
  const [loader, setLoader] = useState(false);

  const [category, setCategory] = useState({
    category: "",
    image: null,
  });
  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };
  const handleClearAll = () => {
    setCategory({
      category: "",
      image: null,
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCategory({ ...category, image: file });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", category.category);
    formData.append("image", category.image);
    try {
      setLoader(true);

      const response = await axios.put(
        `http://localhost:3000/api/category/edit/${categoryId}`,
        formData,
        {
          headers: {
            token: `Bearer ${user}`,
          },
        }
      );
      toast.success("Thay đổi thành công!", {
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
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/api/category/edit/${categoryId}`)
  //     .then((response) => {
  //       setCategory(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [categoryId]);

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("heading")}>Thay đổi thông tin loại hàng</h3>
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
              name="category"
              value={category.category}
              onChange={handleInputChange}
              placeholder="Nhập tên loại hàng"
              className={cx("form-control")}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Hình ảnh của loại hàng
            </label>
            <input
              id="image"
              type="file"
              name="image"
              // value={post.image || blog.image}
              accept=".jpg, .png"
              className={cx("form-control")}
              onChange={handleImageChange}
            />
          </div>
          <button className={cx("form-submit")}>
            {loader === true ? <Spin /> : "Sửa đổi"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ChangeCategory;
