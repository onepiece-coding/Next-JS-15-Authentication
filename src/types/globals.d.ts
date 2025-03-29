export {}; // importing an empty object makes this file a module

export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
    };
  }
}
