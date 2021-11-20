const express = require('express');

const router = express.Router();

const pool = require('../modules/pool.js');


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
        .catch((dbError) => {
            console.error(dbError);
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
        .then((dbResult) => {
            console.log(dbResult);
            res.sendStatus(201);
        })
        .catch((dbError) => {
            console.log ('Error adding new task', dbError);
            res.sendStatus(500);
        });
}); 

//put route for completing task
router.put('/:id', (req, res) => {
    console.log('PUT /tasks');
    const taskId = req.params.id;
    const sqlText =  'UPDATE "tasks" SET "complete" = true WHERE "id" = $1;';
    console.log('PUT /tasks');
    pool.query(sqlText, [taskId])
    .then((dbResult) => {
        console.log(dbResult);
        res.sendStatus(201);
    })
    .catch((dbError) => {
        console.log(dbError);
        res.sendStatus(500);
    });
});

//delete route
router.delete('/:id', (req, res) => {
    console.log('DELETE /tasks');
    let taskId = req.params.id;
    let sqlText = 'DELETE FROM "tasks" WHERE "id" = $1;';
    pool.query(sqlText, [taskId])
    .then((dbResult) => {
        console.log(dbResult);
        res.sendStatus(201);
    })
    .catch((dbError) => {
        console.log(dbError);
        res.sendStatus(500);
    });
});

module.exports = router;