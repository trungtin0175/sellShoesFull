import React, { useState, useEffect } from "react";
// import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import classNames from "classnames/bind";
import styles from "./SaleRevenue.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);
function SaleRevenue() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchTime, setSearchTime] = useState([]);

  const [chartState, setChartState] = useState({
    series: [
      {
        name: "Limit",
        type: "column",
        data: [],
      },
      {
        name: "Sold Quantity",
        type: "column",
        data: [],
      },
      {
        name: "Price Sale",
        type: "line",
        data: [],
      },
    ],

    options: {
      chart: {
        type: "bar",
        // height: 350,
      },
      xaxis: {
        categories: [],
      },
    },
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sale")
      .then((response) => {
        setData(response.data.data);
        const categories = response.data.data
          .map((sale) =>
            sale.saleProducts.map((product) => product.id_product.name_product)
          )
          .flat();

        const limitData = response.data.data
          .map((sale) => sale.saleProducts.map((product) => product.limit))
          .flat();

        const soldQuantityData = response.data.data
          .map((sale) =>
            sale.saleProducts.map((product) => product.soldQuantity)
          )
          .flat();

        const priceData = response.data.data
          .map((sale) =>
            sale.saleProducts.map((product) => {
              return (product.soldQuantity * product.salePrice) / 1000;
            })
          )
          .flat();

        setChartState({
          series: [
            {
              name: "Limit",
              type: "column",
              data: limitData,
            },
            {
              name: "Sold Quantity",
              type: "column",
              data: soldQuantityData,
            },
            {
              name: "Price sale",
              type: "line",
              data: priceData,
            },
          ],
          options: {
            xaxis: {
              categories: categories,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log("data", data);
  // console.log("chart", chartState);
  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSearchTime(value);
  };
  const handleSubmitTime = () => {
    axios
      .get("http://localhost:3000/api/sale")
      .then((response) => {
        setData(response.data.data);
        const filterData = response.data.data.filter((res) => {
          console.log(
            "filter",
            searchTime.includes(`${res.startSale} - ${res.endSale}`)
          );
          return searchTime.includes(`${res.startSale} - ${res.endSale}`);
        });
        const categories = filterData
          .map((sale) =>
            sale.saleProducts.map((product) => product.id_product.name_product)
          )
          .flat();

        const limitData = filterData
          .map((sale) => sale.saleProducts.map((product) => product.limit))
          .flat();

        const soldQuantityData = filterData
          .map((sale) =>
            sale.saleProducts.map((product) => product.soldQuantity)
          )
          .flat();

        const priceData = filterData
          .map((sale) =>
            sale.saleProducts.map((product) => {
              return (product.soldQuantity * product.salePrice) / 1000;
            })
          )
          .flat();

        setChartState({
          series: [
            {
              name: "Limit",
              type: "column",
              data: limitData,
            },
            {
              name: "Sold Quantity",
              type: "column",
              data: soldQuantityData,
            },
            {
              name: "Price sale",
              type: "line",
              data: priceData,
            },
          ],
          options: {
            xaxis: {
              categories: categories,
            },
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("searchtime", searchTime);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("form-group")}>
        <div className={cx("wrapper-time")}>
          <select
            name="category"
            id="category"
            className={cx("form-control")}
            onChange={handleCategoryChange}
          >
            <option value="default">-- Chọn một khoảng thời gian --</option>
            {data.map((cate, index) => (
              <option key={index} value={`${cate.startSale} - ${cate.endSale}`}>
                {`${cate.startSale} - ${cate.endSale}`}
              </option>
            ))}
          </select>
          <button
            onClick={handleSubmitTime}
            className={cx("form-submit--category")}
          >
            Duyệt
          </button>
        </div>
      </div>
      <div id="chart">
        {/* <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="bar"
        height={350}
        // width="1200"
      /> */}
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="line"
          height={350}
          // width="1200"
        />
      </div>
    </div>
  );
}
export default SaleRevenue;
