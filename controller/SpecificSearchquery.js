const con = require('../modules/connection')
exports.runQuery = (req, res) => {
  let count = req.query.id ? req.query.id : 1;

  console.log(req.body);
  const fname = req.body.std_fname;
  const lname = req.body.std_lname;
  const gender = req.body.gender;
  const dob = req.body.dob;
  const city = req.body.city;
  const country = req.body.country;
  const sem = req.body.sem;

  let sql = "";
  let stdId = "";
  if (req.body.input) {
    sql = `select * from Student_Master_feb26 where sid in (${req.body.input})`;
  } else if (req.query.stdId) {
    stdId = req.query.stdId;
    sql = `select * from Student_Master_feb26 where sid in (${req.query.stdId})`;
  } else if (
    fname != undefined &&
    lname != undefined &&
    gender != undefined &&
    dob != undefined &&
    city != undefined &&
    country != undefined &&
    sem != undefined
  ) {
    sql = `select * from Student_Master_feb26 where fname like '${fname}%' && lname like '${lname}%' && gender like '${gender}%' && city like '${city}%' && countrycode like '${country}%'`;
  } else {
    sql = `select * from Student_Master_feb26`;
  }

  const records = 10;
  const newsql = sql.replace("*", "count(*)");

  con.query(
    sql + ` limit ${count * records - records},${records};`,
    function (err, result, fields) {
      if (err) {
        console.log(err);
        res.send("data not found");
      } else {
        con.query(`select count(*) from Student_Master_feb26;`, function (err, total) {
          const totalData = Object.values(total[0])[0];

          if (count == null || count < 1) {
            count = 1;
          }
          if (count >= total / records) {
            count = total / records;
          }

          let cols = [];
          fields.forEach((element) => {
            cols.push(element.name);
          });

          if (stdId <= totalData) {
            res.render("SpfSearchView/table", {
              count: count,
              cols: cols,
              result: result,
              total: totalData,
              records: records,
              stdId: stdId,

              std_fname: fname,
              std_lname: lname,
              gender: gender,
              dob: dob,
              city: city,
              country: country,
              sem: sem,
            });
          } else {
            res.send("data not found");
          }
        });
      }
    }
  );
  function render(sql) {}
};