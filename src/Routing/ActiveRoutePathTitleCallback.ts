import { PathMatch } from 'react-router-dom';
import { RoutePathDefinition } from './RoutePathDefinition';

export type ActiveRoutePathTitleCallbackParams<ParamKey extends string = string> = {
    definition: RoutePathDefinition;
    match: PathMatch<ParamKey>;
    locationPathname: string;
  };

export type ActiveRoutePathTitleCallback = (params: ActiveRoutePathTitleCallbackParams) => string;
