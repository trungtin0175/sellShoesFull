import classNames from "classnames/bind";
import styles from "./MonthReveunue.module.scss";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { set } from "react-hook-form";

const cx = classNames.bind(styles);
function MonthReveunue() {
  const token = useSelector((state) => state.user.accessToken);

  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // Đây là nơi bạn cần cung cấp các danh mục cho biểu đồ, sau khi lấy dữ liệu từ API.
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [], // Đây là nơi bạn cần cung cấp dữ liệu số lượng hàng đã bán, sau khi tính toán từ dữ liệu đơn hàng.
    },
  ]);
  useEffect(() => {
    // Sử dụng axios.all để gửi cả hai yêu cầu API cùng một lúc
    axios
      .get("http://localhost:3000/api/monthly/revenue", {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const newData = res.data.data;

        // Chuyển đổi dữ liệu từ dạng {2023-12: 8} thành mảng giá trị tương ứng với tháng
        const transformedData = options.xaxis.categories.map(
          (month) => newData[`2023-${month}`] || 0
        );

        setSeries([
          {
            name: "series-1",
            data: transformedData,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("seri", series);
  return (
    <div>
      <Chart options={options} series={series} type="line" width="600" />
    </div>
  );
}

export default MonthReveunue;
