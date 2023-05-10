const logForm = document.querySelector('.login-form')
console.log(logForm)

logForm.addEventListener('submit', (e) => {
    e.preventDefault()
    login(e)
})

function login(e) {

    fetch("login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: e.target.login.value,
                password: e.target.psw.value,
            }),
        })
        .then(res => res.json())
        .then(json => {
            if (json.message) {
                alert('400: ' + json.message)
            } else {
                document.cookie = "jwt=" + json.token
                window.location.replace(window.location.origin + '/board')
            }
        })
        .catch(err => console.log(err))
}