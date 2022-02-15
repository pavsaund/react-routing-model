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
    const to = generateToPath(definition, params);
    const resolvedPath = resolvePath(to, parentPath);

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
function generateToPath( definition: RoutePathDefinition, params: any) {
  let to = '';
  try {
    to = generatePath(definition.path, params);
  } catch (err) {
    to = definition.path;
  }
  return to;
}

