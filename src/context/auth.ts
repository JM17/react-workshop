import { createContext, useContext } from "react";
import { Role } from "../Roles";

/** Mocked user */
export const user: User = {
  name: "John",
  roles: [Role.USERS_READ,
    Role.USERS_WRITE
  ],
};

interface User {
  name: string;
  roles: Role[];
}

export class AuthStore {
  public user: User | null;

  public constructor() {
    this.user = user;
    this.isAuthorized = this.isAuthorized.bind(this);
  }

  public isAuthorized(role: string | string[]): boolean {
    const requiredRoles = typeof role === "string" ? [role] : role;
    if (!this.user) {
      return false;
    } else {
      return this.user.roles.some((r) => requiredRoles.includes(r));
    }
  }
}

const authStore = new AuthStore();

const AuthContext = createContext(authStore);
AuthContext.displayName = "AuthContext";

function useAuth(): AuthStore {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthContext.Provider");
  }
  return context;
}

export { AuthContext, authStore, useAuth };
