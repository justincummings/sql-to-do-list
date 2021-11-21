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


router.put('/complete/:id', (req, res) => {
    let taskId = req.params.id;
    let sqlTxt = `
    UPDATE "tasks" SET "status" = true WHERE "id" = $1;
    `;
    pool.query(sqlTxt, [taskId])
    .then((resDb) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
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