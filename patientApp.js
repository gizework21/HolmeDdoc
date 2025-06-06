const express = require("express");
const path = require("path");
const app = express();
const PORT = 81;

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("server started on port ",PORT);
});
