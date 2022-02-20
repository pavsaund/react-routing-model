import { ActiveRoutePath } from "./ActiveRoutePath";
import { matchPatternInPath, isPathActiveForLocation, concatPaths } from "../../Routing/routeHelpers";
import { RoutePathDefinition } from "../../Routing/RoutePathDefinition";

export function mapDefinitionToActivePath(
  definitions: RoutePathDefinition[],
  locationPathname: string,
  parentPath: string = ""
): ActiveRoutePath[] {
  const activeRoutePaths: ActiveRoutePath[] = [];

  definitions.forEach((definition, index) => {
    const pathPatternWithParent = concatPaths(parentPath, definition.path);

    const matchedPath = matchPatternInPath(pathPatternWithParent, locationPathname);

    if (!matchedPath) {
      return;
    }
    const toPathname = matchedPath.pathname;

    const isActive = isPathActiveForLocation(toPathname, locationPathname);

    if (isActive) {
      activeRoutePaths.push({
        resolvedPath: toPathname,
        definition: definition,
        title: definition.titleResolver?.(definition, matchedPath?.params || {}) || definition.title,
      });
      if (definition.nestedRoutes) {
        activeRoutePaths.push(
          ...mapDefinitionToActivePath(definition.nestedRoutes, locationPathname, pathPatternWithParent)
        );
      }
    }
  });
  return activeRoutePaths;
}
