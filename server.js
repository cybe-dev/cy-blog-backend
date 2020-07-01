const express = require("express"),
  app = express(),
  port = process.env.PORT || 8080,
  bodyParser = require("body-parser"),
  server = require("http").Server(app),
  router = require("./router"),
  response = require("./response"),
  cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  req.response = response;
  next();
});

app.use("/admin", router.admin);
app.use("/auth", router.auth);
app.use("/category", router.category);
app.use("/post", router.post);
app.use("/comment", router.comment);
app.use("/setting", router.setting);
app.use("/public", router.public);

server.listen(port);
