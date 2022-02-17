
export type RoutePathDefinition = {
  title: string;
  path: string;
  element: JSX.Element;
  nestedRoutes?: RoutePathDefinition[];
  nav?: boolean;
};


