import { TICKINTERVAL, XAXISRANGE } from "./constants";
import annotationOptions from "./annotations";
import chartOptions from "./options";
/**
 * build up initial 60 points to get it to start cleanly
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
 * @param {x: timestamp, y: value} data - The title of the book.
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
 * gets annotation and updates it in chart options in order
 * to  show user that CPU was under load at a certain time interval.
 * @param {timestamp} start - start time of the period.
 * @param {timestamp} end - end of the period.
 */
export const createAnnotation = (start, end) => {
  const newAnnotation = getAnnotations(start, end);
  chartOptions.annotations.xaxis.push(newAnnotation);
};
/**
 * creates annotation using the data provided and default annotation options
 * @param {timestamp} start - start time of the period.
 * @param {timestamp} end - end of the period.
 */
export const getAnnotations = (start, end) => {
  return {
    ...annotationOptions,
    x1: start,
    x2: end,
  };
};
