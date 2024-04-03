const con = require('../../modules/connection')
const runQuery = (req, res) => {
    let body = req.body.input + ".";
    body = body.split(" ").join("");
    let fname = [];
    let lname = [];
    let email = [];
    let city = [];
    let currentDel = 0;
    let nextDel = 0;
  
    let sql = "";
    if (req.body.input) {
      for (let i = 0; i <= body.length; i++) {
        if (
          body.charAt(i) == "_" ||
          body.charAt(i) == "$" ||
          body.charAt(i) == "{" ||
          body.charAt(i) == "}" ||
          body.charAt(i) == "." 
        ) {
          currentDel = i;
  
          for (let j = i + 1; j <= body.length; j++) {
            if (
              body.charAt(j) == "_" ||
              body.charAt(j) == "$" ||
              body.charAt(j) == "{" ||
              body.charAt(j) == "}" ||
              body.charAt(j) == "." 
            ) {
              nextDel = j;
  
              const del = body.charAt(currentDel);
  
              switch (del) {
                case "_":
                  fname.push(body.slice(currentDel + 1, nextDel));
                  break;
                case "$":
                  lname.push(body.slice(currentDel + 1, nextDel));
                  break;
                case "{":
                  email.push(body.slice(currentDel + 1, nextDel));
                  break;
                case "}":
                  city.push(body.slice(currentDel + 1, nextDel));
                  break;
                default:
                  break;
              }
              break;
            }
          }
        }
      }
  
      function stringForm(arr, field) {
        let tempStr = "";
        arr.forEach((element) => {
          if (element == undefined) {
            tempStr = tempStr + field + " like '%' or ";
          } else {
            tempStr = tempStr + field + " like '" + element + "%' or ";
          }
        });
  
        return tempStr.slice(0, -4);
      }
  
      const fname_str = stringForm(fname, "fname");
      const lname_str = stringForm(lname, "lname");
      const email_str = stringForm(email, "email");
      const city_str = stringForm(city, "city");
      let queryholder = [fname_str, lname_str, email_str, city_str];
      let query = queryGen(queryholder);
  
      function queryGen(queryholder) {
        let random = "";
        queryholder.forEach((element) => {
          if (element == "") {
            random = random + "";
          } else {
            random = random + "(" + element + ") and";
          }
        });
        return random.slice(0, -4);
      }
      
      
      sql = `select fname as First_Name,lname as Last_Name,email as Email,city as City from  Student_Master_feb26 where ${query};`;
    } else {
      sql =
        "select fname as First_Name,lname as Last_Name,email as Email,city as City from  Student_Master_feb26";
    }
    body = req.body.input;
    con.query(sql, function (err, result, fields) {
      if (err) {
        res.render("DelSearchView/table", {
          body: body,
        });
      } else {
        let cols = [];
        fields.forEach((element) => {
          cols.push(element.name);
        });
        res.render("DelSearchView/table", {
          cols: cols,
          result: result,
          body: body,
        });
      }
    });
  };
  module.exports={runQuery}