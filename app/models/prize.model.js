const sql = require("../db");

// constructor
const Prize = function(prize) {
    this.pcode = prize.pcode;
    this.pdes = prize.pdes;
    this.pseq = prize.pseq;
    this.ptype = prize.ptype;    
};

Prize.getAll = result => {
    sql.query("SELECT * FROM randomprize.prize", (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
        return;
      } 
      
      result(null, res);
    });
};

Prize.findById = (codeId, result) => {
    sql.query(`SELECT * FROM randomprize.prize WHERE pcode = '${codeId}'`, (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        //console.log("found prize: ", res[0]);
        result(null, res[0]);
        return;
      }      
      result({ kind: "not_found" }, null);
    });
};

Prize.findByType = (typeId, result) => {

  console.log(typeId)

  sql.query(`SELECT * FROM randomprize.prize WHERE ptype = '${typeId}'`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found prize: ", res);
      result(null, res);
      return;
    }      
    result({ kind: "not_found" }, null);
  });
};

Prize.findByEmp = (empId, result) => {
  sql.query(`SELECT empid, name, famname, depabb, prize.pcode, prize.pdesc, IFNULL(flag, '') AS flag FROM employee INNER JOIN prize ON employee.prize_pcode=prize.pcode WHERE empid = ${empId}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found prize: ", res[0]);
      result(null, res[0]);
      return;
    }      
    result({ kind: "not_found" }, null);
  });
};


Prize.findPrizeWithEmp = result => {
  sql.query(`SELECT prize.pcode, prize.pdesc, IFNULL(flag, '') AS flag, IFNULL(empid, '-- รอจับรางวัล --') AS empid, IFNULL(name, '') AS name, IFNULL(famname, '') AS famname, IFNULL(depabb, '') AS depabb FROM prize LEFT JOIN employee ON employee.prize_pcode=prize.pcode ORDER BY prize.ptype, prize.pcode`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found prize: ", res[0]);
      result(null, res);
      return;
    }      
    result({ kind: "not_found" }, null);
  });
};


Prize.updateFlag = (input, result) => {
  sql.query(
    "UPDATE randomprize.employee SET flag=? WHERE empid = ?",
    [input.flag, input.empid],
    
    (err, res) => {
      if (err) {        
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {       
        result({ status: "not_found" }, null);
        return;
      }

      //console.log("updated employee: ", { empid: input.empid, ...employee });
      result(null, { success:true, empid: input.empid });
    }
  );
};


module.exports = Prize;