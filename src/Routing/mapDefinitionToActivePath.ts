import { Location, PathMatch } from "react-router-dom";
import { ActiveRoutePath } from "./ActiveRoutePath";
import { matchPatternInPath, isPathActiveForLocation, concatPaths } from "./routeHelpers";
import { RoutePathDefinition } from "./RoutePathDefinition";

export function mapDefinitionToActivePath(
  definitions: RoutePathDefinition[],
  locationPathname: string,
  parentPath: string = ""
): ActiveRoutePath[] {
  const activeRoutePaths: ActiveRoutePath[] = [];

  definitions.forEach((definition, index) => {
    const pathPatternWithParent = concatPaths(parentPath, definition.path);
    const match = matchPatternInPath(pathPatternWithParent, locationPathname);
    if (!match) {
      return;
    }

    if (isResolvedAsActive(match.pathname, locationPathname, definition)) {
      const activeRoutePath: ActiveRoutePath = {
        definition: definition,
        title:
          typeof definition.title === "function"
            ? definition.title({ definition, match, locationPathname: locationPathname })
            : definition.title,
        match: match,
      };
      addActiveRoutePathIfPossible(activeRoutePaths, activeRoutePath);

      if (definition.children) {
        const nestedMatches = mapDefinitionToActivePath(definition.children, locationPathname, pathPatternWithParent);
        nestedMatches.forEach((activePath) => {
          addActiveRoutePathIfPossible(activeRoutePaths, activePath);
        });
      }
    }
  });
  return activeRoutePaths;
}

function addActiveRoutePathIfPossible(activeRoutePaths: ActiveRoutePath[], activePath: ActiveRoutePath) {
  if (canBeAddedToActiveRoutes(activeRoutePaths, activePath.match)) {
    activeRoutePaths.push(activePath);
  }
}

function isResolvedAsActive(toPathname: string, locationPathname: string, definition: RoutePathDefinition) {
  return isPathActiveForLocation(toPathname, locationPathname) && isNotCatchAll(definition.path || "");
}

function canBeAddedToActiveRoutes(activeRoutePaths: ActiveRoutePath[], match: PathMatch<string>) {
  return (
    isNotSameAsPreviousMatch(activeRoutePaths, match) &&
    isMoreSpecificThanPreviousMatch(activeRoutePaths, match.pathname)
  );
}

function getPreviousMatch(previousMatches: ActiveRoutePath[]): ActiveRoutePath | undefined {
  return previousMatches[previousMatches.length - 1];
}

function isNotSameAsPreviousMatch(previousMatches: ActiveRoutePath[], match: PathMatch<string>): boolean {
  const previousMatchedPathname = getPreviousMatch(previousMatches)?.match.pattern ?? "";
  return previousMatchedPathname !== match.pattern;
}

function isMoreSpecificThanPreviousMatch(previousMatches: ActiveRoutePath[], toPathname: string): boolean {
  const previousMatchedPathname = getPreviousMatch(previousMatches)?.match.pathname ?? "";
  return toPathname.length > previousMatchedPathname.length;
}

function isNotCatchAll(path: string) {
  return path !== "*";
}
