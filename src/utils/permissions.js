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
    "settings",
  ],
  coordinator: ["admissions", "students", "communication"],
  teacher: ["students", "communication"],
};

// UI gating is convenience, not security — the backend enforces the same
// matrix plus center/class scoping on every endpoint.
export const can = (role, permission) =>
  (MATRIX[role] ?? []).includes(permission);

export const ROLE_LABELS = {
  internal_admin: "Internal Admin",
  center_admin: "Center Admin / Principal",
  coordinator: "Coordinator",
  teacher: "Teacher",
};
