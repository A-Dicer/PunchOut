const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the fighters collection and inserts the fighters below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/podb",
  {
    useMongoClient: true
  }
);

newObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};

// const fighterSeed = [
//         {_id: newObject("5ab975e0af67235b3dfef53b"), fighter: "Glass Joe",    circuit: "Contender: Minor", img: "TBD", WR: { KD1: null, KD2: null, time: 25.76 }},
//         {_id: newObject("5ab975e0af67235b3dfef53c"), fighter: "Von Kaiser",   circuit: "Contender: Minor", img: "TBD", WR: { KD1: null, KD2: null, time: 18.93 }},
//         {_id: newObject("5ab975e0af67235b3dfef53d"), fighter: "Disco Kid",    circuit: "Contender: Minor", img: "TBD", WR: { KD1: 170,  KD2: 161,  time: 25.76 }},
//         {_id: newObject("5ab975e0af67235b3dfef53e"), fighter: "King Hippo",   circuit: "Contender: Minor", img: "TBD", WR: { KD1: null, KD2: null, time: 47.12 }},
//         {_id: newObject("5ab975e0af67235b3dfef53f"), fighter: "Piston Hondo", circuit: "Contender: Major", img: "TBD", WR: { KD1: 166,  KD2: 152,  time: 34.55 }},
//         {_id: newObject("5ab975e0af67235b3dfef540"), fighter: "Bear Hugger",  circuit: "Contender: Major", img: "TBD", WR: { KD1: 174,  KD2: 162,  time: 26.70 }},
//         {_id: newObject("5ab975e0af67235b3dfef541"), fighter: "Great Tiger",  circuit: "Contender: Major", img: "TBD", WR: { KD1: 164,  KD2: 138,  time: 44.17 }},
//         {_id: newObject("5ab975e0af67235b3dfef542"), fighter: "Don Flamenco", circuit: "Contender: Major", img: "TBD", WR: { KD1: 165,  KD2: null, time: 17.74 }},
//         {_id: newObject("5ab975e0af67235b3dfef543"), fighter: "Aran Ryan",    circuit: "Contender: World", img: "TBD", WR: { KD1: 132,  KD2: null, time: 53.64 }},
//         {_id: newObject("5ab975e0af67235b3dfef544"), fighter: "Soda Popinski",circuit: "Contender: World", img: "TBD", WR: { KD1: 152,  KD2: 149,  time: 32.76 }},
//         {_id: newObject("5ab975e0af67235b3dfef545"), fighter: "Bald Bull",    circuit: "Contender: World", img: "TBD", WR: { KD1: 172,  KD2: 157,  time: 42.96 }},
//         {_id: newObject("5ab975e0af67235b3dfef546"), fighter: "Super Macho Man", circuit: "Contender: World", img: "TBD", WR: { KD1: 149,  KD2: 136,  time: 55.18 }},
//         {_id: newObject("5ab975e0af67235b3dfef547"), fighter: "Mr Sandman",   circuit: "Contender: World", img: "TBD", WR: { KD1: 153,  KD2: 147,  time: 36.75 }},  
//         {_id: newObject("5ab975e0af67235b3dfef548"), fighter: "Glass Joe",    circuit: "Title Defense: Minor ", img: "TBD", WR: { KD1: 166, KD2: 153, time: 36.89 }},
//         {_id: newObject("5ab975e0af67235b3dfef549"), fighter: "Von Kaiser",   circuit: "Title Defense: Minor", img: "TBD", WR: { KD1: 149, KD2: 144, time: 47.99 }},
//         {_id: newObject("5ab975e0af67235b3dfef54a"), fighter: "Disco Kid",    circuit: "Title Defense: Minor", img: "TBD", WR: { KD1: 170,  KD2: null,  time: 23.45 }},
//         {_id: newObject("5ab975e0af67235b3dfef54b"), fighter: "King Hippo",   circuit: "Title Defense: Minor", img: "TBD", WR: { KD1: null, KD2: null, time: 69.41 }},
//         {_id: newObject("5ab975e0af67235b3dfef54c"), fighter: "Piston Hondo", circuit: "Title Defense: Major", img: "TBD", WR: { KD1: 159,  KD2: 152,  time: 32.69 }},
//         {_id: newObject("5ab975e0af67235b3dfef54d"), fighter: "Bear Hugger",  circuit: "Title Defense: Major", img: "TBD", WR: { KD1: 149,  KD2: 117,  time: 92.99 }},
//         {_id: newObject("5ab975e0af67235b3dfef54e"), fighter: "Great Tiger",  circuit: "Title Defense: Major", img: "TBD", WR: { KD1: null,  KD2: null,  time: 45.95 }},
//         {_id: newObject("5ab975e0af67235b3dfef54f"), fighter: "Don Flamenco", circuit: "Title Defense: Major", img: "TBD", WR: { KD1: 164,  KD2: 144, time: 46.93 }},
//         {_id: newObject("5ab975e0af67235b3dfef550"), fighter: "Aran Ryan",    circuit: "Title Defense: World", img: "TBD", WR: { KD1: null,  KD2: null, time: 42.03 }},
//         {_id: newObject("5ab975e0af67235b3dfef551"), fighter: "Soda Popinski",circuit: "Title Defense: World", img: "TBD", WR: { KD1: 138,  KD2: 127,  time: 75.47 }},
//         {_id: newObject("5ab975e0af67235b3dfef552"), fighter: "Bald Bull",    circuit: "Title Defense: World", img: "TBD", WR: { KD1: 157,  KD2: 138,  time: 43.89 }},
//         {_id: newObject("5ab975e0af67235b3dfef553"), fighter: "Super Macho Man", circuit: "Title Defense: World", img: "TBD", WR: { KD1: 153,  KD2: 131,  time: 69.14 }},
//         {_id: newObject("5ab975e0af67235b3dfef554"), fighter: "Mr Sandman",   circuit: "Title Defense: World", img: "TBD", WR: { KD1: 158,  KD2: 146,  time: 43.20 }},
//         {_id: newObject("5ab975e0af67235b3dfef555"), fighter: "???",   circuit: "Last Stand", img: "TBD", WR: { KD1: null,  KD2: null,  time: null }},       
// ];

