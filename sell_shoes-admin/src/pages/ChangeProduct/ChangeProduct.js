import classNames from "classnames/bind";
import styles from "~/pages/NewProduct/NewProduct.module.scss";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Spin } from "antd";

const cx = classNames.bind(styles);
function ChangeProduct({ productId }) {
  const user = useSelector((state) => state.user.accessToken);
  console.log(user);
  const [loader, setLoader] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    product: {
      name_product: "",
      price_product: "",
      // newPrice_product: "",
      sizes: [],
      image: [],
      // quantity: "",
      describe: "",
      detail: "",
      category: "default",
    },
  });
  const [category, setCategory] = useState([]);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [quantityOfSize, setQuantityOfSize] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/category/all")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleSubmitSize = (e) => {
    e.preventDefault();
    if (size !== "" && quantity !== "") {
      const newSize = size; // Lưu giữ giá trị size
      const newQuantity = quantity; // Lưu giữ giá trị quantity

      setQuantityOfSize((prev) => [
        ...prev,
        { size: newSize, quantity: newQuantity },
      ]);

      setSize(""); // Đặt giá trị size về rỗng
      setQuantity(""); // Đặt giá trị quantity về rỗng
      // Cập nhật giá trị trong currentProduct.sizes
      // setCurrentProduct((prevProduct) => ({
      //   ...prevProduct,
      //   sizes: [...prevProduct.sizes, { size: newSize, quantity: newQuantity }],
      // }));
    } else {
      console.error("Invalid size or quantity");
    }
    // setQuantityOfSize((prev) => [...prev, { size, quantity }]);
    // setSize("");
    // setQuantity("");
  };
  const handleDelete = (index) => {
    setQuantityOfSize(() => {
      const newData = quantityOfSize.filter((_, i) => i !== index);
      return newData;
    });
  };
  const inputRef = useRef();
  const handleClear = () => {
    inputRef.current.reset();
  };

  const handleClearAll = () => {
    setCurrentProduct({
      name_product: "",
      price_product: "",
      newPrice_product: "",
      sizes: [],
      image: null,
      quantity: "",
      describe: "",
      detail: "",
      category: "default",
    });
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCurrentProduct({
  //     ...currentProduct,
  //     [name]:
  //       name === "quantity"
  //         ? parseInt(value)
  //         : name === "newPrice_product" || name === "price_product"
  //         ? parseInt(value)
  //         : value,
  //   });
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]:
        name === "quantity"
          ? value === ""
            ? null
            : parseInt(value)
          : name === "newPrice_product" || name === "price_product"
          ? value === ""
            ? null
            : parseFloat(value)
          : value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name_product", currentProduct.product.name_product);
    form.append("price_product", currentProduct.product.price_product);
    // form.append("newPrice_product", currentProduct.newPrice_product);
    if (currentProduct.product.sizes.length > 0) {
      currentProduct.product.sizes.forEach((sizes) => {
        form.append("sizes", JSON.stringify(sizes));
      });
    }
    // form.append("sizes", currentProduct.sizes);
    if (currentProduct.product.image.length > 0) {
      currentProduct.product.image.forEach((image) => {
        form.append("image", image);
      });
    }
    // form.append("quantity", currentProduct.quantity);
    form.append("describe", currentProduct.product.describe);
    form.append("detail", currentProduct.product.detail);
    // form.append("image", currentProduct.image);
    form.append("category", currentProduct.product.category);

    try {
      setLoader(true);

      const response = await axios.put(
        `http://localhost:3000/api/product/edit/${productId}`,
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
      .get(`http://localhost:3000/api/product/detail/${productId}`, {
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
  }, [productId]);
  useEffect(() => {
    setCurrentProduct({
      ...currentProduct,
      sizes: quantityOfSize,
    });
    console.log(quantityOfSize);
  }, [quantityOfSize]);
  useEffect(() => {
    // Kiểm tra xem currentProduct.sizes có giá trị không
    if (
      currentProduct.product.sizes &&
      currentProduct.product.sizes.length > 0
    ) {
      // Lấy giá trị từ currentProduct.sizes và gán cho quantityOfSize
      setQuantityOfSize(currentProduct.product.sizes);
    }
  }, [currentProduct.product.sizes]);
  console.log("currentProduct", currentProduct);
  console.log("quantityOfSize", quantityOfSize);
  return (
    <div className={cx("wrapper-change")}>
      <h3 className={cx("heading")}>Thay đổi sản phẩm</h3>
      <div className={cx("body")}>
        <form onSubmit={handleSubmit} className={cx("form")} id="form-1">
          <div className={cx("form-group")}>
            <label htmlFor="name_product" className={cx("form-label")}>
              Tên sản phẩm
            </label>
            <input
              id="name_product"
              type="text"
              placeholder="Nhập tên sản phẩm"
              className={cx("form-control")}
              name="name_product"
              onChange={handleInputChange}
              value={currentProduct.product.name_product}
            />
          </div>
          <div className={cx("prices-change")}>
            <div className={cx("form-group")}>
              <label htmlFor="price_product" className={cx("form-label")}>
                Giá gốc của sản phẩm
              </label>
              <input
                id="price_product"
                type="text"
                placeholder="Nhập giá của sản phẩm"
                className={cx("form-control")}
                name="price_product"
                onChange={handleInputChange}
                value={currentProduct.product.price_product}
              />
            </div>
            {/* <div className={cx("form-group")}>
              <label htmlFor="newPrice_product" className={cx("form-label")}>
                Giá mới của sản phẩm
              </label>
              <input
                id="newPrice_product"
                type="text"
                placeholder="Nhập giá mới của sản phẩm"
                className={cx("form-control")}
                name="newPrice_product"
                onChange={handleInputChange}
                value={currentProduct.newPrice_product}
              />
            </div> */}
          </div>
          {/* <div className={cx("form-group")}>
            <label htmlFor="size" className={cx("form-label")}>
              Size của sản phẩm (chọn nhiều)
            </label>
            <select
              name="size"
              id="size"
              multiple
              className={cx("form-select")}
              onChange={handleSizeChange}
              value={currentProduct.size}
            >
              <option value="35">35</option>
              <option value="36">36</option>
              <option value="37">37</option>
              <option value="38">38</option>
              <option value="39">39</option>
              <option value="40">40</option>
              <option value="41">41</option>
              <option value="42">42</option>
            </select>
          </div> */}
          <div className={cx("prices-change")}>
            <div className={cx("form-group")}>
              <label htmlFor="oldprice" className={cx("form-label")}>
                Size của sản phẩm
              </label>
              <input
                id="price_product"
                type="text"
                placeholder="Nhập size của sản phẩm"
                className={cx("form-control")}
                name="price_product"
                // onChange={handleInputChange}
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>
            <div className={cx("quantity-wrapper")}>
              <div className={cx("form-group")}>
                <label htmlFor="newprice" className={cx("form-label")}>
                  Số lượng của sản phẩm
                </label>
                <input
                  id="newPrice_product"
                  type="text"
                  placeholder="Nhập số lượng của sản phẩm"
                  className={cx("form-control")}
                  name="newPrice_product"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  // onChange={handleInputChange}
                />
              </div>
              <button
                onClick={handleSubmitSize}
                className={cx("form-submit--category")}
              >
                Duyệt
              </button>
            </div>
          </div>
          <div className={cx("form-group")}>
            {/* {quantityOfSize.length !== 1 ? ( */}
            <ul className={cx("form-size")}>
              {quantityOfSize.map(
                (size, index) =>
                  size.size &&
                  size.quantity && (
                    <div className={cx("form-size-type")} key={index}>
                      <li>
                        {size.size},{size.quantity}
                      </li>
                      <div
                        onClick={() => handleDelete(index)}
                        className={cx("form-size-icon")}
                      >
                        {<FontAwesomeIcon icon={faXmark} />}
                      </div>
                    </div>
                  )
              )}
            </ul>
            {/* ) : (
              <></>
            )} */}
          </div>
          {/* <div className={cx("form-group")}>
            <label htmlFor="quantity" className={cx("form-label")}>
              Số lượng của sản phẩm
            </label>
            <input
              id="quantity"
              type="text"
              placeholder="Nhập số lượng của sản phẩm"
              className={cx("form-control")}
              name="quantity"
              onChange={handleInputChange}
              value={currentProduct.quantity}
            />
          </div> */}
          <div className={cx("form-group")}>
            <label htmlFor="describe" className={cx("form-label")}>
              Mô tả của sản phẩm
            </label>
            <textarea
              id="describe"
              type="text"
              placeholder="Nhập mô tả của sản phẩm"
              className={cx("form-control")}
              name="describe"
              onChange={handleInputChange}
              rows="4"
              style={{
                height: "100px",
              }}
              value={currentProduct.product.describe}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="detail" className={cx("form-label")}>
              Chi tiết của sản phẩm
            </label>
            <textarea
              id="detail"
              type="text"
              placeholder="Nhập chi tiết của sản phẩm"
              className={cx("form-control")}
              name="detail"
              onChange={handleInputChange}
              rows="4"
              style={{
                height: "100px",
              }}
              value={currentProduct.product.detail}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="image" className={cx("form-label")}>
              Hình ảnh của sản phẩm
            </label>
            <input
              id="image"
              type="file"
              multiple
              accept=".jpg, .png"
              placeholder="Nhập chi tiết của sản phẩm"
              className={cx("form-control")}
              name="image"
              onChange={handleImageChange}
            />
          </div>
          <div className={cx("form-group")}>
            <label htmlFor="category" className={cx("form-label")}>
              Phân loại sản phẩm
            </label>
            <select
              name="category"
              id="category"
              className={cx("form-control")}
              onChange={handleCategoryChange}
            >
              <option value="default">-- Chọn một danh mục --</option>
              {category.map((cate, index) => (
                <option key={index} value={cate.category}>
                  {cate.category}
                </option>
              ))}
            </select>
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

export default ChangeProduct;
