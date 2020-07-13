import React from "react";

import ReactDOM from "react-dom";

import ProjectDialog from "./ProjectDialog";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ProjectDialog />, div);

  ReactDOM.unmountComponentAtNode(div);
});
