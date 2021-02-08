// Adding dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));

// setting port the deploy and localhost
const PORT = process.env.PORT || 3000;

// setting up middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/clientRoutes")(app);
// require("./routes/apiRoutes")(app);

app.listen(PORT, function () {
	console.log(`Listening on http://localhost:${PORT}`);
});
