
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
