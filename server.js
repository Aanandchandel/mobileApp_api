require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
//Routs import
const studentRoute=require("./src/routes/studentRoute.js")
const paymentRoute=require("./src/routes/paymentRoute.js")
const connectdb=require("./src/config/dbconfig.js")
const cors = require('cors');
const Registration=require("./src/models/studentInfo.js")


//for  Logging Requests
const morgan = require('morgan');

const app = express();
const PORT=process.env.PORT||3000
// Middleware
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(morgan("combined"))

// Routes
app.use("/pay",paymentRoute);
app.use("/student",studentRoute);

app.get("/",(req,res)=>{
  console.log(req.headers.token)
  res.status(200).json({"/":"routes",
    "'/student'": " method=post  'enctype='multipart/form-data' ",
    "/student ":"method =get   send the token to get all users in header",
    "/student/studentid":"method =Delete   send the token  in header and ",
    "/login":"method =post , body=username,password   to get  token for admin",


  })
})
// Admin login route (POST form submission)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  const ADMIN_USERNAME=process.env.ADMIN_USERNAME
  const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD
  const JWT_SECRET=process.env.JWT_SECRET
    // Check credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
      res.status(200).json({message:"loged in user",
     token:token   
      });
    } else {
      res.send('Invalid credentials. Please try again.');
    }
  });
//Date.now() + path.extname(file.originalname)) fill name will be 

connectdb()
app.listen(PORT,()=>{console.log("server is running on port ",PORT)})
