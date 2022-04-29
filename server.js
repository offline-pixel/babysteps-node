const mongoSanitize = require('express-mongo-sanitize');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer"); // mailtrap.io for sandbox
const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const helmet = require('helmet');
const xss = require('xss-clean');
const https = require('https');
const http = require('http');
const path = require('path');
const cors = require('cors');
const hpp = require('hpp');
const fs = require('fs');
// https://www.npmjs.com/package/speakeasy
// https://www.npmjs.com/package/node-2fa
// let ffi = require('ffi'); // package.json removed "ffi": "^1.3.1" // try ffi-napi

// let lib = ffi.Library(path.join(__dirname, '../target/release/libembed'), {
//   fibonacci: ['int', ['int']]
// });

// let num = lib.fibonacci(20);

const privateKey  = fs.readFileSync('key.pem', 'utf8');
const certificate = fs.readFileSync('cert.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

// use arithmetic coding for saving data and for reading do huffman coding(If not compressed already)

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const region = require('./routes/region');
const college = require('./routes/college');
const affiliate = require('./routes/affiliate');
const auth = require('./routes/auth');

let whitelist = [ 'https://localhost:55586', 'http://localhost:55586' ]
let corsOptions = {
  origin: function (origin, callback) {
    if(!origin){//for bypassing postman req with  no origin
      console.log(`soemone we allowed. We allowed unknown- ${origin}`.red.bold)
      return callback(null, true);
    }
    if (whitelist.includes(origin)) {
      console.log(`we allowed- ${origin}`.gray.bold)
      callback(null, true)
    } else {
      console.log(`We did not allowed- ${origin}`.red.bold)
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
const app = express();
// your EXPRESS configuration here for secured or unsecured http/https connection
const secured = https.createServer(credentials, app);
const unsecured = http.createServer(app);


app.use(bodyParser.json({ limit: "2mb" }));
// app.options('*', cors(corsOptions)) // Enable pre-flight for all routes. not working
app.use(cors());
// app.use(cors(corsOptions));
app.use(compression());
// app.set("etag", false) // disabled because browser do not bother to cache my results in your internal cache
// commenting etag results in better results to few requests but as a variable.
// I checked on localhost and 1.4kb CSV request data was taking 51ms to 4ms time. Without it was a constant ~19ms

// app.use(upload());
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Sanitize data
app.use(mongoSanitize());
// Body parser
app.use(express.json());
// Cookie parser
app.use(cookieParser());
// File uploading
app.use(fileupload()); // is this really we using rn ?
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);
// Prevent http param pollution
app.use(hpp());

// Mount routers
app.use('/api/v1/region', region);
app.use('/api/v1/college', college);
app.use('/api/v1/affiliate', affiliate);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static('dist/ui'))
// Handles any requests that don't match the ones above, will solve reloading issue on any angular route
app.get('/*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/dist/ui/index.html'));
})

const PORT = process.env.PORT || 8080;
// unsecured.listen(8080);
// secured.listen(8443);
const server = secured.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
