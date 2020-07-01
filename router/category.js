"use strict";

const categoryController = require("../controller/category"),
  express = require("express"),
  jwtVerify = require("../middleware/jwtVerify"),
  router = express.Router();

router.use(jwtVerify);

router.get("/", categoryController.index);

router.get("/:slug", categoryController.get);

router.post("/", categoryController.insert);

router.put("/:id", categoryController.update);

router.delete("/:id", categoryController.destroy);

module.exports = router;
