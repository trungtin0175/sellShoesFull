import classNames from "classnames/bind";
import styles from "./Sales.module.scss";
import config from "~/config";
import { Button, Input, Space, Table, Modal, Tag } from "antd";
import { useState, useRef, useEffect } from "react";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import NewSales from "~/pages/Sales/NewSales";
import ChangeSales from "~/pages/Sales/ChangeSales";
import axios from "axios";
import routes from "~/config/routes";
import DeleteSale from "./DeleteSale/DeleteSale";
// import DeleteCategory from "./DeleteCategory/DeleteCategory";

const cx = classNames.bind(styles);
function Sales() {
  const [data, setData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [dataHasPercent, setDataHasPercent] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false);
  const [dele, setDele] = useState(false);

  const [activeColor, setActiveColor] = useState("Đang diễn ra");
  const [activeData, setActiveData] = useState("active");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/sale/${activeData}`)
      .then((response) => {
        // const updatedData = response.data.map((item) => ({
        //   ...item,
        //   sale: (
        //     ((item.price_product - item.salePrice) / item.price_product) *
        //     100
        //   ).toFixed(2),
        // }));
        setData(response.data.data);
        console.log("respone", response.data.data);
        // const dataWithPercent = updatedData.filter(
        //   (item) => item.salePrice !== null
        // );
        // setDataHasPercent(dataWithPercent);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [activeData]);

  console.log("dataHas", dataHasPercent);
  const rederAction = (categoryId) => {
    return (
      <div>
        <EditOutlined
          onClick={() => {
            setSelectedCategoryId(categoryId);
            setOpen(true);
          }}
          style={{
            color: "orange",
            fontSize: "20px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        />
        <DeleteOutlined
          onClick={() => {
            setSelectedCategoryId(categoryId);
            setDele(true);
          }}
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        />
      </div>
    );
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const handelAdd = () => {
    setCreate(true);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const colurm = [
    {
      key: "1",
      title: "ID",
      dataIndex: "_id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      render: (_, data) => (
        <div className={cx("render")}>
          {data.saleProducts.map((s, i) => (
            <span key={i}> {s.id_product?.name_product}</span>
          ))}
        </div>
      ),
      // ...getColumnSearchProps("name_product"),
    },
    {
      key: "3",
      title: "Image",
      dataIndex: "image",
      render: (_, data) => (
        <div className={cx("render")}>
          {data.saleProducts.map((s, i) => (
            <img
              key={i}
              src={s.id_product?.image[0]}
              style={{ Width: "60px", height: "60px", objectFit: "contain" }}
            />
          ))}
        </div>
      ),
    },
    {
      key: "4",
      title: "Price",
      dataIndex: "proce",
      render: (_, data) => (
        <div className={cx("render")}>
          {data.saleProducts.map((s, i) => (
            <span key={i}> {s.id_product?.price_product.toLocaleString()}</span>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        a.saleProducts[0]?.id_product[0]?.price_product -
        b.saleProducts[0].id_product[0]?.price_product,
      sortDirections: ["descend", "ascend"],
    },
    {
      key: "5",
      title: "Sale Percent",
      dataIndex: "proce",
      render: (_, data) => (
        <div className={cx("render")}>
          {data.saleProducts.map((s, i) => (
            <span key={i}> {s.promotion}</span>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        a.saleProducts[0]?.promotion - b.saleProducts[0].promotion,
      sortDirections: ["descend", "ascend"],
    },
    {
      key: "6",
      title: "Sale Price",
      dataIndex: "proce",
      render: (_, data) => (
        <div className={cx("render")}>
          {data.saleProducts.map((s, i) => (
            <span key={i}> {Math.round(s.salePrice).toLocaleString()}</span>
          ))}
        </div>
      ),
      sorter: (a, b) =>
        a.saleProducts[0]?.salePrice - b.saleProducts[0].salePrice,
      sortDirections: ["descend", "ascend"],
    },

    // {
    //   key: "2",
    //   title: "Name",
    //   dataIndex: "name_product",
    //   ...getColumnSearchProps("name_product"),
    // },
    // {
    //   key: "3",
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (theImageURL) => (
    //     <img
    //       alt={theImageURL[0]}
    //       src={theImageURL[0]}
    //       style={{ Width: "60px", height: "60px", objectFit: "contain" }}
    //     />
    //   ),
    //   // ...getColumnSearchProps("category"),
    // },
    // {
    //   key: "4",
    //   title: "Price",
    //   dataIndex: "price_product",
    //   sorter: (a, b) => a.price_product - b.price_product,
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   key: "5",
    //   title: "Sale Percent",
    //   dataIndex: "sale",
    //   sorter: (a, b) => a.sale - b.sale,
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   key: "6",
    //   title: "Sale Price",
    //   dataIndex: "salePrice",
    //   sorter: (a, b) => a.salePrice - b.salePrice,
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      key: "7",
      title: "Action",
      dataIndex: "sl",
      render: (text, record) => rederAction(record._id),
    },
  ];
  const handleSpending = () => {
    setActiveColor("Đang diễn ra");
    setActiveData("active");
    // const Orders = data.filter((item) => item.status === "Pending");
    // setNewData(Orders);
  };
  const handleComplete = () => {
    setActiveColor("Đã diễn ra");
    setActiveData("completed");
  };
  const handelUpcoming = () => {
    setActiveColor("Sắp diễn ra");
    setActiveData("upcoming");
  };
  console.log("123", data);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h3 className={cx("heading-name")}>Danh sách các sản phẩm giảm giá</h3>
        <Link
          to={config.routes.newsales}
          onClick={handelAdd}
          className={cx("heading-link")}
        >
          <FontAwesomeIcon className={cx("heading-icon")} icon={faPlus} />
          Thêm sản phẩm sale
        </Link>
      </div>
      <div className={cx("classify")}>
        <button
          onClick={handleSpending}
          className={cx("classify-btn", {
            active: activeColor === "Đang diễn ra",
          })}
        >
          Đang diễn ra
        </button>
        <button
          onClick={handleComplete}
          className={cx("classify-btn", {
            active: activeColor === "Đã diễn ra",
          })}
        >
          Đã diễn ra
        </button>
        <button
          onClick={handelUpcoming}
          className={cx("classify-btn", {
            active: activeColor === "Sắp diễn ra",
          })}
        >
          Sắp diễn ra
        </button>
      </div>
      <header className={cx("body")}>
        <Table
          // pagination={false}
          // filterSearch={(input, record) => true}
          columns={colurm}
          dataSource={data.map((item, index) => ({
            ...item,
            key: index,
          }))}
        ></Table>
      </header>
      <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={open}
        footer={null}
        // onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        style={{ marginTop: 30 }}
      >
        <ChangeSales productId={selectedCategoryId} />
      </Modal>
      {/* <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={create}
        footer={null}
        // onOk={() => setOpen(false)}
        onCancel={() => setCreate(false)}
        width={1000}
        style={{ marginTop: 30 }}
      >
        <NewSales />
      </Modal> */}
      <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={dele}
        footer={null}
        // onOk={() => setOpen(false)}
        onCancel={() => setDele(false)}
        width={1000}
        style={{ marginTop: 30 }}
      >
        <DeleteSale categoryId={selectedCategoryId} />
      </Modal>
    </div>
  );
}

export default Sales;
