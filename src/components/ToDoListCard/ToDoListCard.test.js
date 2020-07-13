import React from "react";

import ReactDOM from "react-dom";

import ToDoListCard from "./ToDoListCard";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(<ToDoListCard />, div);

  ReactDOM.unmountComponentAtNode(div);
});
