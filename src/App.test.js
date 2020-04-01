import App from "./App";
import React from "react";
import { render } from "@testing-library/react";

test("renders learn react link", () => {
  const { getByLabelText } = render(<App />);
  const inputElement = getByLabelText(/find your collection schedule/i);
  expect(inputElement).toBeInTheDocument();
});
