import type { SidebarItemProps } from "@/types";

export const generateRoutes = (routes: SidebarItemProps[]) => {
  return routes
    .flatMap((route: SidebarItemProps) => route.items)
    .map((item) => ({
      path: item.url,
      Component: item.component,
    }));
};
