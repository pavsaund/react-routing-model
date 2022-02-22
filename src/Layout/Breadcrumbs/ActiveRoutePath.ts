import { PathMatch } from 'react-router-dom';
import { RoutePathDefinition } from '../../Routing/RoutePathDefinition';

export type ActiveRoutePath = {
  title: string;
  match: PathMatch<string>
  definition: RoutePathDefinition;
};
