"use strict";

const adminController = require("../controller/admin"),
  express = require("express"),
  jwtVerify = require("../middleware/jwtVerify"),
  router = express.Router();

router.use(jwtVerify);
router.get("/", adminController.index);
router.get("/:id", adminController.get);
router.post("/", adminController.insert);
router.put("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
