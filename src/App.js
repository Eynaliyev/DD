import React from "react";
import "./App.scss";
import Chart from "./components/Chart/Chart";
import ApexCharts from "apexcharts";
import options from "./utils/options";
import { TICKINTERVAL } from "./utils/constants";
import { getInitialData, clearBacklog, isStillHighLoad } from "./utils/helpers";
import { alertHandler } from "./utils/alert.utils";
import { updateAnnotations } from "./utils/annotations";
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
    const res = await this.getData();
    const formattedYValue = Math.min(res.y, 1);
    const newLoadState = isStillHighLoad(
      this.state.highLoad,
      res.y,
      dataPoints
    );
    updateAnnotations(newLoadState, this.state.highLoad, res.x, dataPoints);
    alertHandler(newLoadState, this.state.highLoad);
    dataPoints = this.sortData(dataPoints, res);
    this.updateChartData(dataPoints, {
      ...res,
      y: formattedYValue,
    });
    this.updateLoadStateData(newLoadState);
  };

  getData = () => {
    return fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => JSON.parse(data))
      .then((parsedData) => {
        // data format expected by ApexCharts library
        return {
          x: parsedData.time,
          y: parsedData.loadAverage,
        };
      })
      .catch((err) => console.error("backend request failed: ", err));
  };

  sortData = (dataPoints, newPoint) => {
    // check if the new element is not the latest one
    const lastElement = dataPoints[dataPoints.length - 1];
    if (lastElement && lastElement.x > newPoint.x) {
      console.log(`Not the latest element, sorting: ${newPoint}`);
      dataPoints.sort((a, b) => a.x - b.x);
    }
    return dataPoints;
  };

  updateChartData = (data, res) => {
    const newData = [...data, { ...res }];
    this.setState({
      ...this.state,
      series: [{ data: newData }],
    });
  };

  updateLoadStateData = (newState) => {
    this.setState({
      ...this.state,
      highLoad: newState,
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
