import { TICKINTERVAL, XAXISRANGE, LOAD_CHECK_INTERVAL } from "./constants";
import annotationOptions from "./annotations";
import chartOptions from "./options";
/**
 * build up initial data points to get chart to start cleanly
 * @returns {Array <{x: timestamp, y: value}>} - first set of empty data points
 */
export const getInitialData = () => {
  const initialData = [];
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  for (let i = 0; i < numOfElemetns; i++) {
    const newTime = new Date() - i * TICKINTERVAL;
    const newEmptyPoint = {
      x: newTime,
      y: 0,
    };
    initialData.push(newEmptyPoint);
    initialData.reverse();
  }
  return initialData;
};
/**
 * removes older data points to avoice memory leaks
 * @param {Array <{x: timestamp, y: value}>} data - The title of the book.
 * @returns {Array <{x: timestamp, y: value}>} - data - updated array with only latest items
 */
export const clearBacklog = (data) => {
  const res = [...data];
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  // we remove all items older than the last 60 - because there are 60 intervals of 10 seconds in 10 minutes
  for (let i = 0; i < res.length - numOfElemetns; i++) {
    res.shift();
  }
  return res;
};
/**
 * gets annotation and updates it in chart options in order
 * to  show user that CPU was under load at a certain time interval.
 * @param {timestamp} start - start time of the period.
 * @param {timestamp} end - end of the period.
 */
export const createAnnotation = (start, end) => {
  const newAnnotation = getAnnotations(start, end);
  console.log(newAnnotation);
  chartOptions.annotations.xaxis.push(newAnnotation);
};
/**
 * creates annotation using the data provided and default annotation options
 * @param {timestamp} start - start time of the period.
 * @param {timestamp} end - end of the period.
 * @returns - a new annotation instance
 */
export const getAnnotations = (start, end) => {
  return {
    ...annotationOptions,
    x1: start,
    x2: end,
  };
};

/**
 * checks if the system is under high load, or recovered
 * @param {boolean} isUnderHighLoad - is the current state of the system under high load
 * @param {x: timestamp, y: value} newDataPoint - dataPoint that will be added.
 * @param {Array <{x: timestamp, y: value}>} data - data points so far.
 * @returns {boolean} - whether the system is still under high load
 */

/*1. 
    1. []If newest res is over 1
        1. []If currently already under high load, 
            1. []update the current annotation - should be the latest one
        2. []If currently not under high load
            1. []Check last 20  for 2 last minutes
                1. []If should be high load
                    1. []Update annotation
                    2. []Update state
                2. []If not - do nothing
    2. []If newest is under 1
        1. []If under high load
            1. []Check last 20 for last 2 minutes to see if recovered
                1. []If recovered
                    1. []Update state
                2. []If not
                    1. []Update the annotation with newest time
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

export const checkLoad = (isUnderHighLoad, newDataPoint, data) => {
  const isNewPointAboveOne = newDataPoint.y > 1;
  // number of elements in the last 2 minutes
  const numberOfElementsToCheck = LOAD_CHECK_INTERVAL / TICKINTERVAL - 1;
  const latestElements = getLastElements(data, numberOfElementsToCheck);
  // check  if the points for the alst 2 minutes are all under high load
  const isLastTwoMinutesHighLoad = latestElementsHighLoad(latestElements);
  const isLastTwoMinutesLowLoad = latestElementsLowLoad(latestElements);
  if (isNewPointAboveOne) {
    return isUnderHighLoad || isLastTwoMinutesHighLoad;
  } else {
    return isUnderHighLoad && !isLastTwoMinutesLowLoad;
  }
};

export const latestElementsHighLoad = (latestElements) => {
  const lowLoadElementExists = latestElements.find((el) => el < 1);
  return !lowLoadElementExists;
};

export const latestElementsLowLoad = (latestElements) => {
  const highLoadElementExists = latestElements.find((el) => el < 1);
  return !highLoadElementExists;
};

export const getLastElements = (arr, numOfElements) => {
  arr.slice(Math.max(arr.length - numOfElements, 0));
};
