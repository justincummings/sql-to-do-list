const express = require('express');

const router = express.Router();

const pool = require('../modules/pool');


//get route for tasks
router.get('/', (req, res) => {
    console.log('GET /tasks');
//declaring sqlText with sql command to select all rows, should sort by ascending order
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
router.post('/', )