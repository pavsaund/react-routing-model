import { mapDefinitionToActivePath } from "./mapDefinitionToActivePath";
import { RoutePathDefinition, RoutePathParams } from "../../Routing/RoutePathDefinition";

const compareToIdTitleResolver = (
  definition: RoutePathDefinition,
  { compareToId }: RoutePathParams<string>
) => {
  return `Params-Details-Tab3/${compareToId}`;
};

const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <h1>test</h1> },
  {
    title: "Sub",
    path: "/sub",
    element: <h1>test</h1>,
    nestedRoutes: [
      { title: "Sub-One", path: "one", element: <h1>test</h1> },
      { title: "Sub-Two", path: "two", element: <h1>test</h1> },
    ],
  },
  {
    title: "Params",
    path: "/params/:id",
    element: <h1>test</h1>,
    nestedRoutes: [
      {
        title: "Params-Details",
        path: "details",
        element: <h1>test</h1>,
        nestedRoutes: [
          { title: "Params-Details-Tab1", path: "tab1", element: <h1>test</h1> },
          { title: "Params-Details-Tab2", path: "tab2/:compareToId", element: <h1>test</h1> },
          {
            title: "Params-Details-Tab3",
            titleResolver: compareToIdTitleResolver,
            path: "tab3/:compareToId",
            element: <h1>test</h1>,
          },
        ],
      },
    ],
  },
  {
    title: "With Empty Sub Route",
    path: "empty",
    element: <h1>With Empty Sub Route</h1>,
    nav: true,
    nestedRoutes: [
      { title: "Empty Sub route", path: "", element: <h1>empty sub route</h1>},
      { title: "Sub route", path: "sub", element: <h1>sub route</h1> },
    ]
  },
  {
    title: "Catch All - 404",
    path: "*",
    element: <h1>404</h1>,
  },
];

test("when mapping / route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/");

  expect(mappedActivePath.length).toEqual(1);
  expect(mappedActivePath[0].resolvedPath).toEqual("/");
  expect(mappedActivePath[0].title).toEqual("Home");
});

test("when mapping /sub route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/sub");

  expect(mappedActivePath.length).toEqual(1);
  expect(mappedActivePath[0].resolvedPath).toEqual("/sub");
});

test("when mapping /sub/one route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/sub/one");

  expect(mappedActivePath.length).toEqual(2);
  expect(mappedActivePath[0].resolvedPath).toEqual("/sub");
  expect(mappedActivePath[1].resolvedPath).toEqual("/sub/one");
});

test("when mapping /params/123 route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/params/123");

  expect(mappedActivePath.length).toEqual(1);
  expect(mappedActivePath[0].resolvedPath).toEqual("/params/123");
});

test("when mapping /params/123/details route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/params/123/details");

  expect(mappedActivePath.length).toEqual(2);
  expect(mappedActivePath[0].resolvedPath).toEqual("/params/123");
  expect(mappedActivePath[1].resolvedPath).toEqual("/params/123/details");
});

test("when mapping /params/123/details/tab1 route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/params/123/details/tab1");

  expect(mappedActivePath.length).toEqual(3);
  expect(mappedActivePath[0].resolvedPath).toEqual("/params/123");
  expect(mappedActivePath[1].resolvedPath).toEqual("/params/123/details");
  expect(mappedActivePath[2].resolvedPath).toEqual("/params/123/details/tab1");
});

test("when mapping /params/123/details/tab2/321 route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/params/123/details/tab2/321");

  expect(mappedActivePath.length).toEqual(3);
  expect(mappedActivePath[0].resolvedPath).toEqual("/params/123");
  expect(mappedActivePath[1].resolvedPath).toEqual("/params/123/details");
  expect(mappedActivePath[2].resolvedPath).toEqual("/params/123/details/tab2/321");
});

test("when mapping route with custom title resolver", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/params/123/details/tab3/321");

  expect(mappedActivePath.length).toEqual(3);
  expect(mappedActivePath[0].resolvedPath).toEqual("/params/123");
  expect(mappedActivePath[1].resolvedPath).toEqual("/params/123/details");
  expect(mappedActivePath[2].resolvedPath).toEqual("/params/123/details/tab3/321");
  expect(mappedActivePath[2].title).toEqual("Params-Details-Tab3/321");
});

test("when mapping route with empty sub route /empty/", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/empty/");

  expect(mappedActivePath.length).toEqual(1);
  expect(mappedActivePath[0].resolvedPath).toEqual("/empty");
});

test("when mapping route with empty sub route /empty/sub", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/empty/sub");

  expect(mappedActivePath.length).toEqual(2);
  expect(mappedActivePath[0].resolvedPath).toEqual("/empty");
  expect(mappedActivePath[1].resolvedPath).toEqual("/empty/sub");
});
