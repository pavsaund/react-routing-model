import { RouteObject } from "react-router-dom";
import { ActiveRoutePathTitleCallback } from './ActiveRoutePathTitleCallback';


export type RoutePathDefinition = RouteObject & {
  title: string | ActiveRoutePathTitleCallback;
  nav?: boolean;
  children?: RoutePathDefinition[];
  path: string;
};
