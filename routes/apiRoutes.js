const Workout = require("../models/workout");

module.exports = (app) => {
	//find all workouts
	app.get("/api/workouts", (req, res) => {
		Workout.find()
			.then((found) => {
				res.json(found);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});

	//create a workout
	// app.post("/api/workouts", (req, res) => {
	// 	Workout.create({
	// 		date: Date.now(),
	// 	});
	// });
};
