import { PathMatch, RouteObject } from "react-router-dom";

export type RoutePathDefinition = RouteObject & {
  title: string;
  titleResolver?: (definition: RoutePathDefinition, match: PathMatch<string>) => string;
  nav?: boolean;
  children?: RoutePathDefinition[];
  path: string;
};
