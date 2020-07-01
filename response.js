"use strict";

module.exports = {
  ok(values, msg, res) {
    let data = {
      status: 200,
      message: msg,
      data: values,
    };
    res.json(data);
    res.end();
  },
  error(codestatus, msg, res) {
    let data = {
      status: codestatus,
      message: msg,
    };

    res.status(codestatus);
    res.json(data);
    res.end();
  },
  errorValidation(codestatus, data, res) {
    let errorDetails = [];
    data["errors"].forEach((val, index) => {
      var errorRow = {
        message: val["message"],
        type: val["type"],
        path: val["path"],
      };

      errorDetails.push(errorRow);
    });

    const response = {
      status: codestatus,
      message: "Data yang dimasukkan tidak sesuai",
      details: errorDetails,
    };

    res.status(codestatus);
    res.json(response);
    res.end();
  },
  checkEmpty(value) {
    if (value == "") {
      throw new Error("Kolom tidak boleh kosong");
    }
  },
};
