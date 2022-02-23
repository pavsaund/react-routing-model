import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';
import { routesWithBreadcrumbs } from './routesWithBreadcrumbs';


export interface BreadcrumbsProps {
  routes: BreadcrumbsRoute[];
}

export function Breadcrumbs({ routes }: BreadcrumbsProps) {

  const breadcrumbs = useReactRouterBreadcrumbs(routesWithBreadcrumbs);

  return (
    <>
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {index === 0 ? "" : " > "}
          <Link to={breadcrumb.match.pathname}>{breadcrumb.breadcrumb}</Link>
        </span>
      ))}
    </>
  );
}
