import classNames from "classnames/bind";
import styles from "./CombinedChart.module.scss";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import { DatePicker, Space } from "antd";

const cx = classNames.bind(styles);

function CombinedChart() {
  const token = useSelector((state) => state.user.accessToken);
  const [year, setYear] = useState(null);
  const [options, setOptions] = useState({
    chart: {
      id: "combined-chart",
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "User",
      type: "column",
      data: [],
    },
    {
      name: "Revenue",
      type: "line",
      data: [],
    },
  ]);
  const handleChange = (date) => {
    const selectedYear = date.format("YYYY");
    setYear(selectedYear);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3000/api/monthly/user?year=${year}`,
        // {
        //   params: year,
        // },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((userRes) => {
        const userData = userRes.data.data;
        const transformedUserData = options.xaxis.categories.map(
          (month) => userData[`${month}`] || 0
        );

        axios
          .get(
            `http://localhost:3000/api/monthly/revenue?year=${year}`,
            // {
            //   params: year,
            // },
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          )
          .then((revenueRes) => {
            const revenueData = revenueRes.data.data;
            const transformedRevenueData = options.xaxis.categories.map(
              (month) => revenueData[`${month}`] || 0
            );

            setSeries([
              {
                name: "User",
                type: "column",
                data: transformedUserData,
              },
              {
                name: "Revenue",
                type: "line",
                data: transformedRevenueData,
              },
            ]);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/monthly/user", {
  //       headers: {
  //         token: `Bearer ${token}`,
  //       },
  //     })
  //     .then((userRes) => {
  //       const userData = userRes.data.data;
  //       const transformedUserData = options.xaxis.categories.map(
  //         (month) => userData[`2023-${month}`] || 0
  //       );

  //       axios
  //         .get("http://localhost:3000/api/monthly/revenue", {
  //           headers: {
  //             token: `Bearer ${token}`,
  //           },
  //         })
  //         .then((revenueRes) => {
  //           const revenueData = revenueRes.data.data;
  //           const transformedRevenueData = options.xaxis.categories.map(
  //             (month) => revenueData[`2023-${month}`] || 0
  //           );

  //           setSeries([
  //             {
  //               name: "User",
  //               type: "column",
  //               data: transformedUserData,
  //             },
  //             {
  //               name: "Revenue",
  //               type: "line",
  //               data: transformedRevenueData,
  //             },
  //           ]);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  console.log("year", year);
  console.log("option", options);
  console.log("series", series);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("year")}>
        <div className={cx("year-picker")}>
          <Space direction="vertical">
            <DatePicker onChange={handleChange} picker="year" />
          </Space>
        </div>
        <button onClick={handleSubmit} className={cx("year-btn")}>
          Lọc
        </button>
      </div>
      <div className={cx("chart")}>
        <Chart options={options} series={series} type="line" width="600" />
      </div>
    </div>
  );
}

export default CombinedChart;
