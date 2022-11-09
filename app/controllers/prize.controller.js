const Prize = require("../models/prize.model")

exports.findAll = (req, res) => {
  Prize.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving prize"
          });
        else res.send(data);
    });
};

exports.findOne = (req, res) => {
  Prize.findById(req.params.pcode, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found prize with id ${req.params.pcode}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving prize with id " + req.params.pcode
            });
          }
        } else res.send(data);
    });
};

exports.findWithType = (req, res) => {
  Prize.findByType(req.params.ptype, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found prize with id ${req.params.ptype}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving prize with id " + req.params.ptype
            });
          }
        } else res.send(data);
    });
};

exports.findWithEmp = (req, res) => {
  Prize.findByEmp(req.params.empid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found prize with empid ${req.params.empid}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving prize with empid " + req.params.empid
            });
          }
        } else res.send(data);
    });
};


exports.updateFlag = (req, res) => {
  // Validate Request
  if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
  }

  Prize.updateFlag(
      {flag:req.body.flag, empid:req.body.empid},
      (err, data) => {
          if (err) {
          if (err.status === "not_found") {
              res.status(404).send({
              message: `Not found employee with empid ${req.body.empid}.`
              });
          } else {
              res.status(500).send({
              message: "Error updating lpr_import with empid " + req.body.empid
              });
          }
          } else res.send(data);
      }
  );
};
