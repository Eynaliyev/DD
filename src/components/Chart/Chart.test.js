import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import Chart from "./Chart";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// need to provide mock props to see if it works correctly
xit("can render and update a counter", () => {
  // Test first render and componentDidMount
  act(() => {
    render(<Chart />, container);
  });
  const header = container.querySelector(".app__header");
  expect(header.textContent).toBe("DataDog task");
});
