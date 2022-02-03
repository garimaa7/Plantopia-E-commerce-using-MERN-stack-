import React from "react";
import { NavLink, Switch, Route, useRouteMatch } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Dashboard.css";
import logo from "../../../../assets/logo.png";
import DashboardHome from "../DashboardHome/DashboardHome";
// import Payment from "../Payment/Payment";
import PrivateRoute from "../../Shared/PrivateRoute/PrivateRoute";
import AdminRoute from "../../Shared/AdminRoute/AdminRoute";
import useAuth from "../../../../hooks/useAuth";
// import WriteReview from "../WriteReview/WriteReview";
import MyOrders from "../MyOrders/MyOrders";
import ManageOrders from "../ManageOrders/ManageOrder";
import ManageProducts from "../ManageProducts/ManageProducts";
import AddProduct from "../AddProduct/AddProduct";
import Cart from "../Cart/Cart";

import MakeAdmin from "../MakeAdmin/MakeAdmin";
import Checkout from "../Cart/Checkout";

const Dashboard = () => {
  const { user, userRole, logOut } = useAuth();
  console.log(userRole);
  const { path, url } = useRouteMatch();
  console.log(path, url);
  return (
    <div className="dashboard">
      <div className="dashboard-side">
        <div className="side-nav">
          <NavLink to="/">
            <img className="logo" src={logo} alt="" />
          </NavLink>
          <hr />
          <ul>
            {user && userRole === "admin" && (
              <>
                <NavLink activeClassName="active-nav" to={`${url}/home`}>
                  <li className="nav-item">
                    <i className="bi bi-shop"></i>
                    <span>Dashboard</span>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-nav" to={`${url}/manageOrders`}>
                  <li className="nav-item">
                    <i className="bi bi-cart-check"></i>
                    <span>Manage Orders</span>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-nav" to={`${url}/addProduct`}>
                  <li className="nav-item">
                    <i className="bi bi-bag-plus"></i>
                    <span>Add Product</span>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-nav" to={`${url}/manageProducts`}>
                  <li className="nav-item">
                    <i className="bi bi-pencil-square"></i>
                    <span>Manage Products</span>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-nav" to={`${url}/makeAdmin`}>
                  <li className="nav-item">
                    <i className="bi bi-person-check"></i>
                    <span>Make Admin</span>
                  </li>
                </NavLink>
              </>
            )}
            {user && userRole === "normal" && (
              <>
                <NavLink activeClassName="active-nav" to={`${url}/home`}>
                  <li className="nav-item">
                    <i className="bi bi-shop"></i>
                    <span>Dashboard</span>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-nav" to={`${url}/myOrders`}>
                  <li className="nav-item">
                    <i className="bi bi-cart-check"></i>
                    <span>My Orders</span>
                  </li>
                </NavLink>
                <NavLink activeClassName="active-nav" to={`${url}/cart`}>
                  <li className="nav-item">
                    <i className="bi bi-cart"></i>
                    <span>My Cart</span>
                  </li>
                </NavLink>
                {/* <NavLink activeClassName="active-nav" to={`${url}/pay`}>
                  <li className="nav-item">
                    <i className="bi bi-credit-card"></i>
                    <span>Pay</span>
                  </li>
                </NavLink> */}

              </>
            )}
            <hr />
            <li onClick={logOut} className="nav-item">
              <i className="bi bi-box-arrow-right"></i>
              <span>Log Out</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-top">
          <h1 className="fs-2">Dashboard</h1>
          <div className="d-flex align-items-center">
            <i className="fs-3 bi bi-bell-fill p-1"></i>

            {/* AVATAR  */}
            <div className=" user-icon ms-3">
              <img
                title={user.email}
                src={user.photoURL ? user.photoURL : "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"}
                alt="user avatar"
              />
              <div className="user-info">
                <div className="user-name d-flex">
                  <img
                    className="rounded"
                    src={
                      user.photoURL ? user.photoURL : "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"
                    }
                    alt="user avatar"
                  />
                  <div className="text-start ps-3 mt-0">
                    <h4 className="pt-0 mb-1">{user.displayName ? user.displayName : "Anonymous"}</h4>
                    <h6 className="mb-2">{user.email}</h6>
                  </div>
                </div>
                <hr />
                <ul className="text-start">
                  <li className=" d-block py-1">
                    <NavLink
                      className="d-inline-block text-decoration-none   me-3"
                      to="/dashboard"
                      activeStyle={{ color: "#ff3344" }}
                    >
                      <i className="bi bi-grid-fill me-2 text-green"></i>
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
                <hr />
                <Button onClick={logOut} variant="success" className=" btn-green p-2 px-3">
                  Log Out&nbsp;
                  <i className="bi bi-box-arrow-right"></i>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="dashboard-content">
          <Switch>
            <PrivateRoute exact path="/dashboard">
              <DashboardHome></DashboardHome>
            </PrivateRoute>
            <PrivateRoute path={`${path}/home`}>
              <DashboardHome></DashboardHome>
            </PrivateRoute>
            <PrivateRoute path={`${path}/myOrders`}>
              <MyOrders></MyOrders>
            </PrivateRoute>
            <PrivateRoute path={`${path}/cart`}>
              <Cart></Cart>
            </PrivateRoute>
            <PrivateRoute path={`${path}/checkout`}>
              <Checkout></Checkout>
            </PrivateRoute>
            <AdminRoute path={`${path}/manageOrders`}>
              <ManageOrders></ManageOrders>
            </AdminRoute>
            <AdminRoute path={`${path}/manageProducts`}>
              <ManageProducts></ManageProducts>
            </AdminRoute>
            <AdminRoute path={`${path}/makeAdmin`}>
              <MakeAdmin></MakeAdmin>
            </AdminRoute>
            <AdminRoute path={`${path}/addProduct`}>
              <AddProduct></AddProduct>
            </AdminRoute>
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
