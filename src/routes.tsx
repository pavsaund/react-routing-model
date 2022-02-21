import { Page } from "./Layout/Page";
import { RoutePathDefinition } from "./Routing/RoutePathDefinition";

export const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <Page title="home" />, nav: true },
  {
    title: "Sub",
    path: "/sub",
    element: <Page title="sub" withOutlet />,
    nav: true,
    nestedRoutes: [
      {
        title: "Sub-Zero",
        path: "zero",
        element: <Page title="sub-zero" withOutlet />,
        nav: true,
        nestedRoutes: [
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
    nav: true,
    nestedRoutes: [
      { title: "Sub2-Zero", path: "zero", element: <Page title="sub2-zero" /> },
      { title: "Sub2-One", path: "one", element: <Page title="sub2-one" /> },
      {
        title: "Sub2-Param",
        titleResolver: (def, { id }) => `Param-${id}`,
        path: "param/:id",
        element: <Page title="sub2-param" withOutlet />,
        nestedRoutes: [
          { title: "Sub2-Param-Zero", path: "zero", element: <Page title="Sub2-Param-Zero" /> },
          { title: "Sub2-Param-One", path: "one", element: <Page title="Sub2-Param-One" /> },
        ],
      },
    ],
  },
  {
    title: "Params with ID",
    path: "/params/:id",
    element: <Page title="params" withOutlet />,
    nestedRoutes: [
      { title: "Params with ID-details", path: "details", element: <Page title="params-details" /> },
      { title: "Params with ID-extended", path: "extended", element: <Page title="params-extended" /> },
    ],
  },
  {
    title: "Catch All - 404",
    path: "*",
    element: <Page title="404" />,
  },
];
