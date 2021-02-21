const express = require("express");
const Similarities = require("./js/Similarities");

const app = express();

app.get("/", (req, res) => {
  const similarities = new Similarities();
  similarities.getSimilarities().then((sooomething) => {
    console.log("sooomething = ", sooomething);
    res.json({ msg: JSON.stringify(sooomething) });
  });
});

app.listen("4242", () => console.log("running"));
