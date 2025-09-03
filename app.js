const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());


// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev"
mongoose
  .connect(MONGODB_URI)
  .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to mongo", err));


// ROUTES
//  GET  / route - This is just an example route
app.get('/', (req, res) => {
    res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});


//  Iteration 3 - Create a Recipe route
//  POST  /recipes route
app.post('/recipes', async (req, res) => {
    try {
        await Recipe.create({ ...req.body });
        res.status(201).send("Recipe successfully created!");
    } catch (error) {
        res.status(500).send("Something went wrong creating a recipe");
    }
});


//  Iteration 4 - Get All Recipes
//  GET  /recipes route
app.get('/recipes', async (req, res) => {
    try {
        const response = await Recipe.find();
        res.json(response);
    } catch (error) {
        res.status(500).send("Something went wrong getting the recipe list");
    }
});


//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route
app.get('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await Recipe.findById(id);
        res.json(response);
    } catch (error) {
        res.status(500).send("Something went wrong getting the recipe");
    }
});

//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route
app.put('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndUpdate(id, { ...req.body });
        res.send("Recipe updated");
    } catch (error) {
        res.status(500).send("Something went wrong updating the recipe");
    }
});

//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route
app.delete('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Recipe.findByIdAndDelete(id)
        res.status(204).send("Recipe deleted");
    } catch (error) {
        res.status(500).send("Something went wrong deleting the recipe");
    }
});


// Start the server
app.listen(3000, () => console.log('My first app listening on port 3000!'));



//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
