import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Home,
  Search,
  Sell,
  EditProfile,
  Contact,
  PrivacyPolicy,
  TermsCondition,
  PropertyDetails,
  ViewProperties,
} from "./views";
import { CreateProperty } from "./components";
import "react-tabs/style/react-tabs.css";
import "react-multi-carousel/lib/styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ScrollToTop } from "./components";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PrivateRoute } from "./components";

const App = () => {
  return (
    <div className="container-fluid main-block">
      <Provider store={store}>
        <Router basename="/Movle/">
          {/* <Redirect to="/" /> */}
          <ScrollToTop />
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/search" component={Search} exact={true} />
            {/* <Route path="/sell" component={Sell} exact={true} /> */}
            <PrivateRoute path="/sell" component={Sell} exact={true} />
            <Route
              path="/createproperty/"
              component={CreateProperty}
              exact={true}
            />
            <Route path="/editprofile" component={EditProfile} exact={true} />
            <Route path="/contact" component={Contact} exact={true} />
            <Route path="/privacy" component={PrivacyPolicy} exact={true} />
            <Route
              path="/viewproperties"
              component={ViewProperties}
              exact={true}
            />
            <Route
              // path="/:id/:user_id"
              path="/propertyDetails"
              component={PropertyDetails}
              exact={true}
            />
            <Route
              path="/termscondition"
              component={TermsCondition}
              exact={true}
            />
          </Switch>
        </Router>
        <ToastContainer position="top-center" autoClose={5000} />
      </Provider>
    </div>
  );
};

export default App;
