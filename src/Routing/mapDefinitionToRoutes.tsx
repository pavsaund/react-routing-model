import React from "react";
import { PathRouteProps, Route } from "react-router-dom";
import { RoutePathDefinition } from "./RoutePathDefinition";

export function mapDefinitionToRoutes(definitions: RoutePathDefinition[]): JSX.Element {
  return (
    <>
      {definitions.map((definition) => {
        const routeProps: PathRouteProps = {
          path: definition.path,
          element: definition.element,
        };
        if (definition.children) {
          routeProps.children = mapDefinitionToRoutes(definition.children);
        }

        return <Route key={routeProps.path} {...routeProps} />;
      })}
    </>
  );
}
