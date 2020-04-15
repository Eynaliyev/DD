import React from "react";
import "./App.scss";
import Chart from "./components/Chart/Chart";
import ApexCharts from "apexcharts";
import options from "./utils/options";
import {
  TICKINTERVAL,
  getInitialData,
  clearBacklog,
  isStillHighLoad,
  handleAlert,
  updateAnnotations,
  getData,
  sortData,
} from "./utils";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.title = "DataDog task";
    const data = getInitialData();

    this.state = {
      series: [
        {
          data,
        },
      ],
      options,
      highLoad: false,
    };
  }
  componentDidMount() {
    const fetchInterval = setInterval(() => {
      this.getNewSeries();
      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: this.state.series[0].data,
        },
      ]);
    }, TICKINTERVAL);
    this.setState({
      ...this.state,
      fetchInterval,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.fetchInterval);
  }

  getNewSeries = async () => {
    let dataPoints = clearBacklog(this.state.series[0].data);
    const res = await getData();
    const newLoadState = isStillHighLoad(
      this.state.highLoad,
      res.y,
      dataPoints
    );
    this.updateState(res, dataPoints, newLoadState);
    updateAnnotations(newLoadState, this.state.highLoad, res.x, dataPoints);
    handleAlert(newLoadState, this.state.highLoad);
  };

  updateState = (newPoint, dataPoints, newLoadState) => {
    const sortedData = sortData(dataPoints, newPoint);
    const formattedYValue = Math.min(newPoint.y, 1);

    const newData = [
      ...sortedData,
      {
        ...newPoint,
        y: formattedYValue,
      },
    ];
    this.setState({
      ...this.state,
      series: [{ data: newData }],
      highLoad: newLoadState,
    });
  };

  render() {
    return (
      <div className="app">
        <header className="app__header">{this.title}</header>
        <section>
          <Chart options={this.state.options} series={this.state.series} />
        </section>
      </div>
    );
  }
}
export default App;
