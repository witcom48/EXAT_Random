const Employee = require("../models/employee.model")

exports.getSummaryEmp = (req, res) => {
  Employee.getSummaryEmp((err, data) => {
        if (err)
          res.send({
            success:false,
            message:
              err.message || "Some error occurred while retrieving employee"
          });
        else res.send({success:true, data:data});
    });
};

