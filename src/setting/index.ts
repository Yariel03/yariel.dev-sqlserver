//cspell:disable
require("dotenv");
const sql = require("mssql");
const { consoleLog: clo, Color } = require("yariel.dev-colors");

let { DATABASE, HOSTDB, USERDB, PASSWORDDB, idleTimeoutMillis, MAX_POOL } =
  process.env;
const sqlConfig = {
  user: USERDB,
  password: PASSWORDDB,
  database: DATABASE,
  server: HOSTDB,
  pool: {
    max: Number(MAX_POOL),
    min: 0,
    idleTimeoutMillis: Number(idleTimeoutMillis),
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
  arrarrayRowMode: true,
};

const pool = new sql.ConnectionPool(sqlConfig);

(async () => {
  try {
    await pool.connect();

    clo(Color.Blue, `********************************************************`);
    clo(Color.Check, ` Conexion exitosa a : ${DATABASE}`);
    clo(Color.Blue, `********************************************************`);
  } catch (err) {
    clo(Color.Error, `Error conectando a la base de datos ${DATABASE}, ${err}`);
    await pool.close();
  }
})();

module.exports = { pool };
