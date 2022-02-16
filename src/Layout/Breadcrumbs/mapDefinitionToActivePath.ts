  import { ActiveRoutePath } from './ActiveRoutePath';
import { concatPaths } from '../../Routing/concatPaths';
import { matchPatternInPath, isPathActiveForLocation } from '../../Routing/routeHelpers';
import { RoutePathDefinition } from '../../Routing/RoutePathDefinition';

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
