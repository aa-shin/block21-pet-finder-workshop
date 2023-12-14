const express = require("express");
const ViteExpress = require("vite-express");
const data = require("./data");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/api/v1/pets/owner", (req, res) => {
  const filtered = data.filter(
    (pet) => pet.owner.toLowerCase() === req.query.name.toLowerCase()
  );
  res.status(200).send(filtered);
});

app.get("/api/v1/pets", (req, res) => {
  res.status(200).send(data);
});

app.get("/api/v1/pets/:name", (req, res) => {
  const filtered = data.filter(
    (pet) => pet.name.toLowerCase() === req.params.name.toLowerCase()
  );
  res.status(200).send(filtered);
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);