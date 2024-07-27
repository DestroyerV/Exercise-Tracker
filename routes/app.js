const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const Exercise = require("../models/Exercise.js");

// Get users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Post users
router.post("/users", async (req, res) => {
  const userName = req.body.username;
  try {
    const prevUser = await User.findOne({ username: userName });
    if (prevUser) {
      res.json({ _id: prevUser._id, username: prevUser.username });
    } else {
      const newUser = new User({
        username: userName,
      });
      await newUser.save();
      res.json({ _id: newUser._id, username: newUser.username });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add exercises
router.post("/users/:_id/exercises", async (req, res) => {
  const { description, duration, date } = req.body;
  const { _id } = req.params;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newExercise = new Exercise({
      userId: _id,
      description,
      duration,
      date: date ? new Date(date) : new Date(),
    });

    await newExercise.save();
    return res.json({
      username: user.username,
      description: newExercise.description,
      duration: newExercise.duration,
      date: newExercise.date.toDateString(),
      _id: user._id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get logs
router.get("/users/:_id/logs", async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const exercises = await Exercise.find({ userId: _id });
    if (!exercises) {
      return res.status(404).json({ error: "Exercises not found" });
    }
    const filteredExercises = exercises.filter((exercise) => {
      if (from && to) {
        return (
          new Date(exercise.date).getTime() >= new Date(from).getTime() &&
          new Date(exercise.date).getTime() <= new Date(to).getTime()
        );
      } else if (from) {
        return new Date(exercise.date).getTime() >= new Date(from).getTime();
      } else if (to) {
        return new Date(exercise.date).getTime() <= new Date(to).getTime();
      } else {
        return true;
      }
    });
    if (limit) {
      return res.json({
        _id,
        username: user.username,
        count: filteredExercises.length,
        log: filteredExercises.slice(0, limit).map((exercise) => {
          return {
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
          };
        }),
      });
    } else {
      return res.json({
        _id,
        username: user.username,
        count: filteredExercises.length,
        log: filteredExercises.map((exercise) => {
          return {
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date.toDateString(),
          };
        }),
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
