import React from "react";
import { useLocation } from "react-router-dom";
import { mapDefinitionToActivePath } from "../Routing/mapDefinitionToActivePath";
import { RoutePathDefinition } from "../Routing/RoutePathDefinition";

interface BreadcrumbsProps {
  routes: RoutePathDefinition[];
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const location = useLocation();
  const activePathDefinitions = mapDefinitionToActivePath(routes, location.pathname);
  return (
    <>
      {activePathDefinitions.map((def, index) => (
        <div key={index}>
          {index === 0 ? "" : "> "}
          {def.title}
        </div>
      ))}
    </>
  );
}
