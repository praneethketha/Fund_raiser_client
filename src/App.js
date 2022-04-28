import "./App.css";
import { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cookie from "react-cookies";

import {
  Home,
  Donate,
  Profile,
  EditProfile,
  CreateCampaign,
  CampaignDetails,
  ManageDonations,
  ManageUsers,
  Signup,
  Login,
  VerifyOTP,
  ForgotPassword,
  ResetPassword,
  ChangePassword,
  ErrorPage,
  ManageUserCampaign,
  Spline,
} from "./pages";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import PreLoader from "./components/PreLoader";

import { getCampaigns } from "./actions/campaigns";
import { getUser } from "./actions/currentUser";
import { getFavorites } from "./actions/favorites";

function App() {
  const { isLoading } = useSelector((state) => state.campaigns);
  const [dark, setDark] = useState(false);
  const Id = cookie.load("userId");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  useLayoutEffect(() => {
    const userId = cookie.load("userId");
    if (userId) {
      dispatch(getUser(userId));
      dispatch(getFavorites(userId));
    }
  }, [Id, dispatch]);

  return (
    <div className="App">
      {isLoading ? (
        <PreLoader />
      ) : (
        <Router>
          <ScrollToTop>
            <Header dark={dark} setDark={setDark} />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/donate/:campaign?/:id?">
                <Donate />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/forgotPassword">
                <ForgotPassword />
              </Route>
              <Route path="/changePassword">
                <ChangePassword />
              </Route>
              <Route path="/verifyOTP">
                <VerifyOTP />
              </Route>
              <Route path="/editProfile">
                <EditProfile />
              </Route>
              <Route path="/createCampaign">
                <CreateCampaign />
              </Route>
              <Route path="/campaignDetails/:id">
                <CampaignDetails />
              </Route>
              <Route path="/manageUserCampaigns">
                <ManageUserCampaign />
              </Route>
              <Route path="/manageDonations">
                <ManageDonations />
              </Route>
              <Route path="/manageUsers">
                <ManageUsers />
              </Route>
              <Route path="/resetPassword/:token">
                <ResetPassword />
              </Route>
              <Route path="/spline">
                <Spline />
              </Route>

              <Route path="*">
                <ErrorPage />
              </Route>
            </Switch>
            <Footer />
          </ScrollToTop>
        </Router>
      )}
    </div>
  );
}

export default App;
