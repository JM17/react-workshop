import { Users } from "./feature/users/views";

type RouteDestination = {
  path: string;
  element: () => JSX.Element;
};

export const routes: RouteDestination[] = [
  Users,
  { path: "two/*", element: () => <>two</> },
  { path: "three/*", element: () => <>three</> },
];
