import React from "react";
import { generatePath, Link } from "react-router-dom";
import { concatPaths } from '../../Routing/routeHelpers';
import { RoutePathDefinition } from "../../Routing/RoutePathDefinition";

export function mapDefinitionToMenu(definitions: RoutePathDefinition[], parent: string = ""): React.ReactNode {
  return (
    <ul>
      {definitions.map((definition, index) => {
        if(!definition.nav){
          return undefined;
        }
        const builtPath = concatPaths(parent, definition.path);
        let to: string | undefined;
        try {
          to = generatePath(builtPath);
        } catch (err) {}
        return (
          <>
            {to ? (
              <li key={definition.path} style={{ display: "inline-block", listStyleImage: "none", marginLeft: "2rem" }}>
                <Link to={to}>{definition.title}</Link>
                {definition.children ? mapDefinitionToMenu(definition.children, builtPath) : undefined}
              </li>
            ) : undefined}
          </>
        );
      })}
    </ul>
  );
}
