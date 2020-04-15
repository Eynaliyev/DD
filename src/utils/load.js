import { TICKINTERVAL, LOAD_CHECK_INTERVAL } from "./constants";
import * as utils from "./helpers";
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
  const latestElements = utils.getLastElements(data, numberOfElementsToCheck);
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
  const highLoadElementExists = elements.find((el) => el.y >= 1);
  return !highLoadElementExists;
};
