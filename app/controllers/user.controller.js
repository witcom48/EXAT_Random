const bcrypt = require("../utilities/bcrypt");

exports.verify = (req, res) => {    
    var tmp = bcrypt.doGetToken(req.body.usr, req.body.pwd)    
    if(tmp.status_code == 1){
        res.status(200).send({
            success:true,
            message: tmp.message
          });
    }
    else{
        res.status(500).send({
            success:false,
            message: tmp.message
          });
    }
};
