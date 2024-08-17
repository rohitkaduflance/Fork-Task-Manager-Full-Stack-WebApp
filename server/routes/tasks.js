import express from "express";
import db from "../db/connection.js"; // Connection to MongoDB Atlas
import { ObjectId } from "mongodb";

const router = express.Router();

// 1. Retrieve a list of all tasks
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("tasks");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving tasks");
  }
});

// 2. Add a new task
router.post("/", async (req, res) => {
  try {
    const newTask = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };
    const collection = await db.collection("tasks");
    const result = await collection.insertOne(newTask);
    res.status(201).send(result.ops[0]); // Returning the created task
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding task");
  }
});

// 3. Update an existing task by its ID
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
    };
    const collection = await db.collection("tasks");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      res.status(404).send("Task not found");
    } else {
      res.status(200).send("Task updated successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating task");
  }
});

// 4. Delete a task by its ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = await db.collection("tasks");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send("Task not found");
    } else {
      res.status(200).send("Task deleted successfully");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

export default router;
