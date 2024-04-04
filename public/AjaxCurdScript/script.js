var updateBtn;
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
function loadApiData() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/test", true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var statesArr = JSON.parse(this.responseText);
            var selectComponet = document.getElementById('stateselect');
            appendData(statesArr, selectComponet)
        }
    }
}
const workHtmlEle = `
                        <td>

                            <input type="hidden" name="comid[]">
                            <label for="com_name1">Company Name </label><input type="text" name="com_name[]"id="com_name1">
                        </td>
                        <td>

                            <label for="deg_name1">Designation </label><input type="text" name="deg_name[]"id="deg_name1">
                        </td>
                        <td>

                            <label for="exp_from1">From</label><input type="text" name="exp_from[]" id="exp_from1">
                        </td>
                        <td>
                            <label for="exp_to1">To</label> <input type="text" name="exp_to[]" id="exp_to1">
                            <input type="hidden" name="isDelCom[]">
                            <p class="delBtn">Delete</p>

                        </td>
                    `
const refele =`         <td>
                            <input type="hidden" name="contId[]">
                            <label for="cont_name1">Name </label><input type="text" name="cont_name[]" id="cont_name1">

                        </td>
                        <td>
                            <label for="cont_num1">Contact number</label> <input type="text" name="cont_num[]"
                                id="cont_num1">

                        </td>
                        <td>
                            <label for="cont_rel1">Relation </label><input type="text" name="cont_rel[]" id="cont_rel1">
                            <input type="hidden" name="isDelcont[]">
                            <p class="delBtn">Delete</p>
                            <br><br>

                        </td>`
function addWorkexp(eleIdtoappend) {
    let tr = document.createElement('tr')
    tr.innerHTML = workHtmlEle.trim();
    document.getElementById(eleIdtoappend).appendChild(tr)
    adEventsToDel()
}
function addref(eleIdtoappend) {
    let tr = document.createElement('tr')
    tr.innerHTML = refele.trim();
    document.getElementById(eleIdtoappend).appendChild(tr)
    adEventsToDel()
}
if (id != null) {
    document.getElementById('submit').style.display = 'none'
    document.getElementById('submit').disabled = true;
    updateBtn = document.createElement('span')
    updateBtn.style.border = '1px solid black'
    updateBtn.style.cursor = "pointer";
    updateBtn.innerHTML = 'UPDATE'
    document.getElementById('lastField').appendChild(updateBtn)

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/getData?id=${id}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonObjtoBeUpdate = JSON.parse(this.responseText);
            fillData(jsonObjtoBeUpdate)
        }
    }
}

