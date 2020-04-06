import React from "react";
import "./App.scss";
import Chart from "./components/Chart/Chart";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.title = "DataDog task";
  }

  getData = () => {
    return fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => JSON.parse(data))
      .then((parsedData) => {
        return {
          x: parsedData.time,
          y: parsedData.loadAverage,
        };
      })
      .catch((err) => console.error("backend request failed: ", err));
  };

  render() {
    return (
      <div className="app">
        <header className="app__header">{this.title}</header>
        <section>
          <Chart getData={this.getData} />
        </section>
      </div>
    );
  }
}
export default App;
