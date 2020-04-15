import { TICKINTERVAL, LOAD_CHECK_INTERVAL } from "./constants";

import chartOptions from "./options";
export const annotationOptions = {
  fillColor: "#FF4560",
  opacity: 0.4,
  strokeDashArray: 1,
  borderColor: "#c2c2c2",
  borderWidth: 1,
  offsetX: 0,
  offsetY: 0,
  label: {
    borderColor: "#FF4560",
    borderWidth: 1,
    text: "X-axis range",
    textAnchor: "middle",
    orientation: "vertical",
    position: "top",
    offsetX: 0,
    offsetY: 0,
    style: {
      fontSize: "10px",
      color: "#fff",
      background: "#FF4560",
      fontFamily: undefined,
      fontWeight: 400,
      cssClass: "",
      padding: {
        left: 5,
        right: 5,
        top: 2,
        bottom: 2,
      },
    },
    offsetY: -10,
    text: "CPU under heavy load",
  },
};

/**
 * gets annotation and updates it in chart options in order
 * to  show user that CPU was under load at a certain time interval.
 * @param {number} start - start time of the period.
 * @param {number} end - end of the period.
 */
export const createAnnotation = (start, end) => {
  const newAnnotation = getAnnotations(start, end);
  chartOptions.annotations.xaxis.push(newAnnotation);
};
/**
 * creates annotation using the data provided and default annotation options
 * @param {number} start - start time of the period.
 * @param {number} end - end of the period.
 * @returns - a new annotation instance
 */
export const getAnnotations = (start, end) => {
  return {
    ...annotationOptions,
    x: start,
    x2: end,
  };
};

/**
 * if new and old are high,update latest with current timestamp
 * if old is low state and new one is high - create new annotation,
 * @param {boolean} newHighLoadState - latest high load state.
 * @param {boolean} oldHighLoadState - previous high load state.
 * @param {number} newTime - timestamp of the latest point.
 * @param {Array <{x: timestamp, y: value}>} data to check
 */

export const updateAnnotations = (
  newHighLoadState,
  oldHighLoadState,
  newTime,
  data
) => {
  if (newHighLoadState && oldHighLoadState) {
    updateLatestAnnotation(newTime);
  }
  if (newHighLoadState && !oldHighLoadState) {
    const numberOfElementsToCheck = LOAD_CHECK_INTERVAL / TICKINTERVAL - 1;
    const firstHighLoadElement = data[data.length - numberOfElementsToCheck];
    const firstTime = firstHighLoadElement.x;
    createAnnotation(firstTime, newTime);
  }
};

const updateLatestAnnotation = (time) => {
  const latestAnnotation =
    chartOptions.annotations.xaxis[chartOptions.annotations.xaxis.length - 1];
  const updatedAnnotation = {
    ...latestAnnotation,
    x2: time,
  };
  chartOptions.annotations.xaxis.pop();
  chartOptions.annotations.xaxis.push(updatedAnnotation);
};
