import { matchPath, PathMatch } from "react-router-dom";
import { RoutePathDefinition } from "./RoutePathDefinition";
import { concatPaths } from "./concatPaths";
import { ActiveRoutePath } from "./ActiveRoutePath";

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

    const isActive = isPathActiveForLocation(toPathname,locationPathname);

    if (isActive) {
      activeRoutePaths.push({
        resolvedPath: toPathname,
        definition: definition,
      });
      if (definition.children) {
        activeRoutePaths.push(
          ...mapDefinitionToActivePath(definition.children, locationPathname, pathPatternWithParent)
        );
      }
    }
  });
  return activeRoutePaths;
}

function isPathActiveForLocation(pathName: string, locationPathname: string) {
  //isActive logic from NavLink: https://github.com/remix-run/react-router/blob/7668662895337af01f0a8eb22788e0e6b2f5e344/packages/react-router-dom/index.tsx#L324
  return locationPathname === pathName ||
    (locationPathname.startsWith(pathName) && locationPathname.charAt(pathName.length) === "/");
}

function matchPatternInPath(pathPattern: string, locationPathname: string): PathMatch<string> | null;
function matchPatternInPath(pathPattern: string, locationPathname: string, requireExactMatch: boolean = false): PathMatch<string> | null {
  //use matchPath to resolve params on the path: https://github.com/remix-run/react-router/issues/5870#issuecomment-394194338
  return matchPath(
    {
      path: pathPattern,
      end: requireExactMatch,
    },
    locationPathname
  );
}