import axios from "axios";

export default {

//-------------------------------------- User Api --------------------------------------
  getUsers: function() {return axios.get("/api/users")}, // Gets all users
  getUser: function(id) {return axios.get("/api/users/" + id)}, // Gets the user with the given id
  updateUser: function(id, info){return axios.put("/api/users/" + id, info)}, // Update User

//-------------------------------------- Games Api -------------------------------------
  getGames: function() {return axios.get("/api/games/")}, // Gets all Games

//------------------------------------- Fighter Api ------------------------------------
  getFighters: function() {return axios.get("/api/fighters/")}, // Gets all fighters
  getFighter: function(name) {return axios.get("/api/fighters/name/" + name)}, // Gets the fighter by name

//-------------------------------------- Splits Api ------------------------------------
  getSplit: function(id) {return axios.get("/api/splits/" + id)}, // Gets splits with the given id
  saveNewSplits: function(splitData) {return axios.post("/api/splits", splitData)}, // Saves new splits to the database

//---------------------------------------- Auth Api ------------------------------------
  twitchAuth: function(){return axios.get("/api/auth/twitch")}, // Login with Twitch
  twitchCallback: function(){return axios.get("/api/auth/twitch/callback")}, //Twitch Callback Route
  logout: function() {return axios.get("/api/auth/logout")}, //logout
};
