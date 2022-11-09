const sql = require("../db");

// constructor
const Checkin = function(checkin) {
    this.empid = checkin.empid;
    this.lat = checkin.lat;
    this.long = checkin.long;
    this.create_by = checkin.create_by;
    this.create_date = checkin.create_date;    
};

Checkin.getAll = result => {
    sql.query("SELECT * FROM randomprize.checkin", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } 
      
      result(null, res);
    });
};

Checkin.findById = (empId, result) => {
    sql.query(`SELECT * FROM randomprize.checkin WHERE empid = ${empId}`, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        //console.log("found checkin: ", res[0]);
        result(null, res[0]);
        return;
      }      
      result({ kind: "not_found" }, null);
    });
};

Checkin.create = (newImport, result) => {
  sql.query("INSERT INTO randomprize.checkin SET ?", newImport, (err, res) => {
    if (err) {      
      result(err, null);
      return;
    }

    sql.query(
      "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
      ["checkin", newImport.empid],      
      (err, res) => {
        if (err) {          
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {         
          result({ status: "not_found" }, null);
          return;
        }
  
        //console.log("created checkin: ", { id: res.insertId, ...newImport });
        result(null, { id: res.insertId, ...newImport });
      }
    );

  });
};



Checkin.remove = (empId, result) => {
  //console.log(empId)
  sql.query("DELETE FROM randomprize.checkin WHERE empid = ?", empId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {      
      result({ status: "not_found" }, null);
      return;
    }
   
    sql.query(
      "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
      ["", empId],      
      (err, res) => {
        if (err) {         
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {          
          result({ status: "not_found" }, null);
          return;
        }
  
        //console.log("deleted checkin with empid: ", empId);
        result(null, res);
      }
    );
  });
};

module.exports = Checkin;