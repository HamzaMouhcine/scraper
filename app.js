var express = require("express");
var mongoose = require("mongoose");
var morgan = require("morgan");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var setUpPassport = require("./setuppassport");
var puppet = require("./puppet");

var routes = require("./routes");

var app = express();

mongoose.connect("mongodb://localhost:27017/test",
  { useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true     }
);

app.set("port", process.env.PORT || 3000);
setUpPassport();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/public',express.static(path.join(__dirname,"public")));
app.use(morgan('short'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
	resave: true,
	saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(app.get("port"), function() {
	console.log("Server started on port " + app.get("port"));
});


//puppeteer testing...
puppet();