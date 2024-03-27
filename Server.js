const express = require("express");
const app = express();
const userRoute = require("./routes/router.js");
const JSRoute = require("./routes/JSTaskRoutes/jsrouter.js");
const CSSRoute = require("./routes/CSSRoutes/cssrouter.js");
const cookieParser = require("cookie-parser");
const PageRouter = require("./routes/Pageand Sorting/pageandsortrouter.js");
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static("public"));

app.set("view engine", "ejs");

app.use("/", userRoute, JSRoute,CSSRoute,PageRouter);
app.listen(process.env.PORT || 8080, () => {
    console.log("Server is listening on 8080...");
});
