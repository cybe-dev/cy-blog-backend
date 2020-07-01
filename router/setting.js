"use strict";

const settingController = require("../controller/setting"),
  express = require("express"),
  jwtVerify = require("../middleware/jwtVerify"),
  router = express.Router();

router.use(jwtVerify);

router.get("/profile", settingController.getProfile);
router.put("/profile", settingController.updateProfile);

router.put("/change-password", settingController.changePassword);

router.get("/general", settingController.getSetting);
router.put("/general", settingController.updateSetting);

module.exports = router;
