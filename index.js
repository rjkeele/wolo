let express = require('express'),
    session = require('express-session'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    envConfig = require('./config/env');

const DIR = './upload';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);

        console.log('fsdafds____', file.originalname);
    }
});
let upload = multer({storage: storage});

// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(envConfig.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database sucessfully connected')
    },
    error => {
        console.log('Database could not connected: ' + error)
    }
);

// Setting up port with express js
const app = express();

app.use(session({secret: 'mySecret', resave: true, saveUninitialized: false}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

//Ricky
app.use(express.static(__dirname));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/upload', function (req, res) {
    var query = req.query;
    console.log('afaffsd__________', query);
    res.sendFile('./upload/' + query);
});

app.post('/api/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');
        return res.send({
            success: true
        })
    }
});
//

const userRoute = require('./app/user');
app.use('/user', userRoute);
const locationRoute = require('./app/location');
app.use('/location', locationRoute);
const ReferralRoute = require('./app/referral');
app.use('/referral', ReferralRoute);
const EventRoute = require('./app/event');
app.use('/event', EventRoute);
const ServiceRoute = require('./app/service');
app.use('/service', ServiceRoute);
const PracticeRoute = require('./app/practice');
app.use('/practice', PracticeRoute);
const CommentRoute = require('./app/comment');
app.use('/comment', CommentRoute);
const MailsvRoute = require('./app/mail');
app.use('/mail_to', MailsvRoute);

// Create port
const port = process.env.PORT || envConfig.port;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});
