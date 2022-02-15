import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  generatePath,
  Link,
  matchPath,
  Outlet,
  PathRouteProps,
  resolvePath,
  Route,
  Routes,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

type RoutePathDefinition = {
  title: string;
  path: string;
  element: JSX.Element;
  children?: RoutePathDefinition[];
};

const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <h1>root</h1> },
  {
    title: "Sub",
    path: "/sub",
    element: (
      <>
        <h1>sub</h1>
        <Outlet />
      </>
    ),
    children: [
      {
        title: "Sub-Zero",
        path: "zero",
        element: (
          <>
            <h1>sub-zero</h1>
            <Outlet />
          </>
        ),
        children: [
          { title: "Sub-Zero-Oh", path: "oh", element: <h1>sub-zero-oh</h1> },
          { title: "Sub-Zero-Oh-Oh", path: "oh-oh", element: <h1>sub-zero-oh-oh</h1> },
        ],
      },
      { title: "Sub-One", path: "one", element: <h1>sub-one</h1> },
    ],
  },
  {
    title: "Sub2",
    path: "/sub2",
    element: (
      <>
        <h1>sub2</h1>
        <Outlet />
      </>
    ),
    children: [
      { title: "Sub2-Zero", path: "zero", element: <h1>sub2-zero</h1> },
      { title: "Sub2-One", path: "one", element: <h1>sub2-one</h1> },
    ],
  },
];

function mapDefinitionToRoutes(definitions: RoutePathDefinition[]): React.ReactNode {
  return definitions.map((definition) => {
    const routeProps: PathRouteProps = {
      path: definition.path,
      element: definition.element,
    };
    if (definition.children) {
      routeProps.children = mapDefinitionToRoutes(definition.children);
    }

    return <Route key={routeProps.path} {...routeProps} />;
  });
}
function mapDefinitionToMenu(
  definitions: RoutePathDefinition[],
  parent: string = "",
  params: any = {}
): React.ReactNode {
  return (
    <ul>
      {definitions.map((definition, index) => {
        const builtPath = concatPaths(parent, definition.path);
        const to = generatePath(builtPath, params);
        return (
          <li key={definition.path} style={{ display: "inline-block", listStyleImage: "none", marginLeft: "2rem" }}>
            <Link to={to}>{definition.title}</Link>
            {definition.children ? mapDefinitionToMenu(definition.children, builtPath) : undefined}
          </li>
        );
      })}
    </ul>
  );
}

function mapDefinitionToActivePath(
  definitions: RoutePathDefinition[],
  locationPathname: string,
  parentPath: string = "",
  params: any = {}
): RoutePathDefinition[] {
  const matched: RoutePathDefinition[] = [];

  definitions.forEach((definition, index) => {
    const builtPath = concatPaths(parentPath, definition.path);
    const to = generatePath(definition.path, params);
    const resolvedPath = resolvePath(to, parentPath);

    console.log("builtPath", builtPath);
    console.log("to", to);
    console.log("resolvedPath", resolvedPath);

    let toPathname = resolvedPath.pathname;
    let isActive =
      locationPathname === toPathname ||
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

function concatPaths(parent: string, current: string) {
  // https://github.com/remix-run/react-router/blob/f16c5490dfa75f15dcfb86d2a981a7c58a9d1a33/packages/react-router/index.tsx#L1369
  //   const joinPaths = (paths: string[]): string =>
  //   paths.join("/").replace(/\/\/+/g, "/");

  // const normalizePathname = (pathname: string): string =>
  //   pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
  const cleanedParent = parent
    ? parent.endsWith("/*")
      ? parent.slice(0, parent.length - 3)
      : parent.endsWith("/") || parent.endsWith("*")
      ? parent.slice(0, parent.length - 2)
      : parent
    : parent;
  const cleanedCurrent = current.startsWith("/") ? current : `/${current}`;
  // console.log("parent", parent);
  // console.log("cleaned parent", cleanedParent);
  // console.log("cleaned current", cleanedCurrent);
  return `${cleanedParent}${cleanedCurrent}`;
}

function App() {
  const RoutesToRender = mapDefinitionToRoutes(routes);
  const LinksToRender = mapDefinitionToMenu(routes);
  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div style={{ outline: "magenta 6px dashed" }}>{LinksToRender}</div>
        <div style={{ outline: "cyan 6px dashed" }}>
          <Breadcrumbs />
        </div>
        <Routes>{RoutesToRender}</Routes>
      </main>
    </div>
  );
}

export function Breadcrumbs() {
  const location = useLocation();
  const activePathDefinitions = mapDefinitionToActivePath(routes, location.pathname);
  return (
    <>
      {activePathDefinitions.map((def, index) => (
        <div key={index}>
          {index === 0 ? "" : "> "}
          {def.title}
        </div>
      ))}
    </>
  );
}

export default App;
