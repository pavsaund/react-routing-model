import { RouteObject, useRoutes } from "react-router-dom";
import { RoutePathDefinition } from "./RoutePathDefinition";

export interface RoutesRendererProps {
  routes: RouteObject[];
}

export function RoutesRenderer({ routes }: RoutesRendererProps) {
  const renderedRoutes = useRoutes(routes);
  return renderedRoutes;
}
