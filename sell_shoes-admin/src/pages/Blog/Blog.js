import classNames from "classnames/bind";
import styles from "~/pages/Category/Category.module.scss";
import config from "~/config";
import { Button, Input, Space, Table, Modal } from "antd";
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
import NewBlog from "~/pages/Blog/NewBlog";
import ChangeBlog from "./ChangeBlog";
import axios from "axios";
import DeleteBlog from "./DeleteBlog";

const cx = classNames.bind(styles);
function Blog() {
  const [data, setData] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false);
  const [dele, setDele] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/all/blog")
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("data", data);
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
      dataIndex: "title",
      ...getColumnSearchProps("title"),
    },
    // {
    //   key: "3",
    //   title: "Image",
    //   dataIndex: "image",
    //   render: (theImageURL) => (
    //     <img
    //       alt={theImageURL}
    //       src={theImageURL}
    //       style={{ Width: "60px", height: "60px", objectFit: "contain" }}
    //     />
    //   ),
    //   // ...getColumnSearchProps("category"),
    // },
    // {
    //   key: "4",
    //   title: "Price",
    //   dataIndex: "price",
    //   sorter: (a, b) => a.price - b.price,
    //   sortDirections: ["descend", "ascend"],
    // },
    // {
    //   key: "5",
    //   title: "Percent",
    //   dataIndex: "percent",
    //   sorter: (a, b) => a.percent - b.percent,
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      key: "3",
      title: "Image",
      dataIndex: "image",
      render: (theImageURL) => (
        <img
          alt={theImageURL}
          src={theImageURL}
          style={{ Width: "60px", height: "60px", objectFit: "contain" }}
        />
      ),
    },
    {
      key: "4",
      title: "Action",
      dataIndex: "sl",
      render: (text, record) => rederAction(record._id),
    },
  ];
  console.log(123);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("heading")}>
        <h3 className={cx("heading-name")}>Danh sách các bài viết</h3>
        <button onClick={handelAdd} className={cx("heading-link")}>
          <FontAwesomeIcon className={cx("heading-icon")} icon={faPlus} />
          Thêm bài viết
        </button>
      </div>
      <header className={cx("body")}>
        <Table
          // pagination={false}
          // filterSearch={(input, record) => true}
          columns={colurm}
          dataSource={data.map((item, index) => ({ ...item, key: index }))}
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
        <ChangeBlog categoryId={selectedCategoryId} />
      </Modal>
      <Modal
        // title="Thay đổi sản phẩm"
        centered
        open={create}
        footer={null}
        // onOk={() => setOpen(false)}
        onCancel={() => setCreate(false)}
        width={1000}
        style={{ marginTop: 30 }}
      >
        <NewBlog />
      </Modal>
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
        <DeleteBlog categoryId={selectedCategoryId} />
      </Modal>
    </div>
  );
}

export default Blog;
