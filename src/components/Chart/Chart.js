import React from "react";
import ApexChart from "react-apexcharts";
import { CHART_HEIGHT } from "../../utils/constants";
const Chart = (props) => (
  <div id="chart">
    <ApexChart
      options={props.options}
      series={props.series}
      type="line"
      height={CHART_HEIGHT}
    />
  </div>
);

export default Chart;
