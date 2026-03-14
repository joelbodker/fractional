import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./Home";
import { Practice } from "./Practice";
import { Summary } from "./Summary";

export const router = createBrowserRouter(
  [
    {
      path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "practice", Component: Practice },
      { path: "summary", Component: Summary },
      ],
    },
  ],
  { basename: "/fractional" }
);
