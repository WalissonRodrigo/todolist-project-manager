import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Bar from "./Bar";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <BrowserRouter>
      <Bar
        title=""
        performingAction={false}
        onAboutClick={() => {}}
        onSettingsClick={() => {}}
        onSignOutClick={() => {}}
      />
    </BrowserRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});
