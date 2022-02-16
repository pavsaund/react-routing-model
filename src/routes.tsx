import { Page } from "./Layout/Page";
import { RoutePathDefinition } from "./Routing/RoutePathDefinition";

export const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <Page title='home'/> },
  {
    title: "Sub",
    path: "/sub",
    element: <Page title="sub" withOutlet />,
    children: [
      {
        title: "Sub-Zero",
        path: "zero",
        element: <Page title="sub-zero" withOutlet />,
        children: [
          { title: "Sub-Zero-Oh", path: "oh", element: <Page title={"sub-zero-oh"} /> },
          { title: "Sub-Zero-Oh-Oh", path: "oh-oh", element: <Page title="sub-zero-oh-oh" /> },
        ],
      },
      { title: "Sub-One", path: "one", element: <Page title="sub-one" /> },
    ],
  },
  {
    title: "Sub2",
    path: "/sub2",
    element: <Page title="sub2" withOutlet />,
    children: [
      { title: "Sub2-Zero", path: "zero", element: <Page title="sub2-zero" /> },
      { title: "Sub2-One", path: "one", element: <Page title="sub2-one" /> },
    ],
  },
  { title: "Params with ID", path: "/params/:id", element: <Page title='params' withOutlet/>, children:[
    { title: "Params with ID-details", path: "details", element: <Page title="params-details" /> },
    { title: "Params with ID-extended", path: "extended", element: <Page title="params-extended" /> },
  ] },
];
