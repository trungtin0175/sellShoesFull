import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { DatePicker, Space, TimePicker, Spin } from "antd";
import Content from "../NewBlog/Content";

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
function ChangeBlog({ categoryId }) {
  const user = useSelector((state) => state.user.accessToken);
  console.log(user);
  const [loader, setLoader] = useState(false);

  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [selectedTime, setSelectedTime] = useState([null, null]);
  const [product, setProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    image: [],
    body: "",
    id_product: [],
    createAt: "",
    endDate: "",
    // name_product: "",
    // price_product: "",
    // // newPrice_product: "",
    // sizes: [],
    // image: [],
    // // quantity: "",
    // describe: "",
    // detail: "",
    // category: "default",
  });
  const [category, setCategory] = useState([]);
  //   const [size, setSize] = useState("");
  //   const [quantity, setQuantity] = useState("");
  //   const [quantityOfSize, setQuantityOfSize] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category/all")
      .then((response) => {
        setSelectedCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };

  const handleClearAll = () => {
    setCurrentProduct({
      title: "",
      image: [],
      body: "",
      id_product: [],
      createAt: "",
      endDate: "",
    });
  };
  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };
  const handleTimeChange = (dates) => {
    setSelectedTime(dates);
  };
  const handleDateClick = (e) => {
    e.preventDefault();
    if (
      selectedRange[0] &&
      selectedRange[1] &&
      selectedTime[0] &&
      selectedTime[1]
    ) {
      // const startDate = selectedRange[0].format("YYYY-MM-DD");
      // const endDate = selectedRange[1].format("YYYY-MM-DD");
      // const startTime = selectedRange[0].format("HH:mm");
      // const endTime = selectedRange[1].format("HH:mm");
      const startDate = selectedRange[0].format("YYYY-MM-DD");
      const endDate = selectedRange[1].format("YYYY-MM-DD");
      const startTime = selectedTime[0].format("HH:mm");
      const endTime = selectedTime[1].format("HH:mm");

      const formattedStartDate = `${startDate
        .split("-")
        .reverse()
        .join("-")} ${startTime}`;
      const formattedEndDate = `${endDate
        .split("-")
        .reverse()
        .join("-")} ${endTime}`;
      // Gửi giá trị ngày bắt đầu và ngày kết thúc cho bên backend bằng một yêu cầu HTTP (ví dụ sử dụng axios)
      console.log(formattedStartDate, formattedEndDate);
      setCurrentProduct({
        ...currentProduct,
        createAt: formattedStartDate,
        endDate: formattedEndDate,
      });
    } else {
      console.error(
        "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc trước khi lưu."
      );
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      //   [name]:
      //     name === "quantity"
      //       ? value === ""
      //         ? null
      //         : parseInt(value)
      //       : name === "newPrice_product" || name === "price_product"
      //       ? value === ""
      //         ? null
      //         : parseFloat(value)
      //       : value,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    // const file = e.target.files[0];
    // setCurrentProduct({ ...currentProduct, image: file });
    const files = Array.from(e.target.files); // Chuyển đổi FileList thành mảng
    setCurrentProduct({ ...currentProduct, image: files });
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    const sizeValue = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    setCurrentProduct({ ...currentProduct, [name]: sizeValue });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };
  const handleCategorySelect = (categoryName) => {
    // Kiểm tra nếu categoryName đã tồn tại trong danh sách đã chọn thì xóa nó đi, ngược lại thì thêm vào danh sách
    if (category.includes(categoryName)) {
      setCategory((prevCategories) =>
        prevCategories.filter((category) => category !== categoryName)
      );
    } else {
      setCategory((prevCategories) => [...prevCategories, categoryName]);
    }
  };
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    const a = [];
    // useEffect(() => {
    axios
      .get("http://localhost:3000/api/allproduct")
      .then((response) => {
        const filterProduct = response.data.filter((res) =>
          category.includes(res.id_category.category)
        );
        setProduct(filterProduct);
        // if (
        //   response.data.data.filter(
        //     (res) => res.id_category.category === selectedCategories
        //   )
        // ) {
        //   setProduct(response.data.data);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
    // }, []);
  };
  const handleIdProductChange = (proId) => {
    if (currentProduct.id_product.includes(proId)) {
      setCurrentProduct((prev) => ({
        ...prev,
        id_product: prev.id_product.filter((item) => item !== proId),
      }));
    } else {
      setCurrentProduct((prev) => ({
        ...prev,
        id_product: [...prev.id_product, proId],
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", currentProduct.title);
    form.append("body", currentProduct.body);
    form.append("image", currentProduct.image);
    if (currentProduct.id_product.length > 0) {
      form.append("id_product", JSON.stringify(currentProduct.id_product));
    }
    form.append("createAt", currentProduct.createAt);
    form.append("endDate", currentProduct.endDate);

    try {
      setLoader(true);

      const response = await axios.put(
        `http://localhost:3000/api/update/blog/${categoryId}`,
        form,
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

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/blog/detail/${categoryId}`, {
        headers: {
          token: `Bearer ${user}`,
        },
      })
      .then((response) => {
        setCurrentProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryId]);
  console.log("currentProduct", currentProduct);
  return (
    <div className={cx("wrapper-change")}>
      <h3 className={cx("heading")}>Thay đổi bài viết</h3>
      <div className={cx("body")}>
        <form onSubmit={handleSubmit} className={cx("form")} id="form-1">
          <div className={cx("form-group")}>
            <label htmlFor="title" className={cx("form-label")}>
              Tiêu đề bài viết
            </label>
            <input
              id="title"
              type="text"
              placeholder="Nhập tiêu đề bài viết"
              className={cx("form-control")}
              name="title"
              onChange={handleInputChange}
              value={currentProduct.title}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="body" className={cx("form-label")}>
              Nội dung của bài viết
            </label>
            <textarea
              id="body"
              type="text"
              placeholder="Nhập nội dung bài viết"
              className={cx("form-control")}
              name="body"
              onChange={handleInputChange}
              rows="4"
              style={{
                height: "200px",
              }}
              value={currentProduct.body}
            />
          </div>

          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Hình ảnh của bài viết
            </label>
            <input
              id="image"
              type="file"
              accept=".jpg, .png"
              placeholder="Nhập chi tiết của sản phẩm"
              className={cx("form-control")}
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="category" className={cx("form-label")}>
              Phân loại sản phẩm (chọn để lọc sản phẩm cần gán)
            </label>
            <div
              className={cx("form-control-category", "form-category")}
              name="category"
              id="category"
            >
              {selectedCategories.map((cate, index) => (
                <div className={cx("category-input")} key={cate._id}>
                  <input
                    onChange={() => handleCategorySelect(cate.category)}
                    type="checkbox"
                    id={`category-${index}`}
                    value={cate.category}
                  />
                  <label htmlFor={`category-${index}`}>{cate.category}</label>
                </div>
              ))}
              <button
                onClick={handleSubmitCategory}
                className={cx("form-submit--category")}
              >
                Duyệt
              </button>
            </div>
          </div>
          <div className={cx("form123")}>
            {/*form-group */}
            <label htmlFor="size" className={cx("form-label")}>
              Các sản phẩm muốn gán
            </label>
            {/* <select
              name="_id"
              id="_id"
              multiple
              className={cx("form-select", "form-select-product")}
              onChange={handleIdProductChange}
              // value={product.name}
            >
              {product.map((pro) => (
                <option key={pro._id} value={pro._id}>
                  {pro.name_product}
                </option>
              ))}
            </select> */}
            <div
              className={cx("form-product", "row", "sm-gutter")}
              name="category"
              id="category"
            >
              {product.map((pro, index) => (
                // <div className={cx("form-select-product")} key={pro._id}>
                <div className={cx("col", "l-3", "c-6")} key={index}>
                  <input
                    onChange={() => handleIdProductChange(pro._id)}
                    type="checkbox"
                    id={`category-${index}`}
                    value={pro._id}
                  />
                  <Content product={pro} />
                  {/* <label htmlFor={`category-${index}`}>
                    {pro.name_product}
                  </label> */}
                </div>
              ))}
            </div>
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Chọn thời gian hiện bài viết
            </label>
            <div className={cx("sales")}>
              {/* <div className={cx("form-sales")}> */}
              <Space direction="vertical" size={12}>
                <RangePicker onChange={handleRangeChange} />
              </Space>
              <Space direction="vertical" size={15}>
                <TimePicker.RangePicker
                  onChange={handleTimeChange}
                  status="Warning"
                />
              </Space>
              {/* </div> */}
              <button
                onClick={handleDateClick}
                className={cx("form-submit--category")}
              >
                Ok
              </button>
            </div>
          </div>
          <button className={cx("form-submit")}>
            {loader === true ? <Spin /> : "Đăng tải"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default ChangeBlog;
