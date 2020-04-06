import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import options from "./utils/options";
class ApexChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          data: [],
        },
      ],
      options,
    };
  }

  componentDidMount() {
    const fetchInterval = setInterval(() => {
      this.getNewSeries();
      this.setState({
        ...this.state,
        fetchInterval,
      });

      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: this.state.series[0].data,
        },
      ]);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.state.fetchInterval);
  }

  getNewSeries = async (baseval, yrange) => {
    this.clearBacklog();
    const res = await this.props.getData();
    console.log(res);
    const newData = [
      ...this.state.series[0].data,
      {
        x: res.x,
        y: res.y,
      },
    ];
    this.updateChartData(newData);
  };

  clearBacklog = () => {
    // we remove all items older than the last 60 - because there are 60 intervals of 10 seconds in 10 minutes
    for (let i = 0; i < this.state.series[0].data.length - 59; i++) {
      this.state.series[0].data.shift();
    }
  };

  updateChartData = (newData) => {
    this.setState({
      ...this.state,
      series: [{ data: newData }],
    });
  };

  render() {
    return (
      <div id="chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChart;
