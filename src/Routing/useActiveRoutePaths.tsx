import { useLocation } from "react-router-dom";
import { RoutePathDefinition } from "./RoutePathDefinition";
import { ActiveRoutePath } from "./ActiveRoutePath";
import { mapDefinitionToActivePath } from "./mapDefinitionToActivePath";

export function useActiveRoutePaths(routes: RoutePathDefinition[]): ActiveRoutePath[] {
  const location = useLocation();
  const activeRoutePaths = mapDefinitionToActivePath(routes, location.pathname);
  return activeRoutePaths;
}
