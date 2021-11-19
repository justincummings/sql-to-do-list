const pg = require('pg');
const Pool = pg.Pool;
const config = {
  host: 'localhost', 
  database: ''
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('server-database connected.');
});

pool.on('error', (poolError) => {
  console.error(poolError);
});

module.exports = pool;