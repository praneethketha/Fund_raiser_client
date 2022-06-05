import axios from "axios";

const url = "https://fund-raiser-app.herokuapp.com/api/v1";
// const url = "http://localhost:3000/api/v1";
const users_url = `${url}/users`;
const campaigns_url = `${url}/campaigns`;
const favorites_url = `${url}/favorites`;

//CAMPAIGNS
export const fetchCampaigns = () => axios.get(campaigns_url);

export const getCampaign = (id) => axios.get(`${campaigns_url}/${id}`);

export const creteCampaign = (campaign, config) =>
  axios.post(campaigns_url, campaign, config);

export const deleteCampaign = (id, config) =>
  axios.delete(`${campaigns_url}/${id}`, config);

export const updateCampaign = (id, campaign, config) =>
  axios.patch(`${campaigns_url}/${id}`, campaign, config);

//DONATIONS
export const donate = (donation, config) =>
  axios.patch(`${campaigns_url}/donate`, donation, config);

export const fetchDonations = (config) => axios.get(`${url}/donations`, config);

export const fetchDonationsByDate = () =>
  axios.get(`${url}/donations/getByDate`);

//USERS
export const getUsers = (config) => axios.get(users_url, config);

export const createUser = (newUser) =>
  axios.post(`${users_url}/signup`, newUser);

export const updateUser = (id, user) => axios.patch(`${users_url}/${id}`, user);

export const deleteUser = (id) => axios.delete(`${users_url}/${id}`);

export const logTheUser = (credentials) =>
  axios.post(`${users_url}/login`, credentials, {
    withCredentials: true,
    credentials: "include",
  });

export const verifyOTP = (otpDetails) =>
  axios.patch(`${users_url}/verifyOTP`, otpDetails);

export const getUser = (id) => axios.get(`${users_url}/${id}`);

export const updateCurrentUser = (user, config) =>
  axios.patch(`${users_url}/updateMe`, user, config);

export const resetPassword = (token, data) =>
  axios.patch(`${users_url}/resetPassword/${token}`, data);

export const forgotPassword = (data) =>
  axios.post(`${users_url}/forgotPassword`, data);

export const changePassword = (data, config) =>
  axios.patch(`${users_url}/updateMyPassword`, data, config);

//FAVORITES
export const fetchFavoritesByUser = (id) => axios.get(`${favorites_url}/${id}`);
export const addToFavorites = (data, config) =>
  axios.post(favorites_url, data, config);
export const deletedFromFavorites = (id, config) =>
  axios.delete(`${favorites_url}/${id}`, config);
