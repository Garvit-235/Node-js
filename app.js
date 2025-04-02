const express = require("express");

const app = express();
const port = 3000;

app.use("/admin", (req, res, next) => {
  console.log("authorizing admin");
  const token = "radha";
  const isAdminAuthorized = token === "radha";
  if (!isAdminAuthorized) {
    res.status(401).send("not allowed");
  } else next();
});

app.get("/admin/getData", (req, res, next) => {
  res.send("all data send");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("user removed");
});

app.listen(port, () => {
  console.log("shriharivansh");
});
