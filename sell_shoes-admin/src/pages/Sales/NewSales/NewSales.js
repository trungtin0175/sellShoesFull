import classNames from "classnames/bind";
import styles from "./NewSales.module.scss";
// import styles from "~/pages/NewProduct/NewProduct.module.scss";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, Space, TimePicker } from "antd";
import "~/layouts/components/GridStyle";
import Content from "~/pages/Blog/NewBlog/Content";
import { Form } from "react-router-dom";
import { sassNull } from "sass";
import { Spin } from "antd";

const { RangePicker } = DatePicker;
const cx = classNames.bind(styles);
function NewSales() {
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [selectedTime, setSelectedTime] = useState([null, null]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [productConflict, setProductConflict] = useState([]);
  const [saleInfo, setSaleInfo] = useState([]);
  const [category, setCategory] = useState([]);
  const [numberOfForms, setNumberOfForms] = useState(1);
  const [productQuantities, setProductQuantities] = useState({});
  const [loader, setLoader] = useState(false);

  // const [selectedProduct, setSelectedProduct] = useState([]);
  const [formData, setFormData] = useState({
    startSale: "",
    endSale: "",
    saleProducts: [
      // {
      //   promotion: "",
      //   id_product: "",
      //   price: "",
      // },
    ],
  });
  const [promotion, setPromotion] = useState(null);
  const [limit, setLimit] = useState(null);
  const [chooseProduct, setChooseProduct] = useState({});

  const user = useSelector((state) => state.user.accessToken);
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
        startSale: formattedStartDate,
        endSale: formattedEndDate,
      });
    } else {
      console.error(
        "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc trước khi lưu."
      );
    }
  };
  // const handleDateClick = (e) => {
  //   e.preventDefault();

  //   if (
  //     selectedRange[0] &&
  //     selectedRange[1] &&
  //     selectedTime[0] &&
  //     selectedTime[1]
  //   ) {
  //     const startDate = selectedRange[0].format("YYYY-MM-DD");
  //     const endDate = selectedRange[1].format("YYYY-MM-DD");
  //     const startTime = selectedTime[0].format("HH:mm");
  //     const endTime = selectedTime[1].format("HH:mm");

  //     const formattedStartDate = `${startDate} ${startTime}`;
  //     const formattedEndDate = `${endDate} ${endTime}`;

  //     // Gửi giá trị ngày bắt đầu và ngày kết thúc cho bên backend bằng một yêu cầu HTTP (ví dụ sử dụng axios)
  //     console.log(formattedStartDate, formattedEndDate);
  //     setFormData({
  //       ...formData,
  //       startSale: formattedStartDate,
  //       endSale: formattedEndDate,
  //     });
  //   } else {
  //     console.error(
  //       "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc trước khi lưu."
  //     );
  //   }
  // };

  const addNewForm = () => {
    setSaleInfo([
      ...saleInfo,
      {
        promotion: promotion,
        limit: limit,
        product: chooseProduct,
      },
    ]);
    setFormData({
      ...formData,
      saleProducts: [
        ...formData.saleProducts,
        {
          promotion: promotion,
          limit: limit,
          id_product: chooseProduct._id,
          price: chooseProduct.price_product,
        },
      ],
    });
    setPromotion("");
    setLimit("");
    setChooseProduct(null);
  };
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
        // console.log(response.data);
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // const handleSubmitCategory = (e) => {
  //   e.preventDefault();
  //   const a = [];
  //   const start = formData.startSale;
  //   const end = formData.endSale;

  //   axios
  //     .get(
  //       "http://localhost:3000/api/all/sale",
  //       {
  //         startSale: formData.startSale,
  //         endSale: formData.endSale,
  //       },
  //       {}
  //     )
  //     .then((response) => {
  // const filterProductConflict = response.data.productWithConflict?.filter(
  //   (res) =>
  //     selectedCategories.includes(res.saleProducts.id_product.id_category)
  // );
  // const filterProduct = response.data.nonProductsWithConflict?.filter(
  //   (res) => selectedCategories.includes(res.id_category)
  // );
  // setProductConflict(filterProductConflict);
  // setProduct(filterProduct);
  // console.log("reass", response);
  // if (
  //   response.data.data.filter(
  //     (res) => res.id_category.category === selectedCategories
  //   )
  // ) {
  //   setProduct(response.data.data);
  // }
  //     })
  //     .catch((error) => {
  //       console.log("err", error);
  //     });
  // };
  const handleSubmitCategory = async (e) => {
    e.preventDefault();
    const form = {
      startSale: formData.startSale,
      endSale: formData.endSale,
    };
    console.log(form);
    try {
      const res = await axios.post("http://localhost:3000/api/all/sale", form);
      console.log(res.data.data);
      // const filterProductConflict = res.data.data.productWithConflict?.filter(
      //   (res) =>
      //     res.saleProducts?.some((respon) =>
      //       selectedCategories.includes(respon.id_product.id_category)
      //     )
      //   // selectedCategories.includes(res.saleProducts.id_product.id_category)
      // );
      const filterProductConflict = res.data.data.productWithConflict?.flatMap(
        (product) =>
          product.saleProducts?.filter((saleProduct) =>
            selectedCategories.includes(saleProduct.id_product.id_category)
          )
      );
      // let filterProductConflict = res.data.data.nonProductsWithConflict;
      // selectedCategories.forEach((item) => {
      //   console.log(selectedCategories, item, "item");
      // });
      const filterProduct = res.data.data.nonProductsWithConflict?.filter(
        (res) => selectedCategories.includes(res.id_category)
      );
      setProductConflict(filterProductConflict);
      setProduct(filterProduct);
      // if (
      //   res.data.data.filter(
      //     (res) => res.id_category.category === selectedCategories
      //   )
      // ) {
      //   setProduct(res.data.data);
      // }
      const quantities = {};
      product.forEach((pro) => {
        if (selectedCategories.includes(pro.id_category)) {
          quantities[pro._id] = pro.sizes.reduce(
            (total, size) => total + size.quantity,
            0
          );
        }
      });
      filterProduct.forEach((pro) => {
        quantities[pro._id] = pro.sizes.reduce(
          (total, size) => total + size.quantity,
          0
        );
      });
      console.log("quantitysize", quantities);
      setProductQuantities(quantities);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("123", product);
  console.log("12345", productConflict);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    const form = new FormData();
    form.append("startSale", formData.startSale);
    form.append("endSale", formData.endSale);
    // form.append("sizes", JSON.stringify(formData.sizes));
    if (formData.saleProducts.length > 0) {
      formData.saleProducts.forEach((saleProduct) => {
        form.append("saleProducts", saleProduct);
      });
    }
    // form.append("newPrice_product", formData.newPrice_product);
    // form.append("size", formData.sizes);
    // formData.image.forEach((image, index) =>
    //   form.append(`image_${index}`, image);
    // });
    // if (formData.image.length > 0) {
    //   formData.image.forEach((image) => {import { Spin } from "antd";
    //     form.append("image", image);
    //   });
    // }
    // // form.append("quantity", formData.quantity);
    // form.append("describe", formData.describe);
    // form.append("detail", formData.detail);
    // // form.append("image", formData.image);
    // form.append("category", formData.category);
    try {
      setLoader(true);

      const response = await axios.post(
        "http://localhost:3000/api/createSale",
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
      // handleClearAll();
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
  //   setSaleInfo();
  // }, [saleInfo]);
  const handleDeleteProduct = (index) => {
    // setQuantityOfSize(() => {
    //   const newData = quantityOfSize.filter((_, i) => i !== index);
    //   return newData;
    // });
    setSaleInfo(() => {
      const newProduct = saleInfo.filter((_, i) => i !== index);
      console.log(newProduct);
      return newProduct;
    });
    setFormData(() => {
      const newForm = formData.saleProducts.filter((_, i) => i !== index);
      console.log(newForm);
      return {
        ...formData,
        saleProducts: newForm,
      };
    });
  };
  console.log("pro", product);

  return (
    <div className={cx("wrapper")}>
      <h3 className={cx("heading")}>Thêm sản phẩm giảm giá</h3>
      <div className={cx("body")}>
        <form
          // ref={inputRef}
          onSubmit={handleSubmit}
          className={cx("form")}
          id="form-1"
        >
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Chọn thời gian sản phẩm giảm giá
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
                Chọn ngày
              </button>
            </div>
          </div>
          {Array.from({ length: numberOfForms }).map((_, index) => (
            <div key={index}>
              {/* <h1>SẢN PHẨM {index + 1}</h1> */}
              <div className={cx("form-group", "form-sale")}>
                <label htmlFor="category" className={cx("form-label")}>
                  Nhập phần trăm giá sản phẩm muốn giảm
                </label>
                <input
                  id="sale"
                  type="text"
                  value={promotion}
                  placeholder="Nhập số (phần trăm)"
                  className={cx("form-control")}
                  onChange={(e) => setPromotion(e.target.value)}
                />
              </div>
              <div className={cx("form-group", "form-sale")}>
                <label htmlFor="category" className={cx("form-label")}>
                  Nhập số lượng sản phẩm muốn giảm
                </label>
                <input
                  id="limit"
                  type="text"
                  value={limit}
                  placeholder="Nhập số lượng"
                  className={cx("form-control")}
                  onChange={(e) => setLimit(e.target.value)}
                />
              </div>
              <div className={cx("form-group")}>
                <label htmlFor="category" className={cx("form-label")}>
                  Phân loại sản phẩm (chọn để lọc sản phẩm cần giảm giá)
                </label>
                <div
                  className={cx("form-control-category", "form-category")}
                  name="category"
                  id="category"
                >
                  {category.map((cate, index) => (
                    <div className={cx("category-input")} key={cate._id}>
                      <input
                        onChange={() => handleCategorySelect(cate._id)}
                        type="checkbox"
                        id={`category-${index}`}
                        value={cate.category}
                      />
                      <label htmlFor={`category-${index}`}>
                        {cate.category}
                      </label>
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
              {product.length > 0 ? (
                <>
                  <div className={cx("form-group")}>
                    <label htmlFor="size" className={cx("form-label")}>
                      Các sản phẩm muốn gán
                    </label>
                    {/* <select
                  name="product"
                  id="product"
                  multiple
                  className={cx("form-select", "form-select-product")}
                  // onChange={handleSizeChange}
                  value={product.name}
                >
                  {product.map((pro) => (
                    <option key={pro._id} value={pro.name_product}>
                      {pro.name_product}
                    </option>
                  ))}
                </select> */}
                    <div
                      className={cx("form-product", "row", "sm-gutter")}
                      name="category"
                      id="category"
                    >
                      {productConflict.map((pro, index) => (
                        // <div className={cx("form-select-product")} key={pro._id}>
                        <div
                          className={cx("col", "l-3", "c-6", "product")}
                          key={index}
                        >
                          <div className={cx("productConflict")}>
                            <input
                              type="radio"
                              id={`category-${index}`}
                              name={`product-${index}`}
                              // checked={pro === chooseProduct}
                              value={pro}
                              onChange={() => setChooseProduct(pro)}
                              disabled
                            />

                            <Content product={pro.id_product} />
                          </div>
                        </div>
                      ))}

                      {product.map((pro, index) => (
                        // <div className={cx("form-select-product")} key={pro._id}>
                        <div className={cx("col", "l-3", "c-6")} key={index}>
                          <div className={cx("wrap-header-product")}>
                            <input
                              type="radio"
                              id={`category-${index}`}
                              name={`product-${index}`}
                              checked={pro === chooseProduct}
                              value={pro}
                              onChange={() => setChooseProduct(pro)}
                              style={{ cursor: "pointer" }}
                            />
                            {/* {pro.sizes.forEach(function (value) {
                              setQuantity((value.quantity += value.quantity));
                              quantity += value.quantity;
                            })} */}

                            <div className={cx("product-quantity")}>
                              Tổng: {productQuantities[pro._id]} sp
                            </div>
                          </div>
                          <Content product={pro} />
                          {/* <label htmlFor={`category-${index}`}>
                    {pro.name_product}
                  </label> */}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={cx("add-form-button")} onClick={addNewForm}>
                    + Lưu sản phẩm
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
          {Array.isArray(saleInfo) && saleInfo.length > 0 ? (
            <div className={cx("form-group")}>
              <label
                htmlFor="size"
                className={cx("form-label", "form-label-sale")}
              >
                Thông tin sale
              </label>

              <div
                className={cx("form-product", "row", "sm-gutter")}
                name="category"
                id="category"
              >
                {saleInfo.map((pro, index) => (
                  // <div className={cx("form-select-product")} key={pro._id}>
                  <div className={cx("col", "l-3", "c-6")} key={index}>
                    <div className={cx("wrap-product")}>
                      <div className={cx("sale-delete")}>
                        <div
                          onClick={() => handleDeleteProduct(index)}
                          className={cx("sale-delete-btn")}
                        >
                          Xóa
                        </div>
                      </div>
                      <div className={cx("sale-header")}>
                        <h3 className={cx("sale-percent")}>
                          Giảm: {pro.promotion}%
                        </h3>
                        <h3 className={cx("sale-percent")}>
                          số lượng: {pro.limit}
                        </h3>
                      </div>
                      <Content product={pro.product} />
                    </div>
                    {/* <label htmlFor={`category-${index}`}>
                    {pro.name_product}
                  </label> */}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <></>
          )}
          <button className={cx("form-submit")}>
            {loader === true ? <Spin /> : "Đăng tải"}
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

export default NewSales;
