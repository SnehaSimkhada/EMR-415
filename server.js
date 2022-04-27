const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/usersdb',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

const username = "<mongodb username>";
const password = "<password>";
const cluster = "<cluster name>";
const dbname = "myFirstDatabase";

mongoose.connect(
  `mongodb+srv://sneha:Instragram1!@cluster0.2pogn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);