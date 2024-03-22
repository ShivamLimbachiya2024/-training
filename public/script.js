var activationCode;
var myFrom = document.getElementById('formField');
document.getElementById('registrationFrom').addEventListener('submit', async function (event) {
    event.preventDefault()
    const formdata = new FormData(this)
    const data = new URLSearchParams(formdata).toString();
    if (validation()) {
        const response = await fetch("/Register", {
            method: "POST",
            headers: {
                "content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/x-www-form-urlencoded"
            },
            body: data
        })
        var resData = await response.json()
        activationCode = resData.actCode;
        email = resData.email;
        if (resData.status == 200) {
            myFrom.removeChild(myFrom.lastChild)
            var linkBtn = document.createElement('a');
            linkBtn.innerHTML = `http://localhost:8080/passwordRender?actcode=${activationCode}&email=${email}`;
            linkBtn.setAttribute('href', `/passwordRender?actcode=${activationCode}&email=${email}`)
            document.getElementById('formField').appendChild(linkBtn)
        }
        if (resData.status == 400) {
            myFrom.removeChild(myFrom.lastChild)
            var errTxtNode = document.createTextNode("User already exist!")
            document.getElementById('formField').appendChild(errTxtNode)
        }
        this.reset()
    }
})
const validation = () => {
    var isValid = true
    var regName = /^[a-zA-Z]+$/;
    var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var phoneReg = /^[0-9]{10}$/;
    var dateReg = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    var fname = document.getElementById('fname')
    var lname = document.getElementById('lname')
    var dob = document.getElementById('dob')
    var email = document.getElementById('email')
    var phone = document.getElementById('phone')
    var stateselect = document.getElementById('stateselec')
    var cityselect = document.getElementById('cityselect')
    if (document.getElementById("M").checked == true || document.getElementById("F").checked == true) {
        // isValid = true;
    } else {
        isValid = false;
    }
    return isValid;
}