function fetchCity() {
    var selectComponet = document.getElementById('stateselect');
    var selectedState = selectComponet.value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `/cityfetch?state=${selectedState}`, true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var citieArr = JSON.parse(this.responseText);
            var selectComponet = document.getElementById('cityselect');
            selectComponet.innerHTML = '';
            appendData(citieArr, selectComponet)
        }
    }
}
function appendData(statesArr, selectComponet) {
    selectComponet.innerHTML = "<option value=''>Select</option>"
    statesArr.forEach(state => {
        var option = document.createElement('option')
        option.value = state.id;
        option.innerHTML = state.name;
        selectComponet.appendChild(option)
    });
}
const fillData = (jsonObjtoBeUpdate) => {
    document.getElementById('eid').value = jsonObjtoBeUpdate.eid
    document.getElementById('fname').value = jsonObjtoBeUpdate.fname
    document.getElementById('lname').value = jsonObjtoBeUpdate.lname
    document.getElementById('designation').value = jsonObjtoBeUpdate.deg
    document.getElementById('add1').value = jsonObjtoBeUpdate.address
    document.getElementById('email').value = jsonObjtoBeUpdate.email
    document.getElementById('phone').value = jsonObjtoBeUpdate.phone
    // document.getElementById('cityselect').value=jsonObjtoBeUpdate
    // document.getElementById('M').value=jsonObjtoBeUpdate
    // document.getElementById('F').value=jsonObjtoBeUpdate
    // document.getElementById('stateselect').value=jsonObjtoBeUpdate
    document.getElementById('rstatus').value = jsonObjtoBeUpdate.rstatus
    document.getElementById('zipcode').value = jsonObjtoBeUpdate.zipcode
    document.getElementById('dob').value = jsonObjtoBeUpdate.dob
    document.getElementById('pref_loc').value = jsonObjtoBeUpdate.pref_loc
    document.getElementById('not_pir').value = jsonObjtoBeUpdate.notice_prd_days
    document.getElementById('dept').value = jsonObjtoBeUpdate.dept
    document.getElementById('e_ctc').value = jsonObjtoBeUpdate.e_ctc
    document.getElementById('c_ctc').value = jsonObjtoBeUpdate.c_ctc

    if (jsonObjtoBeUpdate.gender == 'M') {
        document.getElementById('M').checked = true
    } else {
        document.getElementById('F').checked = true
    }
    document.getElementById('stateselect').value = jsonObjtoBeUpdate.stateid

    var i = 0;
    jsonObjtoBeUpdate.educationDetails.forEach(element => {
        var inpEduArr = document.getElementsByName('eduid[]')
        var inpcourseArr = document.getElementsByName('course[]')
        var inppassYearArr = document.getElementsByName('pass_year[]')
        var inpperArr = document.getElementsByName('perc[]')
        inpEduArr[i].value = element.eduid
        inpcourseArr[i].value = element.course
        inppassYearArr[i].value = element.pass_year
        inpperArr[i].value = element.per
        i++;
    });
    var i = 0;
    jsonObjtoBeUpdate.workDetails.forEach(element => {
        addWorkexp('workexp')
        var inpWorkid = document.getElementsByName('comid[]');
        var inpcomNameArr = document.getElementsByName('com_name[]')
        var inpdegNameArr = document.getElementsByName('deg_name[]')
        var inpexpNromArr = document.getElementsByName('exp_from[]')
        var inpexpNoArr = document.getElementsByName('exp_to[]')
        inpWorkid[i].value = element.workid
        inpcomNameArr[i].value = element.comp_name;
        inpdegNameArr[i].value = element.designation;
        inpexpNromArr[i].value = element.from_d;
        inpexpNoArr[i].value = element.to_d;
        i++;
    })
    var i = 0;
    jsonObjtoBeUpdate.refDetails.forEach(element => {
        addref('ref')
        var contIdArr = document.getElementsByName('contId[]')
        var cont_nameArr = document.getElementsByName('cont_name[]')
        var cont_numArr = document.getElementsByName('cont_num[]')
        var cont_relArr = document.getElementsByName('cont_rel[]')

        contIdArr[i].value = element.redid
        cont_nameArr[i].value = element.rname
        cont_numArr[i].value = element.rphone
        cont_relArr[i].value = element.relation
        i++;
    })
    var langArr = document.getElementsByName('language[]');
    var hindArr = document.getElementsByName('h_ability[]');
    var gujArr = document.getElementsByName('g_ability[]');
    var engArr = document.getElementsByName('e_ability[]');
    langArr.forEach(langele => {
        if (jsonObjtoBeUpdate.languages.includes(langele.value)) {
            langele.checked = true;
            switch (langele.value) {
                case 'hindi':
                    hindArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.hindi.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;
                case 'gujarati':
                    gujArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.gujarati.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;
                case 'english':
                    engArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.english.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;

                default:
                    break;
            }
        }
    })
    var techKnownArr = document.getElementsByName('tech_known[]')
    var php_abilityArr = document.getElementsByName('php_ability')
    var mysql_abilityArr = document.getElementsByName('mysql_ability')
    var laravel_abilityArr = document.getElementsByName('laravel_ability')
    var oracle_abilityArr = document.getElementsByName('oracle_ability')
    techKnownArr.forEach(tech => {
        if (jsonObjtoBeUpdate.tech.includes(tech.value)) {
            tech.checked = true
            switch (tech.value) {
                case 'php':
                    php_abilityArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.php.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;
                case 'mysql':
                    mysql_abilityArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.mysql.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;
                case 'laravel':
                    laravel_abilityArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.laravel.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;
                case 'oracle':
                    oracle_abilityArr.forEach(ability => {
                        if (jsonObjtoBeUpdate.oracle.includes(ability.value)) {
                            ability.checked = true
                        }
                    })
                    break;

                default:
                    break;
            }
        }
    })
}
document.getElementById('myFrom').addEventListener('submit', function (event) {
    event.preventDefault()
    const formData = new FormData(this);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/submit')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById('list').innerHTML = '<a href="/tasks/JobAppWithAjax"><button>ALL EMP</button></a>'
        }
    }
    xhr.send(new URLSearchParams(formData).toString())
})

