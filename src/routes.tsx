import { Page } from "./Layout/Page";
import { ActiveRoutePathTitleCallbackParams } from './Routing/ActiveRoutePathTitleCallback';
import { RoutePathDefinition } from "./Routing/RoutePathDefinition";

export const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <Page title="home" />, nav: true },
  {
    title: "Sub",
    path: "/sub",
    element: <Page title="sub" withOutlet />,
    nav: true,
    children: [
      {
        title: "Sub-Zero",
        path: "zero",
        element: <Page title="sub-zero" withOutlet />,
        nav: true,
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
    nav: true,
    children: [
      { title: "Sub2-Zero", path: "zero", element: <Page title="sub2-zero" /> },
      { title: "Sub2-One", path: "one", element: <Page title="sub2-one" /> },
      {
        title: ({ match }: ActiveRoutePathTitleCallbackParams<'id'>) => `Param-${match.params.id}`,
        path: "param/:id",
        element: <Page title="sub2-param" withOutlet />,
        children: [
          { title: "Sub2-Param-Zero", path: "zero", element: <Page title="Sub2-Param-Zero" /> },
          { title: "Sub2-Param-One", path: "one", element: <Page title="Sub2-Param-One" /> },
        ],
      },
    ],
  },
  {
    title: "With Sub Route",
    path: "empty",
    element: <Page title="Empty Sub Route" />,
    nav: true,
    children: [
      { title: "Empty Sub route", path: "", element: <Page title="EMPTY" />, nav: true },
      { title: "Sub route", path: "sub", element: <Page title="Sub2-Param-One" />, nav: true },
    ]
  },
  {
    title: "Params with ID",
    path: "/params/:id",
    element: <Page title="params" withOutlet />,
    children: [
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
