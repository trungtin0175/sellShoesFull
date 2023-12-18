import classNames from "classnames/bind";
import styles from "./User.module.scss";
import config from "~/config";
import { Button, Input, Space, Table, Modal } from "antd";
import { useState, useRef, useEffect, useContext } from "react";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import axios from "axios";
import { useSelector } from "react-redux";
import DeleteUser from "./DeleteUser";

const cx = classNames.bind(styles);

// const data = [
//   {
//     id: 1,
//     name: "Trần Trung Tín",
//     numberphone: 905111111,
//     email: "trungtin@gmail.com",
//     order: 0,
//   },
//   {
//     id: 2,
//     name: "Trần Trung Nguyên",
//     numberphone: 905111111,
//     email: "trungtin@gmail.com",
//     order: 4,
//   },
//   {
//     id: 3,
//     name: "Trần Trung Tèo",
//     numberphone: 905111111,
//     email: "trungtin@gmail.com",
//     order: 2,
//   },
//   {
//     id: 4,
//     name: "Trần Trung Tín",
//     numberphone: 905111111,
//     email: "trungtin@gmail.com",
//     order: 0,
//   },
//   {
//     id: 5,
//     name: "Trần Trung Tín",
//     numberphone: 905111111,
//     email: "trungtin@gmail.com",
//     order: 3,
//   },
//   {
//     id: 6,
//     name: "Trần Trung Tín",
//     numberphone: 905111111,
//     email: "trungtin@gmail.com",
//     order: 1,
//   },
// ];
function User() {
  const user = useSelector((state) => state.user.accessToken);

  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/allusers", {
        headers: {
          token: `Bearer ${user}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log("userLength", response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/order/all", {
        headers: {
          token: `Bearer ${user}`,
        },
      })
      .then((respone) => {
        // const orderData = {};
        // respone.data.forEach((order) => {
        //   orderData[order.id_user] = order;
        // });
        // setOrder(orderData);
        setOrder(respone.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const rederAction = (userId) => {
    return (
      <div style={{ display: "flex" }}>
        <DeleteOutlined
          onClick={() => {
            setSelectedUserId(userId);
            setOpen(true);
            console.log("userID123", userId);
          }}
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
        />
      </div>
    );
  };
  console.log("order", order);
  console.log("user", data);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  // const [dataSource, setDataSource] = useState(arr);
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
      dataIndex: "fullname",
      ...getColumnSearchProps("fullname"),
    },
    {
      key: "3",
      title: "Number phone",
      dataIndex: "numberphone",
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "5",
      title: "Order",
      dataIndex: "_id",
      render: (userId) => {
        const userOrders = order.filter((order) => order.id_user === userId); // Lọc đơn hàng cho người dùng
        const numberOfOrders = userOrders.length; // Số lượng đơn hàng
        return numberOfOrders;
      },
      sorter: (a, b) => {
        const numberOfOrdersA = order.filter(
          (order) => order.id_user === a._id
        ).length;
        const numberOfOrdersB = order.filter(
          (order) => order.id_user === b._id
        ).length;
        return numberOfOrdersA - numberOfOrdersB;
      },
      // sorter: (a, b) => a.order - b.order,
      sortDirections: ["descend", "ascend"],
    },
    {
      key: "6",
      title: "Action",
      dataIndex: "_id",
      render: (text, userId) => rederAction(userId._id),
    },
  ];
  return (
    <div className={cx("wrapper")}>
      <div className={cx("user")}>
        <h4 className={cx("user-heading")}>QUẢN LÝ USER</h4>
        <header className={cx("user-header")}>
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
          <DeleteUser userId={selectedUserId} />
        </Modal>
      </div>
    </div>
  );
}

export default User;
