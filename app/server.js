const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
//const morgan = require('morgan');
const xss = require('xss-clean');
const moment = require('moment-timezone');
const helmet = require('helmet');
const router = express.Router()
const app = express();

const prize = require('./routes/prize.routes')
const checkin = require('./routes/checkin.routes')
const user = require('./routes/user.routes')
const employee = require('./routes/employee.routes')

//-- Config
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
moment.tz.setDefault('Asia/Bangkok')

// Route for home page
app.get("/home", (req, res) => {
  res.json({ message: "!! RANDOM API" });
});

app.use(checkin)
app.use(prize)
app.use(user)
app.use(employee)


let dateFormat = new Date()

// Methods on Date Object will convert from UTC to users timezone
// Set minutes to current minutes (UTC) + User local time UTC offset

//const date = new Date()
//console.log( convertTZ(date, "Asia/Bangkok"))

//const str = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });

//var aa = new Date(str);

//console.log(aa);
//console.log(str);

// setting port to 3000, & listening for requests http request.
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});


