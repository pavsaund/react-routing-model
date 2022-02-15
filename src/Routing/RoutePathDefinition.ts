
export type RoutePathDefinition = {
  title: string;
  path: string;
  element: JSX.Element;
  children?: RoutePathDefinition[];
};
