const express = require("express");

const cors = require("cors");

const axios = require("axios");

require("dotenv").config();

const server = express();

server.use(cors());
const mongoose = require("mongoose");

mongoose.connect(process.env.URL);
server.use(express.json());
let PORT = process.env.PORT || 3010;




server.get("/", home);
function home(req,res)
{res.send("welcome home")
    console.log("welcome home")}

server.get("/get", getfruit);
function getfruit(req, res) {
  let url = "https://fruit-api-301.herokuapp.com/getFruit";

  axios
    .get(url)
    .then((result) => {
      res.send(result.data.fruits);
    //   console.log(result.data.fruits);
    })
    .catch(console.log("err in get"));
}

const Fruitschema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  email:String,
});

const Fruit = mongoose.model("fruit", Fruitschema);

server.get("/getdata", getdata);

function getdata(req, res) {
  const email = req.query.email;
  Fruit.find({ email: email }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

server.post("/postdata", postdata);
async function postdata(req, res) {
  const email = req.query.email;
  const { name, image, price } = req.body;
  console.log(name)
  console.log(email)
  await Fruit.create({email, name, image, price });

  Fruit.find({ email: email }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

server.put("/updatedata/:id", updatedata);
function updatedata(req, res) {
  const id = req.params.id;
  const { name, image, price } = req.body;
  Fruit.findByIdAndUpdate(id, { name, image, price }, (err, result) => {
    Fruit.find({ email: email }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
}

server.delete("/deletdata/:id", deletdata);
function deletdata(req, res) {
  const id = req.params.id;
  Fruit.deleteOne({ _id: id }, (err, result) => {
    Fruit.find({ email: email }, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
}

server.listen(PORT, () => {
  console.log(`listen${PORT}`);
});
