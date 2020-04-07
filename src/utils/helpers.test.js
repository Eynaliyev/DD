import * as helpers from "./helpers";
import * as mockData from "./mock-data";
import annotationOptions from "./annotations";
import chartOptions from "./options";
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

describe("createAnnotation", () => {
  beforeEach(() => {
    chartOptions.annotations.xaxis.length = [];
  });

  afterEach(() => {
    chartOptions.annotations.xaxis.length = [];
  });

  it("should append generated annotation to the end of the annotations array", () => {
    const res = helpers.createAnnotation(1, 2);
    expect(chartOptions.annotations.xaxis.length).toEqual(1);
  });
});

describe("getAnnotations", () => {
  it("should return an object with given x1 and x2 values", () => {
    const res = helpers.getAnnotations(1, 2);
    expect(res.x1).toEqual(1);
    expect(res.x2).toEqual(2);
  });
});

describe("latestElementsHighLoad", () => {
  it("should return whether all elements of the array have value above 1", () => {
    const resOne = helpers.latestElementsHighLoad(mockData.highLoadData);
    expect(resOne).toBeTruthy();
    const resTwo = helpers.latestElementsHighLoad(mockData.lowLoadData);
    expect(resTwo).toBeFalsy();
  });
});

describe("latestElementsLowLoad", () => {
  it("should return whether all elements of the array have value below 1", () => {
    const resOne = helpers.latestElementsLowLoad(mockData.highLoadData);
    expect(resOne).toBeFalsy();
    const resTwo = helpers.latestElementsLowLoad(mockData.lowLoadData);
    expect(resTwo).toBeTruthy();
  });
});