const gameSeed = [
  { title: "Mike Tyson's Punch-Out!!", year: "1987" , img: "TBD", categories: ["IL", "Any%", "Highscore" ]},
  { title: "Super Punch-Out!!", year: "1994" , img: "TBD", categories: ["IL", "Any%" ]},
  { title: "Punch-Out!! (Wii)", year: "2009" , img: "TBD", categories: ["IL", "Any%", "Contender%" ]},   
];


const id = new mongoose.Types.ObjectId("5acf8eb59872806d554c3ed3");

const splitSeed = [
  {_id: newObject("5acf8eb59872806d554c3ed3"), user: "Defualt", game: {id: "5ab975e0af67235b3dfef53a" , title: "Punch-Out!! (Wii)"}, category: "Any%", time: "00:00.00",
   splits: [
     {fighter: "5ab975e0af67235b3dfef53b", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53c", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53d", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53e", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53f", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef540", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef541", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef542", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef543", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef544", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef545", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef546", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef547", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef548", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef549", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef54a", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef54b", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef54c", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef54d", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef54e", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef54f", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef550", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef551", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef552", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef553", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef554", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef555", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef555", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef555", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
    ]},
    
    {_id: newObject("5acfbd3fd3d18c7049a9a7b7"), user: "Defualt", game: { id: "5ab975e0af67235b3dfef53a", title: "Punch-Out!! (Wii)"}, category: "Contender%", time: "00:00.00",
    splits: [
     {fighter: "5ab975e0af67235b3dfef53b", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53c", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53d", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53e", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef53f", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef540", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef541", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef542", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef543", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef544", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef545", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef546", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
     {fighter: "5ab975e0af67235b3dfef547", pb: { KD1: 0, KD2: 0, time: 0}, gold: { KD1: 0, KD2: 0, time: 0}},
    ]},
];



// db.Fighters
//   .remove({})
//   .then(() => db.Fighters.collection.insertMany(fighterSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.Game
//   .remove({})
//   .then(() => db.Game.collection.insertMany(gameSeed))
//   .then(data => {
//     console.log(data.insertedIds.length + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

db.Splits
.remove({})
.then(() => db.Splits.collection.insertMany(splitSeed))
.then(data => {
  console.log(data.insertedIds.length + " records inserted!");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  
});