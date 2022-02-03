import React from "react";
import { Redirect, Route } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../Loading/Loading";

const AdminRoute = ({ children, ...rest }) => {
  const { user, isLoading, userRole } = useAuth();

  if (isLoading) {
    return (
      <Route {...rest}>
        <Loading></Loading>
      </Route>
    );
  }

  return (
    <Route {...rest}>
      {({ location }) =>
        user && userRole === "admin" ? (
          children
        ) : (
          <Redirect to={{ pathname: `${user ? "/dashboard" : "/login"}`, state: { from: location } }} />
        )
      }
    </Route>
  );
};

export default AdminRoute;
