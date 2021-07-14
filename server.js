/* === External Modules === */
const express = require("express");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const db = require("./models");

/* === Internal Modules === */
const controllers = require("./controllers");

/* === Instanced Modules === */
const app = express();

/* === Configuration === */
require("dotenv").config();

app.set("view engine", "ejs");

/* === Middleware === */
// body data middleware
app.use(express.urlencoded({ extended: true }));
// method override
app.use(methodOverride("_method"));
// middleware to serve public as static files (css)
app.use(express.static(`${__dirname}/public`));

// setup session middelware
// app.use(session({
//     store: MongoStore.create({ mongoURL: process.env.MONGO_URI }),
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));

// logger middleware
// app.use((req, res, next) => {
//     console.log(`${req.method} - ${req.url}`);
//     console.log(req.session);
//     next();
// });

// authRequired middleware

// const authRequired = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next();
//     }
//     return res.redirect("/login");
// };

// app.use((req, res, next) => {
//     app.locals.user = req.session.currentUser;

//     next();
// });

/* === Routes/Controllers === */
// Welcome
// app.get("/", (req, res) => {
//     const context = { user: req.session.currentUser }
//     res.render("Welcome", context);
// });


// auth controller
// app.use("/", controllers.auth);

// Main site controller
app.use("/", controllers.shop);

// admin controller
app.use("/", controllers.admin);

// Home Route
app.get("/", function (req, res) {
    res.render("home");
})

/* === Server Listener === */
app.listen(process.env.PORT || 5000);

app.use(express.static(`public`));
