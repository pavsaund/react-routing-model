import { BreadcrumbComponentType, BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { Page } from "../Layout/Page";
import { RoutePathDefinition } from "../Routing/RoutePathDefinition";

const ParamBreadcrumb: BreadcrumbComponentType<'id'> = ({ match }) => {
  return <>{`Param-${match.params.id}`}</>;
}

export const routesWithBreadcrumbs: BreadcrumbsRoute[] = [
  { breadcrumb: "Home", path: "/", element: <Page title="home" /> },
  {
    breadcrumb: "Sub",
    path: "/sub",
    element: <Page title="sub" withOutlet />,
    children: [
      {
        breadcrumb: "Sub-Zero",
        path: "zero",
        element: <Page title="sub-zero" withOutlet />,
        children: [
          { breadcrumb: "Sub-Zero-Oh", path: "oh", element: <Page title={"sub-zero-oh"} /> },
          { breadcrumb: "Sub-Zero-Oh-Oh", path: "oh-oh", element: <Page title="sub-zero-oh-oh" /> },
        ],
      },
      { breadcrumb: "Sub-One", path: "one", element: <Page title="sub-one" /> },
    ],
  },
  {
    breadcrumb: "Sub2",
    path: "/sub2",
    element: <Page title="sub2" withOutlet />,
    children: [
      { breadcrumb: "Sub2-Zero", path: "zero", element: <Page title="sub2-zero" /> },
      { breadcrumb: "Sub2-One", path: "one", element: <Page title="sub2-one" /> },
      {
        breadcrumb: ParamBreadcrumb,
        // titleResolver: (def, { id }) => `Param-${id}`,
        path: "param/:id",
        element: <Page title="sub2-param" withOutlet />,
        children: [
          { breadcrumb: "Sub2-Param-Zero", path: "zero", element: <Page title="Sub2-Param-Zero" /> },
          { breadcrumb: "Sub2-Param-One", path: "one", element: <Page title="Sub2-Param-One" /> },
        ],
      },
    ],
  },
  {
    breadcrumb: "With Sub Route",
    path: "empty",
    element: <Page title="Empty Sub Route" />,
    children: [
      { breadcrumb: "Empty Sub route", path: "", element: <Page title="EMPTY" /> },
      { breadcrumb: "Sub route", path: "sub", element: <Page title="Sub2-Param-One" /> },
    ]
  },
  {
    breadcrumb: "Params with ID",
    path: "/params/:id",
    element: <Page title="params" withOutlet />,
    children: [
      { breadcrumb: "Params with ID-details", path: "details", element: <Page title="params-details" /> },
      { breadcrumb: "Params with ID-extended", path: "extended", element: <Page title="params-extended" /> },
    ],
  },
  {
    breadcrumb: null,
    path: "*",
    element: <Page title="404" />,
  },
];
