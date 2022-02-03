import React from "react";
import useAuth from "../../../../hooks/useAuth";
import ManageOrders from "../ManageOrders/ManageOrder";
import MyOrders from "../MyOrders/MyOrders";

const DashboardHome = () => {
  const { user, userRole } = useAuth();

  return <>{user && userRole === "admin" ? <ManageOrders></ManageOrders> : <MyOrders></MyOrders>}</>;
};

export default DashboardHome;
