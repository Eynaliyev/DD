import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "./App";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("can render and update a counter", () => {
  // Test first render and componentDidMount
  act(() => {
    render(<App />, container);
  });
  const header = container.querySelector(".app__header");
  expect(header.textContent).toBe("DataDog task");
});
