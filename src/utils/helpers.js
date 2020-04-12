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
 * checks if the system is under high load, or recovered
 * @param {boolean} isUnderHighLoad - is the current state of the system under high load
 * @param {number} newDataPointLoad - load of the newest data point.
 * @param {Array <{x: timestamp, y: value}>} data - data points so far.
 * @returns {boolean} - whether the system is still under high load
 */

export const isStillHighLoad = (
  currentLoadStateIsHigh,
  newDataPointLoad,
  data
) => {
  const newPointHighLoad = newDataPointLoad > 1;
  // number of elements in the last 2 minutes
  const numberOfElementsToCheck = LOAD_CHECK_INTERVAL / TICKINTERVAL - 1;
  const latestElements = getLastElements(data, numberOfElementsToCheck);
  // check  if the points for the alst 2 minutes are all under high load
  const isLastTwoMinutesHighLoad = isHighLoad(latestElements);
  const isLastTwoMinutesLowLoad = isLowLoad(latestElements);
  if (newPointHighLoad) {
    return currentLoadStateIsHigh || isLastTwoMinutesHighLoad;
  } else if (currentLoadStateIsHigh && isLastTwoMinutesLowLoad) {
    return false;
  } else {
    return currentLoadStateIsHigh && !isLastTwoMinutesLowLoad;
  }
};

export const isHighLoad = (elements) => {
  const lowLoadElementExists = elements.find((el) => el.y < 1);
  return !lowLoadElementExists;
};
/**
 * checks whethere there are elements with y values greater tahn 1
 * @param {Array <{x: timestamp, y: value}>} array to check
\ * @returns 
 */
export const isLowLoad = (elements) => {
  const highLoadElementExists = elements.find((el) => el.y > 1);
  return !highLoadElementExists;
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
