
const express = require("express");
const app = express();


exports = module.exports = function(io) {  
    // Set socket.io listeners.
    io.on('connection', (socket) => {

      socket.on('updateSplitter', function(data, id){
        socket.broadcast.emit(id, data)     
      })
  
  });
}

