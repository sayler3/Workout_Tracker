const Workout = require("../models/workout");

module.exports = (app) => {
	//find last workout for dashboard
	app.get("/api/workouts", (req, res) => {
		Workout.find({});
		Workout.aggregate([
			{
				$addFields: {
					totalDuration: {
						$sum: "$exercises.duration",
					},
				},
			},
		])
			.sort({ date: -1 })
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

	// find range of last 7 days for stats page
	app.get("/api/workouts/range", (req, res) => {
		Workout.find({});
		Workout.aggregate([
			{
				$addFields: {
					totalDuration: {
						$sum: "$exercises.duration",
					},
				},
			},
		])
			.sort({ day: -1 })
			.limit(7)
			.sort({ day: 1 })
			.then((data) => {
				console.log(data);
				res.json(data);
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	});
};
