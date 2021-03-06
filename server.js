// Adding dependencies
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));

// setting port for deployment and running localhost
const PORT = process.env.PORT || 3000;

// setting up database connection for deployment and localhost
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
		useNewUrlParser: true,
		useFindAndModify: false,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.catch((error) => handleError(error));

// setting up middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// bringing in routes
require("./routes/clientRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, function () {
	console.log(`Listening on http://localhost:${PORT}`);
});
