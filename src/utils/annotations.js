import chartOptions from "./options";
export const annotationOptions = {
  fillColor: "#FF4560",
  opacity: 0.4,
  label: {
    borderColor: "#FF4560",
    style: {
      fontSize: "10px",
      color: "#fff",
      background: "#FF4560",
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
    x1: start,
    x2: end,
  };
};

/*
 * if new and old are high,update latest with current timestamp
 * if old is low state and new one is high - create new annotation, create alarm s aying usage is high
 * if old is high and new is low - create alarm saying it has recovered
 *
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
  if (newHighLoadState && !newTime) {
    const numberOfElementsToCheck = LOAD_CHECK_INTERVAL / TICKINTERVAL - 1;
    const firstHighLoadElement =
      data[data.length - (numberOfElementsToCheck + 1)];
    const firstTime = firstHighLoadElement.x;
    createAnnotation(firstTime, newTime);
  }
};

const updateLatestAnnotation = (time) => {
  const latestAnnotation =
    chartOptions.annotations.xaxis[chartOptions.annotations.xaxis.length - 1];
  latestAnnotation = {
    ...latestAnnotation,
    x2: time,
  };
};
