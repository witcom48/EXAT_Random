const connect = require("../db");

// constructor
const Prize = function(prize) {
    this.pcode = prize.pcode;
    this.pdes = prize.pdes;
    this.pseq = prize.pseq;
    this.ptype = prize.ptype;    
};

Prize.getAll = result => {
    sql = connect();
    sql.query("SELECT * FROM randomprize.prize", (err, res) => {
      
      sql.end();

      if (err) {    
        result(err, null)       
      }
      else{
        result(null, res)
      }       
    });
};

Prize.findById = (codeId, result) => {
  sql = connect();
    sql.query(`SELECT * FROM randomprize.prize WHERE pcode = '${codeId}'`, (err, res) => {
      
      sql.end();

      if (err) {     
        result(err, null);       
      }
      else if (res.length) { 
        result(null, res[0]);
      }
      else{
        result({ status: "not_found" }, null)
      } 
      
    });
};

Prize.findByType = (typeId, result) => {

  sql = connect();

  sql.query(`SELECT * FROM randomprize.prize WHERE ptype = '${typeId}'`, (err, res) => {
    
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

Prize.findByEmp = (empId, result) => {
  sql = connect();
  sql.query(`SELECT empid, name, famname, CONCAT(divabb, secabb, depabb) AS depabb, prize.pcode, prize.pdesc, IFNULL(receive_status, '') AS receive_status, IFNULL(receive_by, '') AS receive_by, receive_date FROM employee INNER JOIN prize ON employee.prize_pcode=prize.pcode WHERE empid = ${empId}`, (err, res) => {
    
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


Prize.findPrizeWithEmp = result => {
  sql = connect();
  sql.query(`SELECT prize.pcode, prize.pdesc, IFNULL(empid, '') AS empid, IFNULL(name, '') AS name, IFNULL(famname, '') AS famname, CONCAT(divabb, secabb, depabb) AS depabb, IFNULL(receive_status, '') AS receive_status, IFNULL(receive_by, '') AS receive_by, receive_date FROM prize LEFT JOIN employee ON employee.prize_pcode=prize.pcode ORDER BY prize.ptype, prize.pcode`, (err, res) => {
   
    sql.end();
    
    if (err) {
      result(err, null);           
    }
    else if (res.length) {
      result(null, res);    
    }      
    else{
      result({ status: "not_found" }, null)
    }
    
  });
};


Prize.updateFlag = (input, result) => {
  sql = connect();
  sql.query(
    "UPDATE randomprize.employee SET receive_status=?, receive_by=?, receive_date=current_timestamp() WHERE empid = ?",
    [input.receive_status, input.receive_by, input.empid],
    
    (err, res) => {

      sql.end();

      if (err) {        
        result(err, null);       
      }
      else if (res.affectedRows == 0) {             
        result({ status: "not_found" }, null);        
      }
      else{
        result(null, { empid: input.empid, receive_status: input.receive_status  });
      }

    }    
  );
};


module.exports = Prize;