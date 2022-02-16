import React from "react";
import { generatePath, Link } from "react-router-dom";
import { RoutePathDefinition } from "../Routing/RoutePathDefinition";
import { concatPaths } from "../Routing/concatPaths";

export function mapDefinitionToMenu(definitions: RoutePathDefinition[], parent: string = ""): React.ReactNode {
  return (
    <ul>
      {definitions.map((definition, index) => {
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
