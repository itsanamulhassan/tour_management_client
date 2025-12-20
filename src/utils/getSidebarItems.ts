import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";

export type RoleProps = "SUPERADMIN" | "ADMIN" | "USER" | "GUIDE";
export const getSidebarItems = (userRole: RoleProps) => {
  switch (userRole) {
    case role.admin:
      return [...adminSidebarItems];
    case role.superAdmin:
      return [...adminSidebarItems];
    case role.user:
      return [...userSidebarItems];
    case role.guide:
      return [...userSidebarItems];
    default:
      return [];
  }
};
