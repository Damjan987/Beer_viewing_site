import React from "react";
import Home from "./Home";
import Signup from "./Signup";
import Signin from "./Signin";
import NotFound from "./NotFound";
import "./App.css";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import Header from "./Header";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";
import CompanyEditForm from "./CompanyEditForm";
import BeerDetails from "./BeerDetails";
import BeerEditForm from "./BeerEditForm";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route element={<NotFound />} />
      </Routes> */}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/company/:companyId" component={CompanyDetails} />
          <Route
            exact
            path="/company/edit/:companyId"
            component={CompanyEditForm}
          />
          <Route exact path="/beer/:beerId" component={BeerDetails} />
          <Route exact path="/beer/edit/:beerId" component={BeerEditForm} />
          <UserRoute exact path="/user/dashboard" component={UserDashboard} />
          <AdminRoute
            exact
            path="/admin/dashboard"
            component={AdminDashboard}
          />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default App;
