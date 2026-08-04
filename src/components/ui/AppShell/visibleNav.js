import { can } from "../../../utils/permissions";

// One nav tree, permission-gated — never a forked sidebar per role.
const visibleNav = (items = [], role) =>
  items
    .filter((i) => !i.permission || can(role, i.permission))
    .map((i) =>
      i.children ? { ...i, children: visibleNav(i.children, role) } : i,
    );

export default visibleNav;
