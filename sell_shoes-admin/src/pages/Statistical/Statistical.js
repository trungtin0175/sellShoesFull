import classNames from "classnames/bind";
import styles from "./Statiscal.module.scss";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import axios from "axios";
import RequestRevenue from "./RequestRevenue";

const cx = classNames.bind(styles);

function Statistical() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("request")}>
        <h2 className={cx("request-name")}>
          Doanh thu theo từng ngày (không quá 30 ngày)
        </h2>
        <RequestRevenue />
      </div>
    </div>
  );
}

export default Statistical;
