import { Params } from "react-router-dom";

export type RoutePathParams<ParamsOrKey extends string | Record<string, string | undefined>> = Readonly<[ParamsOrKey] extends [string] ? Params<ParamsOrKey> : Partial<ParamsOrKey>>;

export type RoutePathDefinition<ParamsOrKey extends string | Record<string, string | undefined> = string> = {
  title: string;
  titleResolver?: (
    definition: RoutePathDefinition,
    params: RoutePathParams<ParamsOrKey>
  ) => string;
  path: string;
  element: JSX.Element;
  nestedRoutes?: RoutePathDefinition[];
  nav?: boolean;
};
