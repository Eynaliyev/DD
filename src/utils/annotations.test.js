import * as annotationHelpers from "./annotations";
import chartOptions from "./options";

describe("createAnnotation", () => {
  beforeEach(() => {
    chartOptions.annotations.xaxis.length = [];
  });

  afterEach(() => {
    chartOptions.annotations.xaxis.length = [];
  });

  it("should append generated annotation to the end of the annotations array", () => {
    const res = annotationHelpers.createAnnotation(1, 2);
    expect(chartOptions.annotations.xaxis.length).toEqual(1);
  });
});

describe("getAnnotations", () => {
  it("should return an object with given x1 and x2 values", () => {
    const res = annotationHelpers.getAnnotations(1, 2);
    expect(res.x1).toEqual(1);
    expect(res.x2).toEqual(2);
  });
});

describe("updateAnnotations", () => {});
