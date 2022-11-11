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
      if (err) {    
        result(null, err)
        sql.end()
        return;
      } 
      
      result(null, res)
      sql.end()
    });
};

Prize.findById = (codeId, result) => {
  sql = connect();
    sql.query(`SELECT * FROM randomprize.prize WHERE pcode = '${codeId}'`, (err, res) => {
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

Prize.findByType = (typeId, result) => {

  sql = connect();

  sql.query(`SELECT * FROM randomprize.prize WHERE ptype = '${typeId}'`, (err, res) => {
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
    result({ kind: "not_found" }, null);
    sql.end()
  });
};

Prize.findByEmp = (empId, result) => {
  sql = connect();
  sql.query(`SELECT empid, name, famname, depabb, prize.pcode, prize.pdesc, IFNULL(flag, '') AS flag FROM employee INNER JOIN prize ON employee.prize_pcode=prize.pcode WHERE empid = ${empId}`, (err, res) => {
    if (err) {
    
      result(err, null)
      sql.end()
      return;
    }

    if (res.length) {  
      result(null, res[0]);
      sql.end()
      return;
    }      
    result({ kind: "not_found" }, null)
    sql.end()
  });
};


Prize.findPrizeWithEmp = result => {
  sql = connect();
  sql.query(`SELECT prize.pcode, prize.pdesc, IFNULL(flag, '') AS flag, IFNULL(empid, '-- รอจับรางวัล --') AS empid, IFNULL(name, '') AS name, IFNULL(famname, '') AS famname, IFNULL(depabb, '') AS depabb FROM prize LEFT JOIN employee ON employee.prize_pcode=prize.pcode ORDER BY prize.ptype, prize.pcode`, (err, res) => {
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


Prize.updateFlag = (input, result) => {
  sql = connect();
  sql.query(
    "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
    [input.flag, input.empid],
    
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

      result(null, { empid: input.empid })
      sql.end()
    }    
  );
};


module.exports = Prize;