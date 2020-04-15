export const getData = () => {
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
