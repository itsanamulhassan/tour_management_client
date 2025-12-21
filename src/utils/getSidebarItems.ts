import { ROLE } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";

export type RoleProps = "SUPERADMIN" | "ADMIN" | "USER" | "GUIDE";
export const getSidebarItems = (userRole: RoleProps) => {
  switch (userRole) {
    case ROLE.ADMIN:
      return [...adminSidebarItems];
    case ROLE.SUPERADMIN:
      return [...adminSidebarItems];
    case ROLE.USER:
      return [...userSidebarItems];
    case ROLE.GUIDE:
      return [...userSidebarItems];
    default:
      return [];
  }
};
