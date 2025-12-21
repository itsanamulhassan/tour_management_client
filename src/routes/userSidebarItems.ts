import Bookings from "@/pages/User/Bookings";
import type { SidebarItemProps } from "@/types";

export const userSidebarItems: SidebarItemProps[] = [
  {
    title: "Bookings",
    url: "#",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
