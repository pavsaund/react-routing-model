import React from "react";
import { Routes } from "react-router-dom";
import { mapDefinitionToRoutes } from "./mapDefinitionToRoutes";
import { RoutePathDefinition } from './RoutePathDefinition';

export interface RoutesRendererProps {
    routes: RoutePathDefinition[];
  }

export function RoutesRenderer({ routes }: RoutesRendererProps) {
  const RoutesToRender = mapDefinitionToRoutes(routes);
  return <Routes>{RoutesToRender}</Routes>;
}
