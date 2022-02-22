import React from "react";
import { Link } from "react-router-dom";
import { RoutePathDefinition } from '../../Routing/RoutePathDefinition';
import { useActiveRoutePaths } from '../../Routing/useActiveRoutePaths';


export interface BreadcrumbsProps {
  routes: RoutePathDefinition[];
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {
  const activeRoutePaths = useActiveRoutePaths(routes);
  return (
    <>
      {activeRoutePaths.map((active, index) => (
        <span key={index}>
          {index === 0 ? "" : " > "}
          <Link to={active.match.pathname}>{active.title}</Link>
        </span>
      ))}
    </>
  );
}
