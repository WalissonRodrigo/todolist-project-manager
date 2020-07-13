import React from "react";

import ReactDOM from "react-dom";

import TaskCard from "./TaskCard";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<TaskCard />, div);

  ReactDOM.unmountComponentAtNode(div);
});
