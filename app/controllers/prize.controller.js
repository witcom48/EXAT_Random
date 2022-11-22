const Prize = require("../models/prize.model")

exports.findAll = (req, res) => {
  Prize.getAll((err, data) => {
        if (err)
          res.send({
            success:false,
            message:
              err.message || "Some error occurred while retrieving prize"
          });
          else res.send({success:true, data:data});
    });
};

exports.findPrizeWithEmp = (req, res) => {
  Prize.findPrizeWithEmp((err, data) => {
        if (err)
          res.send({
            success:false,
            message:
              err.message || "Some error occurred while retrieving prize"
          });
          else res.send({success:true, data:data});
    });
};

exports.findOne = (req, res) => {
  Prize.findById(req.params.pcode, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            res.send({
              success:false,
              message: `Not found prize with id ${req.params.pcode}.`
            });
          } else {
            res.send({
              success:false,
              message: "Error retrieving prize with id " + req.params.pcode
            });
          }
        } else res.send({success:true, data:data});
    });
};

exports.findWithType = (req, res) => {
  Prize.findByType(req.params.ptype, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            res.send({
              success:false,
              message: `Not found prize with id ${req.params.ptype}.`
            });
          } else {
            res.send({
              success:false,
              message: "Error retrieving prize with id " + req.params.ptype
            });
          }
        } else res.send({success:true, data:data});
    });
};

exports.findWithEmp = (req, res) => {
  Prize.findByEmp(req.params.empid, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            res.send({
              success:false,
              message: `Not found prize with empid ${req.params.empid}.`
            });
          } else {
            res.send({
              success:false,
              message: "Error retrieving prize with empid " + req.params.empid
            });
          }
        } else res.send({success:true, data:data});
    });
};


exports.updateFlag = (req, res) => {
  // Validate Request
  if (!req.body) {
      res.send({
        success:false,
        message: "Content can not be empty!"
      });
  }

  Prize.updateFlag(
      {receive_status:req.body.flag, receive_by:req.body.create_by, empid:req.body.empid},
      (err, data) => {
          if (err) {
          if (err.status === "not_found") {
              res.send({
                success:false,
                message: `Not found employee with empid ${req.body.empid}.`
              });
          } else {
              res.send({
                success:false,
                message: "Error updating lpr_import with empid " + req.body.empid
              });
          }
          } else res.send({success:true, data:data});
      }
  );
};
