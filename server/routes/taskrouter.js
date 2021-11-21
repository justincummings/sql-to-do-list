const pool = require('../modules/pool.js');

const express = require('express');

const router = express.Router();




//get route for tasks
router.get('/', (req, res) => {
    console.log('GET /tasks');
//declaring sqlText with sql string to select all rows, should sort by ascending order
    const sqlText = 'SELECT * FROM "tasks" ORDER BY "id";';
    //tapping the db for data
    pool.query(sqlText)
        .then((dbResult) => {
            console.log(`${dbResult.rows} rows to send`);
            //sending back the rows
            res.send(dbResult.rows);
        })
        .catch((dbError) => {
            console.error(dbError);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('POST /tasks');
    console.log('req.body:', req.body);
    const newTask = req.body;
    const sqlText = `
    INSERT INTO "tasks"
        ("task")
    VALUES
        ($1);
    `;
    const sqlValues = [
    newTask.task,
    ];
    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        console.log('INSERT succeeded.');
        res.sendStatus(201);
    })
    .catch((dbErr) => {
        console.error(dbErr);
        res.sendStatus(500);
    });
});



//put route for completing task
router.put('/:id', (req, res) => {
    console.log('PUT /tasks');
    const taskIdtoUpdate = req.params.id;
    const taskIsTrue = req.body.isTrue;
    console.log(taskIsTrue);
    const sqlText =  'UPDATE "tasks" SET "taskStatus" = $1 WHERE "id" = $2;';
    const sqlValues = ['true', taskIdtoUpdate]
    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        console.log(dbResult);
        res.sendStatus(200);
    })
    .catch((dbError) => {
        console.log(dbError);
        res.sendStatus(500);
    });
});

//delete route
router.delete('/:id', (req, res) => {
    console.log('DELETE /tasks');
    const taskIdtoDelete = req.params.id;
    const sqlText = 'DELETE FROM "tasks" WHERE "id" = $1;';
    const sqlValues = [taskIdtoDelete];
    pool.query(sqlText, sqlValues)
    .then((dbResult) => {
        console.log(dbResult);
        res.sendStatus(200);
    })
    .catch((dbError) => {
        console.log(dbError);
        res.sendStatus(500);
    });
});

module.exports = router;