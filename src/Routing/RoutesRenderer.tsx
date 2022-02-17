import React from "react";
import { PathRouteProps, Route, Routes } from "react-router-dom";
import { RoutePathDefinition } from "./RoutePathDefinition";

//Inspiration from https://coderrocketfuel.com/article/recursion-in-react-render-comments-with-nested-children

function mapDefinitionToRoute(definition: RoutePathDefinition): JSX.Element {
  const routeProps: PathRouteProps = {
    path: definition.path,
    element: definition.element,
  };
  const nestedDefinitionRoutes = definition.children?.map((childDefinitionRoute) =>
    mapDefinitionToRoute(childDefinitionRoute)
  );

  return (
    <Route key={routeProps.path} {...routeProps}>
      {nestedDefinitionRoutes}
    </Route>
  );
}

export interface RoutesRendererProps {
  routes: RoutePathDefinition[];
}

export function RoutesRenderer({ routes }: RoutesRendererProps) {
  const DefinitionRoutes = routes.map((route) => mapDefinitionToRoute(route));
  return <Routes>{DefinitionRoutes}</Routes>;
}
