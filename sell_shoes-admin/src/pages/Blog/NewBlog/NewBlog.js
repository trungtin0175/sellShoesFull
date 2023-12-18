import classNames from "classnames/bind";
import styles from "~/pages/Blog/Blog.module.scss";
// import styles from "~/pages/NewProduct/NewProduct.module.scss";
import "~/layouts/components/GridStyle";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space, TimePicker } from "antd";
import Content from "./Content";
import { Spin } from "antd";

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
function NewBlog() {
  // const users = useSelector((state) => state.user.fullname);
  // console.log(users);
  const user = useSelector((state) => state.user.accessToken);
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [selectedTime, setSelectedTime] = useState([null, null]);
  const [product, setProduct] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: [],
    body: "",
    id_product: [],
    createAt: "",
    endDate: "",
  });
  const [category, setCategory] = useState([]);
  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };
  const handleTimeChange = (dates) => {
    setSelectedTime(dates);
  };
  console.log(selectedCategories);
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
      setFormData({
        ...formData,
        createAt: formattedStartDate,
        endDate: formattedEndDate,
      });
    } else {
      console.error(
        "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc trước khi lưu."
      );
    }
  };
  // Hàm xử lý khi người dùng chọn/click vào ô input category
  const handleCategorySelect = (categoryName) => {
    // Kiểm tra nếu categoryName đã tồn tại trong danh sách đã chọn thì xóa nó đi, ngược lại thì thêm vào danh sách
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((category) => category !== categoryName)
      );
    } else {
      setSelectedCategories((prevCategories) => [
        ...prevCategories,
        categoryName,
      ]);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category/all")
      .then((response) => {
        console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "quantity"
          ? parseInt(value)
          : name === "newPrice_product" || name === "oldPrice_product"
          ? parseFloat(value)
          : value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };
  // const handleIdProductChange = (proId) => {
  //   if (formData.id_product.includes(proId)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       id_product: prev.id_product.filter((item) => item !== proId),
  //     }));
  //   } else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       id_product: [...prev.id_product, proId],
  //     }));
  //   }
  // };
  const handleIdProductChange = (proId) => {
    if (formData.id_product.includes(proId)) {
      setFormData((prev) => ({
        ...prev,
        id_product: prev.id_product.filter((item) => item !== proId),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        id_product: [...prev.id_product, proId],
      }));
    }
  };

  const handleSelectChange = (e) => {
    e.preventDefault();
  };
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();

    form.append("title", formData.title);
    form.append("body", formData.body);
    form.append("image", formData.image);
    // if (formData.image.length > 0) {
    //   formData.image.forEach((image) => {
    //     // form.append("image", JSON.stringify(image));
    //     form.append("image", image);
    //   });
    // }
    // if (formData.image.length > 0) {
    //   form.append("image", formData.image);
    // }
    // form.append("id_product", formData.id_product);
    // if (formData.id_product.length > 0) {
    //   formData.id_product.forEach((id_product) => {
    //     // form.append("id_product", id_product);
    //     form.append("id_product", JSON.stringify(id_product));
    //   });
    // }
    if (formData.id_product.length > 0) {
      form.append("id_product", JSON.stringify(formData.id_product));
    }
    form.append("createAt", formData.createAt);
    form.append("endDate", formData.endDate);
    // console.log(formData.category);
    // console.log(formData.size);
    try {
      setLoader(true);

      const response = await axios.post(
        "http://localhost:3000/api/createBlog",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${user}`,
          },
        }
      );
      toast.success("Thêm sản phẩm thành công!", {
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message, {
        autoClose: 1000,
      });
    } finally {
      setLoader(false);
    }
    console.log("data", formData);
  };
  console.log("data", formData);
  const handleSubmitCategory = (e) => {
    e.preventDefault();
    const a = [];
    // useEffect(() => {
    axios
      .get("http://localhost:3000/api/allproduct")
      .then((response) => {
        const filterProduct = response.data.filter((res) =>
          selectedCategories.includes(res.id_category.category)
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
  console.log("product", product);
  console.log("product", product);
  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("heading")}>Thêm bài viết</h3>
      <div className={cx("body")}>
        <form
          ref={inputRef}
          onSubmit={handleSubmit}
          className={cx("form")}
          id="form-1"
        >
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
              {category.map((cate, index) => (
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
            {/* <Space
              // className={cx("form-control")}
              direction="vertical"
              size={12}
            >
              <RangePicker onChange={handleRangeChange} />
            </Space>
            <button
              onClick={handleDateClick}
              className={cx("form-submit--category")}
            >
              Ok
            </button> */}
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

export default NewBlog;
