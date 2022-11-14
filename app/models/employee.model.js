const connect = require("../db");

// constructor
const Employee = function(employee) {
    this.empid = employee.empid;
   
};

Employee.findById = (empId, result) => {
  sql = connect();
    sql.query(`SELECT * FROM randomprize.employee WHERE empid = '${empId}'`, (err, res) => {
      if (err) {
     
        result(err, null)
        sql.end()
        return;
      }
  
      if (res.length) {       
        result(null, res[0])
        sql.end()
        return;
      }      
      result({ kind: "not_found" }, null)
      sql.end()
    });
};

Employee.getSummaryEmp = result => {
    sql = connect();

    query = "select COUNT(empid) as emp_all";
    query += ", SUM(case when shift='Y' then 1 else 0 end) AS emp_shift";
    query += ", SUM(case when flag='checkin' then 1 else 0 end) AS emp_checkin";
    query += " from randomprize.employee";

    //console.log(query)

    sql.query(query, (err, res) => {
      if (err) {
     
        result(err, null)
        sql.end()
        return;
      }
  
      if (res.length) {       
        result(null, res)
        sql.end()
        return;
      }      
      result({ kind: "not_found" }, null)
      sql.end()
    });
};


module.exports = Employee;