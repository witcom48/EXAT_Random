const connect = require("../db");

// constructor
const Employee = function(employee) {
    this.empid = employee.empid;
   
};

Employee.findById = (empId, result) => {
  sql = connect();
    sql.query(`SELECT * FROM randomprize.employee WHERE empid = '${empId}'`, (err, res) => {
      
      sql.end();
      
      if (err) {     
        result(err, null);      
      }
      else if (res.length) {       
        result(null, res[0]);       
      }  
      else{
        result({ status: "not_found" }, null);
      }          
    });
};

Employee.findAllPrize = (status, result) => {
  sql = connect();

    var condition = " "

    if(status != "all"){
      condition = " AND receive_status='" + status + "' "
    }

    sql.query(`SELECT * FROM randomprize.employee WHERE not(prize_pcode is null) ` + condition, (err, res) => {
      
      sql.end();
      
      if (err) {     
        result(err, null);      
      }
      else if (res.length) {       
        result(null, res);       
      }  
      else{
        result({ status: "not_found" }, null);
      }          
    });
};

module.exports = Employee;