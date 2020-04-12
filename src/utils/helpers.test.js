import * as helpers from "./helpers";
import * as mockData from "./mock-data";
import { TICKINTERVAL, XAXISRANGE, LOAD_CHECK_INTERVAL } from "./constants";

describe("getInitialData", () => {
  const res = helpers.getInitialData();
  it("should return 60 items", () => {
    expect(res.length).toBe(60);
  });
});

describe("clearBacklog", () => {
  const initData = helpers.getInitialData();
  const firstDataPointX = initData[0]["x"];
  initData.push(mockData.singleDataPoint);
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  helpers.clearBacklog(initData);
  it("return the array of correct length", () => {
    expect(initData.length).toBe(numOfElemetns);
  });
  it("should remove the first item of the array", () => {
    expect(firstDataPointX !== initData[0].x).toBeTruthy();
  });
});

describe("isStillHighLoad", () => {
  const checkLoadData = [
    [true, 1.1, mockData.highLoadData, true], // consistent high load
    [true, 1.1, mockData.lowLoadData, true], // should be impossible
    [true, 0.5, mockData.highLoadData, true], // new low point in otherwise high load position
    [true, 0.5, mockData.lowLoadData, false], // recovered
    [false, 0.5, mockData.lowLoadData, false], //  new low point in low load
    [false, 1.1, mockData.highLoadData, true], // high load activated
    [false, 0.5, mockData.highLoadData, false], //  should be impossible
    [false, 1.1, mockData.lowLoadData, false], // blimp of high use under otherwise low usage
  ];

  it("should correctly identify the new load  state", () => {
    for (let i = 0; i < checkLoadData.length; i++) {
      const res = helpers.isStillHighLoad(
        checkLoadData[i][0],
        checkLoadData[i][1],
        checkLoadData[i][2]
      );
      expect(res).toEqual(checkLoadData[i][3]);
    }
  });
});

describe("isHighLoad", () => {
  it("should return whether all elements of the array have value above 1", () => {
    const resOne = helpers.isHighLoad(mockData.highLoadData);
    expect(resOne).toBeTruthy();
    const resTwo = helpers.isHighLoad(mockData.lowLoadData);
    expect(resTwo).toBeFalsy();
  });
});

describe("isLowLoad", () => {
  it("should return whether all elements of the array have value below 1", () => {
    const resOne = helpers.isLowLoad(mockData.highLoadData);
    expect(resOne).toBeFalsy();
    const resTwo = helpers.isLowLoad(mockData.lowLoadData);
    expect(resTwo).toBeTruthy();
  });
});

describe("getLastElements", () => {
  const initData = helpers.getInitialData();
  initData.push(mockData.singleDataPoint);
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  const res = helpers.getLastElements(initData, numOfElemetns);
  it("return the array of correct length", () => {
    expect(res.length).toBe(numOfElemetns);
  });
  it("should remove the first item of the array", () => {
    expect(res[0].x !== initData[0].x).toBeTruthy();
  });
});
