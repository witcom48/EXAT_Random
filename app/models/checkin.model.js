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
    sql.end()

      if (err) {        
        result(err, null)        
      } 
      else{
        result(null, res)
      }
      
    });       
};

Checkin.findById = (empId, result) => {
    
  sql = connect();
  sql.query(`SELECT * FROM randomprize.checkin WHERE empid = ${empId}`, (err, res) => {
      
    sql.end() 

      if (err) {        
        result(err, null)       
      }else if (res.length) {        
        result(null, res[0])        
      }      
      else{
        result({ status: "not_found" }, null)
      }
     
    });
       
};


Checkin.getAllCheckin = result => {
  sql = connect();
  query = "SELECT randomprize.employee.empid as empid, randomprize.employee.name as name, randomprize.employee.famname as famname, randomprize.employee.depabb as depabb";
  query += " , randomprize.checkin.lat, randomprize.checkin.long, randomprize.checkin.create_by, randomprize.checkin.create_date";
  query += " FROM randomprize.checkin INNER JOIN randomprize.employee ON randomprize.employee.empid=randomprize.checkin.empid ORDER BY randomprize.employee.depabb, randomprize.employee.empid";

  sql.query(query, (err, res) => {
    sql.end()
    
      if (err) {        
        result(err, null)        
      } 
      else{
        result(null, res)
      }     
    });       
};


Checkin.create = (newImport, result) => {

  recordCheckin(newImport, (err, data) => {           
    if (err != null){
      result(err, null)     
      return;
    }
    else{
      updateFlag(newImport.empid, "checkin", (err, data) => {           
        if (err != null){
          result(err, null)         
          return;
        }
        else{
          result(null, { success:true, ...newImport })          
        }
      });      
    }
  });
  
};

Checkin.remove = (empId, result) => {  
  removeCheckin(empId, (err, data) => {           
    if (err != null){
      result(err, null)     
      return;
    }
    else{
      updateFlag(empId, "", (err, data) => {           
        if (err != null){
          result(err, null)         
          return;
        }
        else{
          result(null, { success:true, message:"deleted " + empId + " successfully" })          
        }
      });      
    }
  });
};

function recordCheckin(newImport, result) {
  sql = connect();
  sql.query("INSERT INTO randomprize.checkin SET ?", newImport, (err, res) => {
    
    sql.end() 
    
    if (err) {      
      result(err, null)          
    }
    else{
      result(null, { id: res.insertId, ...newImport })
    }

  });
}

function removeCheckin(empId, result) {
  sql = connect();
  sql.query("DELETE FROM randomprize.checkin WHERE empid = ?", empId, (err, res) => {

    sql.end() 

    if (err) {      
      result(err, null)   
    }
    else{
      result(null, { success: true })
    }

  });
}

function updateFlag(empid, flag, result) {  
  sql = connect();
  sql.query(
    "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
    [flag, empid],      
    (err, res) => {

      sql.end()

      if (err) {          
        result(err, null) 
      }
      else if (res.affectedRows == 0) {         
        result({ status: "not_found" }, null)    
      }
      else{
        result(null, { success: true })
      }
      
    }
  );
  
}


module.exports = Checkin;