var fieldsets = document.getElementsByTagName('fieldset')
var current = 0;
var arrowLeft = document.getElementById("prevbtn"),
    arrowRight = document.getElementById("nextbtn");
reset();
fieldsets[0].style.display = "block";
arrowLeft.disabled = true
function reset() {
    for (let i = 0; i < fieldsets.length; i++) {
        fieldsets[i].style.display = "none";
    }
}
arrowLeft.addEventListener("click", function () {
    if (current === 0) {
        return
    }
    slideLeft();
});

// Right arrow click
arrowRight.addEventListener("click", function () {
    if (validateForm()) {
        if (current === fieldsets.length - 1) {
            return
        }
        slideRight();
    }
});

function slideLeft() {
    reset();
    current--;
    if (current === 0) {
        arrowLeft.disabled = true;
    }
    if (current < fieldsets.length - 1) {
        arrowRight.disabled = false;
    }
    fieldsets[current].style.display = "block";
}

// Show next
function slideRight() {
    reset();
    current++;
    if (current > 0) {
        arrowLeft.disabled = false
    }
    if (current === fieldsets.length - 1) {
        arrowRight.disabled = true;
    }
    fieldsets[current].style.display = "block";
}
const adEventsToDel = () => {
    var DelBtnArr = document.getElementsByClassName('delBtn');
    for (let i = 0; i < DelBtnArr.length; i++) {
        DelBtnArr[i].addEventListener('click', (event) => {
            var delbtn = event.target;
            delbtn.style.cursor = "pointer";
            delbtn.previousElementSibling.value = "Deleted";
            delbtn.parentElement.parentElement.style.display = 'none';
            delbtn.parentElement.parentElement.getElementsByTagName('input')[1].value = ''
        })
    }
}
adEventsToDel()
if (id != null) {
    updateBtn.addEventListener('click', function () {
        const formData = new FormData(document.getElementById('myFrom'));
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/submitUpdate')
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById('list').innerHTML = '<a href="/tasks/JobAppWithAjax"><button>ALL EMP</button></a>'
                console.log(this.responseText);
            }
        }
        xhr.send(new URLSearchParams(formData).toString())
    })
}
const validateForm = () => {
    var isValid = true;
    var regName = /^[a-zA-Z]+$/;
    var addressReg = /^[a-zA-Z0-9\s,'-]+$/;
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneReg = /^[0-9]{10}$/;
    var dateReg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])\s{0,1}$/;
    var yearReg = /^\d{4}$/;
    var zipReg = /^\d{6}$/;
    var perReg = /^\d+(\.\d+)?$/;

    var fnameinp = document.getElementById('fname')
    var lname = document.getElementById('lname');
    var add1 = document.getElementById('add1');
    var email = document.getElementById('email');
    var phone = document.getElementById('phone');
    var dob = document.getElementById('dob');
    var designation = document.getElementById('designation');
    var zipcode = document.getElementById('zipcode')
    var not_pir = document.getElementById('not_pir');
    var e_ctc = document.getElementById('e_ctc');
    var c_ctc = document.getElementById('c_ctc');

    if (regName.test(fnameinp.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Fname")
        if (fnameinp.parentElement.lastChild.nodeType == 3) {
            fnameinp.parentElement.removeChild(fnameinp.parentElement.lastChild);
        }
        fnameinp.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (fnameinp.parentElement.lastChild.nodeType == 3) {
            fnameinp.parentElement.removeChild(fnameinp.parentElement.lastChild);
        }
    }
    if (regName.test(lname.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Lname")
        if (lname.parentElement.lastChild.nodeType == 3) {
            lname.parentElement.removeChild(lname.parentElement.lastChild);
        }
        lname.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (lname.parentElement.lastChild.nodeType == 3) {
            lname.parentElement.removeChild(lname.parentElement.lastChild);
        }
    }
    if (addressReg.test(add1.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Address!")
        if (add1.parentElement.lastChild.nodeType == 3) {
            add1.parentElement.removeChild(add1.parentElement.lastChild);
        }
        add1.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (add1.parentElement.lastChild.nodeType == 3) {
            add1.parentElement.removeChild(add1.parentElement.lastChild);
        }
    }
    if (emailReg.test(email.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Email Address!")
        if (email.parentElement.lastChild.nodeType == 3) {
            email.parentElement.removeChild(email.parentElement.lastChild);
        }
        email.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (email.parentElement.lastChild.nodeType == 3) {
            email.parentElement.removeChild(email.parentElement.lastChild);
        }
    }
    if (phoneReg.test(phone.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Phone!")
        if (phone.parentElement.lastChild.nodeType == 3) {
            phone.parentElement.removeChild(phone.parentElement.lastChild);
        }
        phone.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (phone.parentElement.lastChild.nodeType == 3) {
            phone.parentElement.removeChild(phone.parentElement.lastChild);
        }
    }
    if (dateReg.test(dob.value) == false) {
        var errmsg = document.createTextNode("Enter Valid DOB!")
        if (dob.parentElement.lastChild.nodeType == 3) {
            dob.parentElement.removeChild(dob.parentElement.lastChild);
        }
        dob.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (dob.parentElement.lastChild.nodeType == 3) {
            dob.parentElement.removeChild(dob.parentElement.lastChild);
        }
    }
    if (regName.test(designation.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Deg")
        if (designation.parentElement.lastChild.nodeType == 3) {
            designation.parentElement.removeChild(designation.parentElement.lastChild);
        }
        designation.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (designation.parentElement.lastChild.nodeType == 3) {
            designation.parentElement.removeChild(designation.parentElement.lastChild);
        }
    }
    if (zipReg.test(zipcode.value) == false) {
        var errmsg = document.createTextNode("Enter Valid Zipcode")
        if (zipcode.parentElement.lastChild.nodeType == 3) {
            zipcode.parentElement.removeChild(zipcode.parentElement.lastChild);
        }
        zipcode.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (zipcode.parentElement.lastChild.nodeType == 3) {
            zipcode.parentElement.removeChild(zipcode.parentElement.lastChild);
        }
    }
    if (document.getElementById("M").checked == true || document.getElementById("F").checked == true) {
        // isValid = true;
        document.getElementById('gandermsg').innerHTML = '';
    } else {
        document.getElementById('gandermsg').innerHTML = 'Plz fill!';
        isValid = false;
    }
    if (stateselect.value == '') {
        var errmsg = document.createTextNode("Enter Valid State")
        if (stateselect.parentElement.lastChild.nodeType == 3) {
            stateselect.parentElement.removeChild(stateselect.parentElement.lastChild);
        }
        stateselect.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (stateselect.parentElement.lastChild.nodeType == 3) {
            stateselect.parentElement.removeChild(stateselect.parentElement.lastChild);
        }
    }
    if (cityselect.value == '') {
        var errmsg = document.createTextNode("Enter Valid City")
        if (cityselect.parentElement.lastChild.nodeType == 3) {
            cityselect.parentElement.removeChild(cityselect.parentElement.lastChild);
        }
        cityselect.parentElement.appendChild(errmsg);
        isValid = false;
    } else {
        if (cityselect.parentElement.lastChild.nodeType == 3) {
            cityselect.parentElement.removeChild(cityselect.parentElement.lastChild);
        }
    }
    if (current == 1) {
        var courseArr = document.getElementsByName('course[]');
        var passYearArr = document.getElementsByName('pass_year[]');
        var percArr = document.getElementsByName('perc[]');

        for (let i = 0; i < courseArr.length; i++) {
            if (courseArr[i].value != '') {
                if (regName.test(courseArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Course")
                    isValid = false;
                    if (courseArr[i].parentElement.lastChild.nodeType == 3) {
                        courseArr[i].parentElement.removeChild(courseArr[i].parentElement.lastChild);
                    }
                    courseArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (courseArr[i].parentElement.lastChild.nodeType == 3) {
                        courseArr[i].parentElement.removeChild(courseArr[i].parentElement.lastChild);
                    }
                }
                if (yearReg.test(passYearArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Year")
                    isValid = false;
                    if (passYearArr[i].parentElement.lastChild.nodeType == 3) {
                        passYearArr[i].parentElement.removeChild(passYearArr[i].parentElement.lastChild);
                    }
                    passYearArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (passYearArr[i].parentElement.lastChild.nodeType == 3) {
                        passYearArr[i].parentElement.removeChild(passYearArr[i].parentElement.lastChild);
                    }
                }
                if (perReg.test(percArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Percentage")
                    isValid = false;
                    if (percArr[i].parentElement.lastChild.nodeType == 3) {
                        percArr[i].parentElement.removeChild(percArr[i].parentElement.lastChild);
                    }
                    percArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (percArr[i].parentElement.lastChild.nodeType == 3) {
                        percArr[i].parentElement.removeChild(percArr[i].parentElement.lastChild);
                    }
                }
            }
        }
    }
    if (current == 2) {
        var compArr = document.getElementsByName('com_name[]');
        var degArr = document.getElementsByName('deg_name[]');
        var expfromArr = document.getElementsByName('exp_from[]');
        var exptoArr = document.getElementsByName('exp_to[]');

        for (let i = 0; i < compArr.length; i++) {
            if (compArr[i].value != '') {
                if (regName.test(compArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Comp")
                    isValid = false;
                    if (compArr[i].parentElement.lastChild.nodeType == 3) {
                        compArr[i].parentElement.removeChild(compArr[i].parentElement.lastChild);
                    }
                    compArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (compArr[i].parentElement.lastChild.nodeType == 3) {
                        compArr[i].parentElement.removeChild(compArr[i].parentElement.lastChild);
                    }
                }
                if (regName.test(degArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid deg")
                    isValid = false;
                    if (degArr[i].parentElement.lastChild.nodeType == 3) {
                        degArr[i].parentElement.removeChild(degArr[i].parentElement.lastChild);
                    }
                    degArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (degArr[i].parentElement.lastChild.nodeType == 3) {
                        degArr[i].parentElement.removeChild(degArr[i].parentElement.lastChild);
                    }
                }
                if (dateReg.test(expfromArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Date")
                    isValid = false;
                    if (expfromArr[i].parentElement.lastChild.nodeType == 3) {
                        expfromArr[i].parentElement.removeChild(expfromArr[i].parentElement.lastChild);
                    }
                    expfromArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (expfromArr[i].parentElement.lastChild.nodeType == 3) {
                        expfromArr[i].parentElement.removeChild(expfromArr[i].parentElement.lastChild);
                    }
                }
                if (dateReg.test(exptoArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Date")
                    isValid = false;
                    if (exptoArr[i].parentElement.lastChild.nodeType == 3) {
                        exptoArr[i].parentElement.removeChild(exptoArr[i].parentElement.lastChild);
                    }
                    exptoArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (exptoArr[i].parentElement.lastChild.nodeType == 3) {
                        exptoArr[i].parentElement.removeChild(exptoArr[i].parentElement.lastChild);
                    }
                }
            }
        }
    }
    if (current == 5) {
        var contNameArr = document.getElementsByName('cont_name[]');
        var contnumberArr = document.getElementsByName('cont_num[]');
        var relArr = document.getElementsByName('cont_rel[]');

        for (let i = 0; i < contNameArr.length; i++) {
            if (contNameArr[i].value != '') {
                if (regName.test(contNameArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Name")
                    isValid = false;
                    if (contNameArr[i].parentElement.lastChild.nodeType == 3) {
                        contNameArr[i].parentElement.removeChild(contNameArr[i].parentElement.lastChild);
                    }
                    contNameArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (contNameArr[i].parentElement.lastChild.nodeType == 3) {
                        contNameArr[i].parentElement.removeChild(contNameArr[i].parentElement.lastChild);
                    }
                }
                if (phoneReg.test(contnumberArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Phone")
                    isValid = false;
                    if (contnumberArr[i].parentElement.lastChild.nodeType == 3) {
                        contnumberArr[i].parentElement.removeChild(contnumberArr[i].parentElement.lastChild);
                    }
                    contnumberArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (contnumberArr[i].parentElement.lastChild.nodeType == 3) {
                        contnumberArr[i].parentElement.removeChild(contnumberArr[i].parentElement.lastChild);
                    }
                }
                if (regName.test(relArr[i].value) == false) {
                    var errmsg = document.createTextNode("Enter Valid Relation")
                    isValid = false;
                    if (relArr[i].parentElement.lastChild.nodeType == 3) {
                        relArr[i].parentElement.removeChild(relArr[i].parentElement.lastChild);
                    }
                    relArr[i].parentElement.appendChild(errmsg);
                } else {
                    if (relArr[i].parentElement.lastChild.nodeType == 3) {
                        relArr[i].parentElement.removeChild(relArr[i].parentElement.lastChild);
                    }
                }
            }
        }
    }
    var h_abilityArr = document.getElementsByName('h_ability[]')
    var g_abilityArr = document.getElementsByName('g_ability[]')
    var e_abilityArr = document.getElementsByName('e_ability[]')

    var php_abilityArr = document.getElementsByName('php_ability');
    var mysql_abilityArr = document.getElementsByName('mysql_ability');
    var laravel_abilityArr = document.getElementsByName('laravel_ability');
    var oracle_abilityArr = document.getElementsByName('oracle_ability');

    var h_langCheckBox = document.getElementById('hindi');
    var g_langCheckBox = document.getElementById('gujarati');
    var e_langCheckBox = document.getElementById('english');

    var tech_known1Checkbox = document.getElementById('php');
    var tech_known2Checkbox = document.getElementById('mysql');
    var tech_known3Checkbox = document.getElementById('laravel');
    var tech_known4Checkbox = document.getElementById('oracle');


    if (current == 3) {
        var languageArr = document.getElementsByName('language[]');
        var isChecked = false;
        languageArr.forEach(lang => {
            if (lang.checked) {
                isChecked = true;
            }
        })
        if (isChecked == false) {
            document.getElementById('langmsg').innerHTML = "Plz Select atleast one Language"
            isValid = false
        } else {
            document.getElementById('langmsg').innerHTML = ''
        }
        var isHindi = false;
        if (h_langCheckBox.checked) {
            for (let i = 0; i < h_abilityArr.length; i++) {
                if (h_abilityArr[i].checked == false) {
                    isHindi = false;
                } else {
                    isHindi = true;
                    break;
                }
            }
            if (isHindi == false) {
                isValid = false;
                document.getElementById('langmsg').innerHTML = 'plz select Hindi abililty';
            }
        }
        var isGujarati = false
        if (g_langCheckBox.checked) {
            for (let i = 0; i < g_abilityArr.length; i++) {
                if (g_abilityArr[i].checked == false) {
                    isGujarati = false;
                } else {
                    isGujarati = true;
                    break;
                }
            }
            if (isGujarati == false) {
                isValid = false;
                document.getElementById('langmsg').innerHTML = 'plz select Gujarati abililty';
            }
        }
        var isEnglish = false
        if (e_langCheckBox.checked) {
            for (let i = 0; i < e_abilityArr.length; i++) {
                if (e_abilityArr[i].checked == false) {
                    isEnglish = false;
                } else {
                    isEnglish = true;
                    break;
                }
            }
            if (isEnglish == false) {
                isValid = false;
                document.getElementById('langmsg').innerHTML = 'plz select English abililty';
            }
        }
    }
    if (current == 4) {
        var tech_knownArr = document.getElementsByName('tech_known[]')
        var techIsChecked = false;
        tech_knownArr.forEach(tech => {
            if (tech.checked) {
                techIsChecked = true;
            }
        })
        if (techIsChecked == false) {
            document.getElementById('tech_msg').innerHTML = "Plz Select atleast one Tech"
            isValid = false
        } else {
            document.getElementById('tech_msg').innerHTML = ''
        }
        var isPHP = false
        if (tech_known1Checkbox.checked) {
            for (let i = 0; i < php_abilityArr.length; i++) {
                if (php_abilityArr[i].checked == false) {
                    isPHP = false;
                } else {
                    isPHP = true;
                    break;
                }
            }
            if (isPHP == false) {
                isValid = false;
                document.getElementById('tech_msg').innerHTML = 'plz select abililty';
            }
        }
        var isMysql = false
        if (tech_known2Checkbox.checked) {
            for (let i = 0; i < mysql_abilityArr.length; i++) {
                if (mysql_abilityArr[i].checked == false) {
                    isMysql = false;
                } else {
                    isMysql = true;
                    break;
                }
            }
            if (isMysql == false) {
                isValid = false;
                document.getElementById('tech_msg').innerHTML = 'plz select abililty';
            }

        }
        var isLaravel = false
        if (tech_known3Checkbox.checked) {
            for (let i = 0; i < laravel_abilityArr.length; i++) {
                if (laravel_abilityArr[i].checked == false) {
                    isLaravel = false;
                } else {
                    isLaravel = true;
                    break;
                }
            }
            if (isLaravel == false) {
                isValid = false;
                document.getElementById('tech_msg').innerHTML = 'plz select abililty';
            }
        }
        var isOracle = false
        if (tech_known4Checkbox.checked) {
            for (let i = 0; i < mysql_abilityArr.length; i++) {
                if (mysql_abilityArr[i].checked == false) {
                    isOracle = false;
                } else {
                    isOracle = true;
                    break;
                }
            }
            if (isOracle == false) {
                isValid = false;
                document.getElementById('tech_msg').innerHTML = 'plz select abililty';
            }
        }
    }
    return isValid;
}