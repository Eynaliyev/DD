import React from "react";
import ApexChart from "react-apexcharts";
const Chart = (props) => (
  <div id="chart">
    <ApexChart
      options={props.options}
      series={props.series}
      type="line"
      height={350}
    />
  </div>
);

export default Chart;
