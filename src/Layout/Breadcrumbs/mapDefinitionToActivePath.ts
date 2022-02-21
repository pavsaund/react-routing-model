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

    if (
      isResolvedAsActive(toPathname, locationPathname, definition) &&
      canBeAddedToActiveRoutes(activeRoutePaths, toPathname)
    ) {
      activeRoutePaths.push({
        resolvedPath: toPathname,
        definition: definition,
        title: definition.titleResolver?.(definition, matchedPath?.params || {}) || definition.title,
      });
      if (definition.nestedRoutes) {
        const nestedMatches = mapDefinitionToActivePath(
          definition.nestedRoutes,
          locationPathname,
          pathPatternWithParent
        );
        nestedMatches.forEach((activePath) => {
          if (canBeAddedToActiveRoutes(activeRoutePaths, activePath.resolvedPath)) {
            activeRoutePaths.push(activePath);
          }
        });
      }
    }
  });
  return activeRoutePaths;
}

function isResolvedAsActive(toPathname: string, locationPathname: string, definition: RoutePathDefinition<string>) {
  return isPathActiveForLocation(toPathname, locationPathname) && isNotCatchAll(definition.path);
}

function canBeAddedToActiveRoutes(activeRoutePaths: ActiveRoutePath[], toPathname: string) {
  return (
    isNotSameAsPreviousMatch(activeRoutePaths, toPathname) &&
    isMoreSpecificThanPreviousMatch(activeRoutePaths, toPathname)
  );
}

function getPreviousMatch(previousMatches: ActiveRoutePath[]): ActiveRoutePath | undefined {
  return previousMatches[previousMatches.length - 1];
}

function isNotSameAsPreviousMatch(previousMatches: ActiveRoutePath[], toPathname: string): boolean {
  const previousMatchedPathname = getPreviousMatch(previousMatches)?.resolvedPath ?? "";
  return previousMatchedPathname !== toPathname;
}

function isMoreSpecificThanPreviousMatch(previousMatches: ActiveRoutePath[], toPathname: string): boolean {
  const previousMatchedPathname = getPreviousMatch(previousMatches)?.resolvedPath ?? "";
  return toPathname.length > previousMatchedPathname.length;
}

function isNotCatchAll(path: string) {
  return path !== "*";
}
