import { RoutePathDefinition } from '../../Routing/RoutePathDefinition';

export type ActiveRoutePath = {
  resolvedPath: string;
  definition: RoutePathDefinition;
  title: string;
};
