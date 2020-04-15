import * as utils from "./helpers";
import * as mockData from "./mock-data";
import { TICKINTERVAL, XAXISRANGE } from "./constants";

describe("getInitialData", () => {
  const res = utils.getInitialData();
  it("should return 60 items", () => {
    expect(res.length).toBe(60);
  });
});

describe("clearBacklog", () => {
  const initData = utils.getInitialData();
  const firstDataPointX = initData[0]["x"];
  initData.push(mockData.singleDataPoint);
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  utils.clearBacklog(initData);
  it("return the array of correct length", () => {
    expect(initData.length).toBe(numOfElemetns);
  });
  it("should remove the first item of the array", () => {
    expect(firstDataPointX !== initData[0].x).toBeTruthy();
  });
});

describe("getLastElements", () => {
  const initData = utils.getInitialData();
  initData.push(mockData.singleDataPoint);
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
  const res = utils.getLastElements(initData, numOfElemetns);
  it("return the array of correct length", () => {
    expect(res.length).toBe(numOfElemetns);
  });
  it("should remove the first item of the array", () => {
    expect(res[0].x !== initData[0].x).toBeTruthy();
  });
});
