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
  initData.push(mockData.singleDataPoint);
  const res = helpers.clearBacklog(initData);
  const numOfElemetns = Math.floor(XAXISRANGE / TICKINTERVAL);
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
