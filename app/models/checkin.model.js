const connect = require("../db");

// constructor
const Checkin = function(checkin) {
    this.empid = checkin.empid;
    this.lat = checkin.lat;
    this.long = checkin.long;
    this.create_by = checkin.create_by;
    this.create_date = checkin.create_date;    
};

Checkin.getAll = result => {
  sql = connect();
  sql.query("SELECT * FROM randomprize.checkin", (err, res) => {
      if (err) {        
        result(null, err)
        sql.end()
        return;
      } 
      
      result(null, res)
      sql.end()
    });       
};

Checkin.findById = (empId, result) => {
    
  sql = connect();
  sql.query(`SELECT * FROM randomprize.checkin WHERE empid = ${empId}`, (err, res) => {
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

Checkin.create = (newImport, result) => {
  sql = connect();
  sql.query("INSERT INTO randomprize.checkin SET ?", newImport, (err, res) => {
    if (err) {      
      result(err, null)
      sql.end()
      return;
    }

    sql.query(
      "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
      ["checkin", newImport.empid],      
      (err, res) => {
        if (err) {          
          result(null, err)
          sql.end()
          return;
        }
  
        if (res.affectedRows == 0) {         
          result({ status: "not_found" }, null)
          sql.end()
          return;
        }
  
        result(null, { id: res.insertId, ...newImport })
      }
    );

    sql.end()  

  });
};



Checkin.remove = (empId, result) => {
  sql = connect();
  sql.query("DELETE FROM randomprize.checkin WHERE empid = ?", empId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err)
      sql.end()
      return;
    }

    if (res.affectedRows == 0) {      
      result({ status: "not_found" }, null)
      sql.end()
      return;
    }
   
    sql.query(
      "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
      ["", empId],      
      (err, res) => {
        if (err) {         
          result(null, err)
          sql.end()
          return;
        }
  
        if (res.affectedRows == 0) {          
          result({ status: "not_found" }, null)
          sql.end()
          return;
        }
        
        result(null, res)
      }
    );

    sql.end()  

  });
};

module.exports = Checkin;