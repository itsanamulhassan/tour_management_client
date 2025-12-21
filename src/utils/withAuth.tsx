import { useGetMeQuery } from "@/redux/feature/authentication/authenticationApi";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import type { RoleProps } from "./getSidebarItems";

export const withAuth =
  (Component: ComponentType, requiredRole: RoleProps) => () => {
    const { data, isLoading } = useGetMeQuery(undefined);

    if (!isLoading && !data?.data?.email) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }
    return <Component />;
  };
