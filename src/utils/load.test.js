import * as mockData from "./mock-data";
import * as loadUtils from "./load";

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
      const res = loadUtils.isStillHighLoad(
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
    const resOne = loadUtils.isHighLoad(mockData.highLoadData);
    expect(resOne).toBeTruthy();
    const resTwo = loadUtils.isHighLoad(mockData.lowLoadData);
    expect(resTwo).toBeFalsy();
  });
});

describe("isLowLoad", () => {
  it("should return whether all elements of the array have value below 1", () => {
    const resOne = loadUtils.isLowLoad(mockData.highLoadData);
    expect(resOne).toBeFalsy();
    const resTwo = loadUtils.isLowLoad(mockData.lowLoadData);
    expect(resTwo).toBeTruthy();
  });
});
