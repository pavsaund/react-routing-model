import React from "react";
import { useLocation } from "react-router-dom";
import { mapDefinitionToActivePath } from "../Routing/mapDefinitionToActivePath";
import { RoutePathDefinition } from "../Routing/RoutePathDefinition";

interface BreadcrumbsProps {
  routes: RoutePathDefinition[];
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const location = useLocation();
  const activeRoutePaths = mapDefinitionToActivePath(routes, location.pathname);
  return (
    <>
      {activeRoutePaths.map((active, index) => (
        <div key={index}>
          {index === 0 ? "" : "> "}
          {active.definition.title}
        </div>
      ))}
    </>
  );
}
