const con = require('../modules/connection')
const fetchStates = () => {
    return new Promise((resolve, reject) => {
        con.query('SELECT * FROM states;', (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const fetchCity = (state) => {
    return new Promise((resolve, reject) => {
        con.query(`SELECT * FROM cities where state_id='${state}';`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const insertBasic = (jsonObj) => {
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO Emp_Master (fname, lname,email,phone,gender,deg,rstatus,dob,address,pref_loc,notice_prd_days,e_ctc,c_ctc,dept,cityid,stateid,zipcode)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?);`
        con.query(sql, [jsonObj.fname, jsonObj.lname, jsonObj.email, jsonObj.phone, jsonObj.gender, jsonObj.designation, jsonObj.rstatus, jsonObj.dob, jsonObj.add1, jsonObj.pref_loc, jsonObj.not_pir, jsonObj.e_ctc, jsonObj.c_ctc, jsonObj.dept, jsonObj.city, jsonObj.state, jsonObj.zipcode], (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result.insertId)
        })
    })
}
const insertEDU = (jsonObj, empPK) => {
    return new Promise((resolve, reject) => {
        var courseArr = jsonObj.course.filter(cou => {
            return cou != ''
        })
        if (courseArr.length > 0) {
            for (let i = 0; i < courseArr.length; i++) {
                con.query(`insert into education(eid ,course ,pass_year ,per )values('${empPK}','${courseArr[i]}','${jsonObj.pass_year[i]}','${jsonObj.perc[i]}')`, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                })
            }
        }
        return resolve();
    })
}
const insertWork = (jsonObj, empPK) => {
    return new Promise((resolve, reject) => {
        var compArr = jsonObj.com_name.filter(comp => {
            return comp != ''
        })
        if (compArr.length > 0) {
            for (let i = 0; i < compArr.length; i++) {
                con.query(`insert into New_workexp(eid,comp_name,designation,from_d,to_d) values ('${empPK}','${compArr[i]}','${jsonObj.deg_name[i]}','${jsonObj.exp_from[i]}','${jsonObj.exp_to[i]}')`, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err)
                    }
                })
            }
        }
        return resolve()
    })
}
const insertlang = (jsonObj, empPK) => {
    return new Promise((resolve, reject) => {
        jsonObj.language.forEach(lang => {
            switch (lang) {
                case 'hindi':
                    jsonObj.h_ability.forEach(ability => {
                        con.query(`insert into  Language_known(eid,language_s,ability) values ('${empPK}','${lang}','${ability}')`, (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                        })
                    })
                    break;
                case 'gujarati':
                    jsonObj.g_ability.forEach(ability => {
                        con.query(`insert into  Language_known(eid,language_s,ability) values ('${empPK}','${lang}','${ability}')`, (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                        })
                    })
                    break;
                case 'english':
                    jsonObj.e_ability.forEach(ability => {
                        con.query(`insert into  Language_known(eid,language_s,ability) values ('${empPK}','${lang}','${ability}')`, (err, result) => {
                            if (err) {
                                console.log(err);
                                return reject(err)
                            }
                        })
                    })
                    break;

                default:
                    break;
            }
        });
        return resolve()
    })
}
const insertTech = (jsonObj, empPK) => {
    return new Promise((resolve, reject) => {
        jsonObj.tech_known.forEach(tech => {
            switch (tech) {
                case 'php':
                    con.query(`insert into Tech_ability(eid,tech,level_e) values('${empPK}','${tech}','${jsonObj.php_ability}')`, (err, result) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                    })
                    break;
                case 'mysql':
                    con.query(`insert into Tech_ability(eid,tech,level_e) values('${empPK}','${tech}','${jsonObj.mysql_ability}')`, (err, result) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                    })
                    break;
                case 'laravel':
                    con.query(`insert into Tech_ability(eid,tech,level_e) values('${empPK}','${tech}','${jsonObj.laravel_ability}')`, (err, result) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                    })
                    break;
                case 'oracle':
                    con.query(`insert into Tech_ability(eid,tech,level_e) values('${empPK}','${tech}','${jsonObj.oracle_ability}')`, (err, result) => {
                        if (err) {
                            console.log(err);
                            return err;
                        }
                    })
                    break;

                default:
                    break;
            }
        })
        return resolve();
    })
}
const insertRefrence = (jsonObj, empPK) => {
    return new Promise((resolve, reject) => {
        var contactArr = jsonObj.cont_name.filter(contact => {
            return contact != ''
        })
        if (contactArr.length > 0) {
            for (let i = 0; i < contactArr.length; i++) {
                con.query(`insert into EMP_Refrence (eid,relation,rname,rphone) values('${empPK}','${jsonObj.cont_rel[i]}','${contactArr[i]}','${jsonObj.cont_num[i]}')`, (err, result) => {
                    if (err) {
                        console.log(err);
                        return reject(err)
                    }
                })
            }
        }
        return resolve()
    })
}
const fetchBasicDetails = (empId) => {
    return new Promise((resolve, reject) => {
        var sql = `select eid,	fname,	lname,	email,	phone,	gender,	deg,	rstatus,	DATE_FORMAT(dob, "%Y-%m-%d ") as dob,	address,	pref_loc,	notice_prd_days,	e_ctc,	c_ctc,	dept,	cityid,	stateid	,zipcode
        FROM Emp_Master where eid='${empId}'`
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result[0])
        })
    })
}
const fetchEducationDetails = (empId) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from education where eid='${empId}'`
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const fetchWorkDetails = (empId) => {
    return new Promise((resolve, reject) => {
        var sql = `select workid,eid,	comp_name,designation,DATE_FORMAT(from_d, "%Y-%m-%d ")  as from_d,DATE_FORMAT(to_d, "%Y-%m-%d ") as to_d from New_workexp where eid='${empId}'`
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const fetchRefDetails = (empId) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from EMP_Refrence where eid='${empId}'`
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const fetchLanguage = async (empId) => {
    var langRecords = await selectLang(empId)
    var langResult = langRecords.reduce((accu, langObj) => {
        var lang = langObj.language_s
        if (!accu[lang]) {
            accu[lang] = []
        }
        accu[lang].push(langObj.ability)
        return accu;
    }, {})
    langResult['languages'] = Object.keys(langResult);
    return langResult;
}
const fetchtech = async (empId) => {
    var techRecords = await selectTech(empId);
    var techResult = techRecords.reduce((accu, techObj) => {
        var tech = techObj.tech
        if (!accu[tech]) {
            accu[tech] = ''
        }
        accu[tech] = techObj.level_e
        return accu;
    }, {})
    techResult['tech'] = Object.keys(techResult);
    return techResult;
}

const selectTech = (empId) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from Tech_ability where eid='${empId}'`
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const selectLang = (empId) => {
    return new Promise((resolve, reject) => {
        var sql = `select * from Language_known where eid='${empId}'`
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const fetchALLDAta = () => {
    return new Promise((resolve, reject) => {
        var sql = `SELECT * FROM Emp_Master;`;
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return reject(err)
            }
            return resolve(result)
        })
    })
}
const updateBasic = (jsonObj) => {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE Emp_Master
        SET eid = '${jsonObj.eid}', 
        fname = '${jsonObj.fname}', 
        lname = '${jsonObj.lname}', 
        email = '${jsonObj.email}', 
        phone = '${jsonObj.phone}', 
        gender = '${jsonObj.gender}', 
        deg = '${jsonObj.designation}', 
        rstatus = '${jsonObj.rstatus}', 
        dob = '${jsonObj.dob}', 
        address = '${jsonObj.add1}', 
        pref_loc = '${jsonObj.pref_loc}', 
        notice_prd_days = '${jsonObj.not_pir}', 
        e_ctc = '${jsonObj.e_ctc}', 
        c_ctc = '${jsonObj.c_ctc}', 
        dept = '${jsonObj.dept}',
        cityid = '${jsonObj.city}', 
        stateid = '${jsonObj.state}', 
        zipcode = '${jsonObj.zipcode}' 
        WHERE eid = '${jsonObj.eid}';
        `
        con.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    })
}
const updateEDU = (jsonObj) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < jsonObj.eduid.length; i++) {
            if (jsonObj.eduid[i] != '') {
                if (jsonObj.isdelEdu[i] != 'Deleted') {
                    var sql = `UPDATE education
                            SET course = '${jsonObj.course[i]}',
                            pass_year = '${jsonObj.pass_year[i]}',
                            per = '${jsonObj.perc[i]}'
                            WHERE eduid = '${jsonObj.eduid[i]}';`
                    con.query(sql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                    })
                } else {
                    var sql = `delete from education WHERE eduid = '${jsonObj.eduid[i]}';`
                    con.query(sql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                    })
                }
            }
            if (jsonObj.eduid[i] == '' && jsonObj.isdelEdu[i] != 'Deleted' && jsonObj.course[i] != '') {
                var sql = `Insert into education (eid,course,pass_year,per) 
                        values ('${jsonObj.eid}','${jsonObj.course[i]}','${jsonObj.pass_year[i]}','${jsonObj.perc[i]}')`
                con.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                })
            }
        }
        return resolve()
    })
}
const updateWork = (jsonObj) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < jsonObj.comid.length; i++) {
            if (jsonObj.comid[i] != '') {
                if (jsonObj.isDelCom[i] != 'Deleted') {
                    var sql = `UPDATE New_workexp
                            SET comp_name = '${jsonObj.com_name[i]}',
                            designation = '${jsonObj.deg_name[i]}',
                            from_d = '${jsonObj.exp_from[i]}',
                            to_d = '${jsonObj.exp_to[i]}'
                            WHERE workid = '${jsonObj.comid[i]}';`
                    con.query(sql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                    })
                } else {
                    var sql = `delete from New_workexp WHERE workid = '${jsonObj.comid[i]}';`
                    con.query(sql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                    })
                }
            }
            if (jsonObj.comid[i] == '' && jsonObj.isDelCom[i] != 'Deleted' && jsonObj.com_name[i] != '') {
                var sql = `Insert into New_workexp (eid,comp_name,designation,from_d,to_d) 
                        values ('${jsonObj.eid}','${jsonObj.com_name[i]}','${jsonObj.deg_name[i]}','${jsonObj.exp_from[i]}','${jsonObj.exp_to[i]}')`
                con.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                })
            }
        }
        return resolve()

    })
}
const updateRef = (jsonObj) => {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < jsonObj.contId.length; i++) {
            if (jsonObj.contId[i] != '') {
                if (jsonObj.isDelcont[i] != 'Deleted') {
                    var sql = `UPDATE EMP_Refrence
                            SET relation = '${jsonObj.cont_rel[i]}',
                            rname = '${jsonObj.cont_name[i]}',
                            rphone = '${jsonObj.cont_num[i]}'
                            WHERE redid = '${jsonObj.contId[i]}';`
                    con.query(sql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                    })
                } else {
                    var sql = `delete from EMP_Refrence WHERE redid = '${jsonObj.contId[i]}';`
                    con.query(sql, (err, result) => {
                        if (err) {
                            return reject(err)
                        }
                    })
                }
            }
            if (jsonObj.contId[i] == '' && jsonObj.isDelcont[i] != 'Deleted' && jsonObj.cont_name[i] != '') {
                var sql = `Insert into EMP_Refrence (eid,relation,rname,rphone) 
                        values ('${jsonObj.eid}','${jsonObj.cont_rel[i]}','${jsonObj.cont_name[i]}','${jsonObj.cont_num[i]}')`
                con.query(sql, (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                })
            }
        }
        return resolve()
    })
}
const updateLang = async (jsonObj) => {
    try {
        await deleteLang(jsonObj)
        await insertlang(jsonObj, jsonObj.eid);
    } catch (error) {
        console.log(err);
    }
}
const updateTech = async (jsonObj) => {
    try {
        await deletetech(jsonObj)
        await insertTech(jsonObj, jsonObj.eid)
    } catch (error) {
        console.log(error);
    }
}
const deleteLang = (jsonObj) => {
    return new Promise((resolve, reject) => {
        var sql = `delete FROM Language_known where eid='${jsonObj.eid}'; `
        con.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
        })
        return resolve()
    })
}
const deletetech = (jsonObj) => {
    return new Promise((resolve, reject) => {
        var sql = `delete FROM Tech_ability where eid='${jsonObj.eid}'; `
        con.query(sql, (err, result) => {
            if (err) {
                throw err;
            }
        })
        return resolve()
    })
}
module.exports = { insertRefrence, fetchALLDAta, updateBasic, updateLang, updateTech, updateEDU, updateWork, updateRef, fetchtech, fetchBasicDetails, fetchEducationDetails, fetchWorkDetails, fetchLanguage, fetchRefDetails, fetchStates, fetchCity, insertBasic, insertEDU, insertTech, insertWork, insertlang }

