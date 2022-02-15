import { generatePath, resolvePath } from "react-router-dom";
import { RoutePathDefinition } from './RoutePathDefinition';
import { concatPaths } from "./concatPaths";

export function mapDefinitionToActivePath(
  definitions: RoutePathDefinition[],
  locationPathname: string,
  parentPath: string = "",
  params: any = {}): RoutePathDefinition[] {
  const matched: RoutePathDefinition[] = [];

  definitions.forEach((definition, index) => {
    const builtPath = concatPaths(parentPath, definition.path);
    const to = generatePath(definition.path, params);
    const resolvedPath = resolvePath(to, parentPath);

    console.log("builtPath", builtPath);
    console.log("to", to);
    console.log("resolvedPath", resolvedPath);

    let toPathname = resolvedPath.pathname;
    let isActive = locationPathname === toPathname ||
      (locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/");

    console.log(isActive);

    if (isActive) {
      matched.push(definition);
      if (definition.children) {
        matched.push(...mapDefinitionToActivePath(definition.children, locationPathname, builtPath));
      }
    }
  });
  return matched;
}
