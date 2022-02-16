import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutePathDefinition } from '../../Routing/RoutePathDefinition';
import { mapDefinitionToActivePath } from './mapDefinitionToActivePath';

export interface BreadcrumbsProps {
  routes: RoutePathDefinition[];
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const location = useLocation();
  const activeRoutePaths = mapDefinitionToActivePath(routes, location.pathname);

  return (
    <>
      {activeRoutePaths.map((active, index) => (
        <span key={index}>
          {index === 0 ? "" : " > "}
          <Link to={active.resolvedPath}>{active.definition.title}</Link>
        </span>
      ))}
    </>
  );
}
