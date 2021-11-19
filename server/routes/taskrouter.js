const express = require('express');

const router = express.Router();

const pool = require('../modules/pool');


//get route for tasks
router.get('/', (req, res) => {
    console.log('GET /tasks');
//declaring sqlText with sql string to select all rows, should sort by ascending order
    const sqlText = 'SELECT * FROM "tasks" ORDER BY "id";';
    //tapping the db for data
    pool.query(sqlText)
        .then((dbResult) => {
            console.log(`${dbResult.rows} rows to send`)
            //sending back the rows
            res.send(dbResult.rows);
        })
        .catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500);
        });
});

//post route for tasks
router.post('/', (req, res) => {
    console.log('POST /tasks');
    console.log('req.body:', req.body);
    const newTask = req.body;
    const sqlText = 'INSERT INTO "tasks"("task",) VALUES ($1);';
    //sql string tapping the db
    pool.query (sqlText, [newTask.task])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log (`Error adding new task`, error);
            res.sendStatus(500);
        });
}); 