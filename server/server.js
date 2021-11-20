const express = require('express');

const tasksRouter = require('./routes/taskrouter.js');

const app = express();

const PORT = 5000;

app.use(express.static('server/public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/tasks', tasksRouter);

app.listen(PORT, () => {
  console.log("I'm listening", PORT);
})