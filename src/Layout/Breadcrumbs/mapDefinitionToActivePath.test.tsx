import { mapDefinitionToActivePath } from "./mapDefinitionToActivePath";
import { RoutePathDefinition } from "../../Routing/RoutePathDefinition";

const routes: RoutePathDefinition[] = [
  { title: "Home", path: "/", element: <h1>test</h1> },
  {
    title: "Sub",
    path: "/sub",
    element: <h1>test</h1>,
    children: [
      { title: "Sub-One", path: "one", element: <h1>test</h1> },
      { title: "Sub-Two", path: "two", element: <h1>test</h1> },
    ],
  },
  {
    title: "Params",
    path: "/params/:id",
    element: <h1>test</h1>,
    children: [
      {
        title: "Params-Details",
        path: "details",
        element: <h1>test</h1>,
        children: [
          { title: "Params-Details-Tab1", path: "tab1", element: <h1>test</h1> },
          { title: "Params-Details-Tab2", path: "tab2/:compareToId", element: <h1>test</h1> },
        ],
      },
    ],
  },
];
test("when mapping / route", () => {
  const mappedActivePath = mapDefinitionToActivePath(routes, "/");

  expect(mappedActivePath.length).toEqual(1);
  expect(mappedActivePath[0].resolvedPath).toEqual("/");
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
