const Workout = require("../models/workout");

module.exports = (app) => {
	//find all workouts
	app.get("/api/workouts", (req, res) => {
		Workout.find({})
			.then((found) => {
				res.json(found);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});

	// create a workout
	app.post("/api/workouts", (req, res) => {
		Workout.create(req.body)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});

	// create a excercise
	app.put("/api/workouts/:id", (req, res) => {
		Workout.findOneAndUpdate(
			{ _id: req.params.id },
			{ $push: { exercises: req.body } },
			{ new: true }
		)
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});
};
