/*
 * if new and old are high,update latest with current timestamp
 * if old is low state and new one is high - create new annotation, create alarm s aying usage is high
 * if old is high and new is low - create alarm saying it has recovered
 *
 */

export const handleAlert = (newHighLoadState, oldHighLoadState) => {
  if (oldHighLoadState !== newHighLoadState) {
    createAlert(newHighLoadState);
  }
};

export const createAlert = (isHighLoad) => {
  if (isHighLoad) {
    alert("CPU under high load");
  } else {
    alert("CPU recovered");
  }
};
