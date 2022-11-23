const Employee = require("../models/employee.model")
const Prize = require("../models/prize.model")

exports.findAllPrize = (req, res) => {
  Employee.findAllPrize(req.params.status, (err, data) => {
        if (err)
          res.send({
            success:false,
            message:
              err.message || "Some error occurred while retrieving employee"
          });
        else res.send({success:true, data:data});
    });
};



exports.summaryPrize = (req, res) => {
  
  const req_body  = req.body
      
  getPrize(req_body, (err, data) => {           
      if (err != null){
          res.send(err);
      }
      else{   
        
        getPrizeAllEmp(req_body, (err, data2) => {           
          if (err != null){
            res.send(err);
          }
          else{                           
            res.send({success:true, prize:data.count, emp:data2.count});
          }
        });
          
      }
  });



};


function getPrize(body, result) {    
  Prize.getAll((err, data) => {        
      if (err != null){
          result({"success": false, message: "Not Found Prize "}, null)
      }
      else{
          result(null, {count:data.length})
      }
  });    
}

function getPrizeAllEmp(body, result) {    
  Employee.findAllPrize('all', (err, data) => {        
      if (err != null){
          //result({"success": false, message: "Not Found Employee "}, null)
          result(null, {count:0})
      }
      else{
          result(null, {count:data.length})
      }
  });    
}
