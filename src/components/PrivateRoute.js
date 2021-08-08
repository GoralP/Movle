import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, path }) => {
  const accessToken = localStorage.getItem("token");
  return (
    <Route
      path={path}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to="/" />
      }
    ></Route>
  );
};

export default PrivateRoute;
