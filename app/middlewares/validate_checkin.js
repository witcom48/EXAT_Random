
const Employee = require("../models/employee.model")

const validateCheckin = async (req, res, next) => {
    try {
        
        const req_body  = req.body
      
        validateEmp(req_body, (err, data) => {           
            if (err != null){
                res.send(err);
            }
            else{                
                return next()
            }
        });
        

    } catch (error) {      
        res.status(201).send({
            message:
            error.message || "Failed to authenticate token."
        });

    }
}

function validateEmp(body, result) {    
    Employee.findById(body.empid, (err, data) => {        
        if (err != null){
            result({"success": false, message: "Not Found Employee :" + body.empid}, null)
        }
        else{
            result(null, data)
        }
    });    
}


module.exports = validateCheckin
