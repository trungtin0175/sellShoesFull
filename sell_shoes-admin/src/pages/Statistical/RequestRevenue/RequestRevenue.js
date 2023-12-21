import classNames from "classnames/bind";
import styles from "./RequestRevenue.module.scss";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { set } from "react-hook-form";
import { DatePicker, Space, TimePicker } from "antd";

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
function RequestRevenue() {
  const token = useSelector((state) => state.user.accessToken);
  const [selectedRange, setSelectedRange] = useState([null, null]);

  const handleRangeChange = (dates) => {
    setSelectedRange(dates);
  };

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
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
  const handleDateClick = async (e) => {
    e.preventDefault();

    try {
      if (selectedRange[0] && selectedRange[1]) {
        const startDate = selectedRange[0].format("YYYY-MM-DD");
        const endDate = selectedRange[1].format("YYYY-MM-DD");
        const formattedStartDate = `${startDate
          .split("-")
          .reverse()
          .join("-")}`;
        const formattedEndDate = `${endDate.split("-").reverse().join("-")}`;
        console.log(formattedStartDate, formattedEndDate);
        const res = await axios.post(
          "http://localhost:3000/api/request/revenue",
          {
            startRequest: formattedStartDate,
            endRequest: formattedEndDate,
          },
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );

        const newData = res.data.data;

        // Chuyển đổi dữ liệu từ dạng {2023-12: 8} thành mảng giá trị tương ứng với tháng
        console.log("new", newData);

        // const transformedData = options.xaxis.categories.map(
        //   (month) => newData[`2023-${month}`] || 0
        // );
        const option = res.data.data;
        const categories = Object.keys(option);
        console.log("option", option);
        setOptions({
          chart: {
            // id: "basic-bar",
            id: "basic-bar",
          },
          xaxis: {
            categories: categories, // Đây là nơi bạn cần cung cấp các danh mục cho biểu đồ, sau khi lấy dữ liệu từ API.
          },
        });
        setSeries([
          {
            name: "doanh thu",
            data: categories.map((date) => option[date]),
          },
        ]);
      } else {
        console.error(
          "Vui lòng chọn cả ngày bắt đầu và ngày kết thúc trước khi lưu."
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Sử dụng axios.all để gửi cả hai yêu cầu API cùng một lúc
  console.log("seri", series);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("time")}>
        <Space direction="vertical" size={12}>
          <RangePicker onChange={handleRangeChange} />
        </Space>
        <button
          onClick={handleDateClick}
          className={cx("form-submit--category")}
        >
          Chọn ngày
        </button>
      </div>
      <div>
        <Chart options={options} series={series} type="bar" width="900" />
      </div>
    </div>
  );
}

export default RequestRevenue;
