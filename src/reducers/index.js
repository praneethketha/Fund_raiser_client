import { combineReducers } from "redux";
import campaigns from "./campaigns";
import users from "./users";
import currentUser from "./currentUser";
import donations from "./donations";
import favorites from "./favorites";
import donations_stats from "./dateDonations";

export default combineReducers({
  campaigns,
  users,
  currentUser,
  donations,
  favorites,
  donations_stats,
});
