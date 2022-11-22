
const Prize = require("../models/prize.model")

const validatePrize = async (req, res, next) => {
    try {
        
        const req_body  = req.body
      
        checkPrize(req_body, (err, data) => {           
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

function checkPrize(body, result) {    
    Prize.findByEmp(body.empid, (err, data) => {        
        if (err != null){
            result({"success": false, message: "Not Found Prize :" + body.empid}, null)
        }
        else{
            result(null, data)
        }
    });    
}


module.exports = validatePrize
