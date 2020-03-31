import App from "./App";
import React from "react";
import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const { getByLabel } = render(<App />);
  const inputElement = getByLabel(/find your collection schedule/i);
  expect(inputElement).toBeInTheDocument();
});
