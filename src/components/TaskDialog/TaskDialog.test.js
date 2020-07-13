import React from "react";

import ReactDOM from "react-dom";

import TaskDialog from "./TaskDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<TaskDialog />, div);

  ReactDOM.unmountComponentAtNode(div);
});
