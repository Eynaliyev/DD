import { TICKINTERVAL, XAXISRANGE, LOAD_CHECK_INTERVAL } from "./constants";
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
 * removes older data points to avoid memory leaks
 * @param {Array <{x: timestamp, y: value}>} data - The title of the book.
 * @returns {Array <{x: timestamp, y: value}>} - data - updated array with only latest items
 */
export const clearBacklog = (data) => {
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  // we remove all items older than the last 60 - because there are 60 intervals of 10 seconds in 10 minutes
  for (let i = 0; i < data.length - numOfElemetns; i++) {
    data.shift();
  }
  return data;
};

/**
 * returns a new array with given nubmer of elements from the end
 * @param {Array <{x: timestamp, y: value}>} arr - array to get elements from.
 * @param {number} numOfElements - number of last elements to return
 * @returns - a new array with given elements
 */
export const getLastElements = (arr, numOfElements) => {
  return arr.slice(Math.max(arr.length - numOfElements, 0));
};
/**
 * useful in case results arrive in incorrect chronological order
 * @param {Array <{x: timestamp, y: value}>} dataPoints - array of elements
 * @param {x: timestamp, y: value} newPoint - new element to be added to the resulting array
 * @returns - a new array with given elements
 */
export const sortData = (dataPoints, newPoint) => {
  // check if the new element is not the latest one
  const lastElement = dataPoints[dataPoints.length - 1];
  if (lastElement && lastElement.x > newPoint.x) {
    dataPoints.sort((a, b) => a.x - b.x);
  }
  return dataPoints;
};
