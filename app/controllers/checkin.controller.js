const Checkin = require("../models/checkin.model")

exports.findAll = (req, res) => {
  Checkin.getAll((err, data) => {
        if (err)
          res.send({
            success:false,
            message:
              err.message || "Some error occurred while retrieving checkin"
          });
        else res.send({success:true, data:data});
    });
};

exports.findOne = (req, res) => {

  Checkin.findById(req.params.empid, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.send({
              success:false,
              message: `Not found checkin with empid ${req.params.empid}.`
            });
          } else {
            res.send({
              success:false,
              message: "Error retrieving checkin with empid " + req.params.empid
            });
          }
        } else res.send({success:true, data:data});
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    let date_ob = new Date();

    const model = new Checkin({           
      empid : req.body.empid,
      lat : req.body.lat,
      long : req.body.long,
      create_by : req.body.create_by,
      create_date : date_ob
    });
    
    Checkin.create(model, (err, data) => {
      if (err)
      res.send({
          success:false,
          message:
          err.message || "Some error occurred while creating the Checkin"
      });
      else {        
        res.send({success:true, data:data});
      }
  });
};

exports.delete = (req, res) => {
  Checkin.remove(req.body.empid, (err, data) => {
        if (err) {
          if (err.status === "not_found") {
            res.send({
              success:false,
              message: `Not found empid with id ${req.body.empid}.`
            });
          } else {
            res.send({
              success:false,
              message: "Could not delete empid with id " + req.body.empid
            });
          }
        } else res.send({ success:true, message: `checkin was deleted successfully!` });
    });
};

