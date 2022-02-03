import "./App.css";
import Home from "./components/pages/Home/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Explore from "./components/pages/Explore/Explore/Explore";
import Footer from "./components/pages/Shared/Footer/Footer";
import Login from "./components/pages/Login/Login";
import AuthProvider from "./contexts/AuthProvider";
import Signup from "./components/pages/Signup/Signup";
import Purchase from "./components/pages/Purchase/Purchase";
import About from "./components/pages/About/About";
import PrivateRoute from "./components/pages/Shared/PrivateRoute/PrivateRoute";
import Dashboard from "./components/pages/Dashboard/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route exact path="/home">
              <Home></Home>
            </Route>
            <Route path="/explore">
              <Explore></Explore>
            </Route>
            <Route path="/about">
              <About></About>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/signup">
              <Signup></Signup>
            </Route>
            <PrivateRoute path="/Purchase/:id">
              <Purchase></Purchase>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="*">
              <h1>Page Not Found</h1>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
