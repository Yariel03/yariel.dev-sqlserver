// cspell:disable
const { pool: poolx } = require("./setting/index");

const exec = async (
  SQL: string,
  OK: string,
  msgVacio: string,
  msgError = null
) => {
  let response: any = {};
  try {
    const res = await poolx.request().query(SQL);
    response = {
      count: res.recordset.length,
      message: res.recordset.length > 0 ? OK : msgVacio,
      data: res.recordset ?? [],
    };
  } catch (err: any) {
    console.log(err);
    response = {
      count: -1,
      message: msgError ?? err.originalError.info.message,
      data: [],
    };
  } finally {
    return response;
  }
};

module.exports = { exec };
