import { Outlet } from "react-router-dom";
import { RoutePathDefinition } from "./Routing/RoutePathDefinition";

export const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <h1>root</h1> },
  {
    title: "Sub",
    path: "/sub",
    element: (
      <>
        <h1>sub</h1>
        <Outlet />
      </>
    ),
    children: [
      {
        title: "Sub-Zero",
        path: "zero",
        element: (
          <>
            <h1>sub-zero</h1>
            <Outlet />
          </>
        ),
        children: [
          { title: "Sub-Zero-Oh", path: "oh", element: <h1>sub-zero-oh</h1> },
          { title: "Sub-Zero-Oh-Oh", path: "oh-oh", element: <h1>sub-zero-oh-oh</h1> },
        ],
      },
      { title: "Sub-One", path: "one", element: <h1>sub-one</h1> },
    ],
  },
  {
    title: "Sub2",
    path: "/sub2",
    element: (
      <>
        <h1>sub2</h1>
        <Outlet />
      </>
    ),
    children: [
      { title: "Sub2-Zero", path: "zero", element: <h1>sub2-zero</h1> },
      { title: "Sub2-One", path: "one/", element: <h1>sub2-one</h1> },
    ],
  },
];
