let passwordbox = document.getElementById("passwordbox")
let generate = document.getElementById("generate")
let clear = document.getElementById("clear")
let copy = document.getElementById("copy")

generate.addEventListener("click", () => {
    let passwordLengths = document.getElementById("passwordLength").innerText
    let checkboxes = document.querySelectorAll('input[name="select"]:checked');
    let values = [];
    let finalString = "";
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    if (values.length == 0) {
        passwordbox.value = "You must select at least one character set!";
    }
    let Symbols = "`!@#$%^&*()_+<>?'][}{\"=\\|";
    let Numbers = "1234567890";
    let UppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let LowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";

    for (let i of values) {
        if (i == "Symbols") {
            finalString += Symbols
        } else if (i == "Numbers") {
            finalString += Numbers
        }
        else if (i == "UppercaseCharacters") {
            finalString += UppercaseCharacters
        }
        else if (i == "LowercaseCharacters") {
            finalString += LowercaseCharacters
        }
    }

    let passLength = +passwordLengths
    let finalPassword = "";
    let passLengthstring = finalString.length
    for (let i = 0; i < passLength; i++) {
        if (finalPassword == "undefined") {
            break
        }
        let randomnum = Math.floor(Math.random() * passLengthstring)
        finalPassword = finalPassword + "" + finalString[randomnum]

    }
    if (finalPassword != "undefined") {
        passwordbox.value = finalPassword
    }
})
clear.addEventListener("click", () => {
    passwordbox.value = ""
})

function displayAlert(icon,title){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,
        title: title
    })
}
copy.addEventListener("click", () => {
    if (passwordbox.value == "You must select at least one character set!") {
        displayAlert("error","You must select at least one character set!")
    }
    else if(passwordbox.value==""){
        displayAlert("error","Please Generate One Password First")
    } 
    else {
        navigator.clipboard.writeText(passwordbox.value)
        displayAlert("success","Password Copied Successfully")
    }

})
