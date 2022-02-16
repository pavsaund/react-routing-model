import { PathMatch, matchPath } from 'react-router-dom';

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