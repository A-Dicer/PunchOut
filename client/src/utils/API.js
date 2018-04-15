import axios from "axios";

export default {
  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },

  // Gets all Games
  getGames: function() {
    return axios.get("/api/games/");
  },

  // Gets all Games
  getFighters: function() {
    return axios.get("/api/fighters/");
  },


    // Gets the fighter by the given ID
    getFighter: function(name) {
      return axios.get("/api/fighters/name/" + name);
    },

   // Gets the user with the given id
   getSplit: function(id) {
    return axios.get("/api/splits/" + id);
  },

  // Gets all Races
  getRaces: function() {
    return axios.get("/api/races");
  },

  // Saves new splits to the database
  saveNewSplits: function(splitData) {
    return axios.post("/api/splits", splitData);
  },
  
  // Gets all Races
  getLevels: function() {
    return axios.get("api/levels");
  },

  //Gets all Msgs
  getMsgs: function() {
    return axios.get("api/msg");
  },

   // Gets a Msg with the given name
   getMsg: function(name) {
    return axios.get("/api/msg/name/" + name);
  },

   // Saves a message to the database
   saveMsg: function(msgData) {
    return axios.post("/api/msg", msgData);
  },

  twitchAuth: function(){
    console.log("running auth")
    return axios.get("/api/auth/twitch");
  },

  twitchCallback: function(){
    return axios.get("/api/auth/twitch/callback")
  },

  logout: function() {
    return axios.get("/api/auth/logout");
  },
};
