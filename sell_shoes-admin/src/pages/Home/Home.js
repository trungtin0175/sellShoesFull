import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import config from "~/config";
import Total from "./Total";
import { Table } from "antd";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { DatePicker, Space, TimePicker } from "antd";
import MonthUser from "./MonthUser";
import MonthReveunue from "./MonthReveunue";
import CombinedChart from "./CombinedChart";
const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
function Home() {
  const token = useSelector((state) => state.user.accessToken);
  const [category, setCategory] = useState([]);
  const [order, setOrder] = useState([]);
  const [count, setCount] = useState(0);
  console.log(category);
  const [options, setOptions] = useState({
    chart: {
      // id: "basic-bar",
      id: "basic-bar",
      type: "bar",
    },
    xaxis: {
      categories: [], // Đây là nơi bạn cần cung cấp các danh mục cho biểu đồ, sau khi lấy dữ liệu từ API.
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [], // Đây là nơi bạn cần cung cấp dữ liệu số lượng hàng đã bán, sau khi tính toán từ dữ liệu đơn hàng.
    },
  ]);
  const [deliveredQuantity, setDeliveredQuantity] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ten/high/revenue", {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((respone) => {
        const data1 = respone.data.data.map((pro) => pro.sumPrice);
        const option = respone.data.data.map((pro) => pro.name_product);
        console.log("respone", data1);
        // const data1 = respone.data.data.map((pro) => ({
        //   name: pro.name_product,
        //   data: [pro.sumPrice],
        // }));

        // setSeries(data1);
        setSeries([
          {
            name: "series-1",
            data: data1,
          },
        ]);
        setOptions({
          chart: {
            // id: "basic-bar",
            id: "basic-bar",
            type: "bar",
          },
          xaxis: {
            categories: option, // Đây là nơi bạn cần cung cấp các danh mục cho biểu đồ, sau khi lấy dữ liệu từ API.
          },
        });
        // const seriesData = [
        //   {
        //     name: "series-1",
        //     data: data1,
        //   },
        // ];

        // setSeries(seriesData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("setorder", series);
  return (
    <div className={cx("wrapper")}>
      <Total />
      <div className={cx("chart")}>
        <div className={cx("mixed")}>
          <div className={cx("mixed-chart")}>
            <h4 className={cx("order-name")}>Top 10 sản phẩm bán chạy nhất</h4>
            <Chart options={options} series={series} type="bar" width="600" />
            {/* <Chart options={options} series={series} type="bar" width="600" /> */}
          </div>
          <div className={cx("mixed-date")}>
            <h4 className={cx("mixed-name")}>
              Số lượng người dùng đăng ký trong năm nay
            </h4>
            <MonthUser />
            {/* <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
            <button className={cx("filter-btn")}>Lọc</button> */}
          </div>
        </div>
        <div className={cx("mixed")}>
          <div className={cx("mixed-chart")}>
            <h4 className={cx("order-name")}>
              Doanh thu của từng tháng trong năm
            </h4>
            <MonthReveunue />
          </div>
          <div className={cx("mixed-date")}>
            <h4 className={cx("mixed-name")}>
              Số lượng người dùng đăng ký trong năm nay
            </h4>
            <CombinedChart />
            {/* <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
            <button className={cx("filter-btn")}>Lọc</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
