import { PathMatch, matchPath } from 'react-router-dom';

export function concatPaths(parent: string, current: string) {
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


export function isPathActiveForLocation(pathName: string, locationPathname: string) {
  //isActive logic from NavLink: https://github.com/remix-run/react-router/blob/7668662895337af01f0a8eb22788e0e6b2f5e344/packages/react-router-dom/index.tsx#L324
  return locationPathname === pathName ||
    (locationPathname.startsWith(pathName) && locationPathname.charAt(pathName.length) === "/");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function matchPatternInPath(pathPattern: string, locationPathname: string): PathMatch<string> | null;
export function matchPatternInPath(pathPattern: string, locationPathname: string, requireExactMatch: boolean = false): PathMatch<string> | null {
  //use matchPath to resolve params on the path: https://github.com/remix-run/react-router/issues/5870#issuecomment-394194338
  return matchPath(
    {
      path: pathPattern,
      end: requireExactMatch,
    },
    locationPathname
  );
}