import AddTour from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
import Analytics from "@/pages/Analytics";
import type { SidebarItemProps } from "@/types";

export const adminSidebarItems: SidebarItemProps[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
