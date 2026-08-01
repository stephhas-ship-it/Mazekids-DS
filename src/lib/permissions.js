/* permissions.js — the role matrix from the design system, in code.
   One visual system, permission-gated. Extend the matrix to add a role
   or capability — never fork components per role. */

const MATRIX = {
  internal_admin: [
    "view_all_centers",
    "billing",
    "approve_expenses",
    "manage_staff",
    "admissions",
    "students",
    "communication",
    "settings",
  ],
  center_admin: [
    "billing",
    "approve_expenses",
    "manage_staff",
    "admissions",
    "students",
    "communication",
    "settings", // limited — scope checks happen server-side
  ],
  coordinator: ["admissions", "students", "communication"],
  teacher: ["students", "communication"], // scope: own class — enforce server-side
};

export const can = (role, permission) => MATRIX[role].includes(permission);

export const ROLE_LABELS = {
  internal_admin: "Internal Admin",
  center_admin: "Center Admin / Principal",
  coordinator: "Coordinator",
  teacher: "Teacher",
};

/* NOTE: UI gating is a convenience, not security. The backend must enforce
   the same matrix (plus center/class scoping) on every endpoint. */
