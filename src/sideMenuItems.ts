import { Role } from "./Roles";

export type Item = {
  to: string;
  label: string;
  requiredRole: Role;
};

export const items: Item[] = [
  { to: "users", label: "Users", requiredRole: Role.USERS_READ },
  { to: "two", label: "two", requiredRole: Role.TWO_READ },
  { to: "three", label: "three", requiredRole: Role.THREE_READ },
];
