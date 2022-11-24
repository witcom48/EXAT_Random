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
      condition = " WHERE receive_status='" + status + "' "
    }

    sql.query(` SELECT empid, name, famname, CONCAT(divabb, secabb, depabb) AS depabb, prize.pcode, prize.pdesc, IFNULL(receive_status, '') AS receive_status, IFNULL(receive_by, '') AS receive_by, receive_date FROM employee INNER JOIN prize ON employee.prize_pcode=prize.pcode ` + condition, (err, res) => {
      
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