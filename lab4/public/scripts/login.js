const form = document.querySelector('.register-form')
console.log(form)
const socket = io()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    login(e)
})

function login(e) {

    const formData = new FormData()
    formData.append('login', e.target.login.value)
    formData.append('password', e.target.psw.value)

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
        .then(data => {
            e.target.reset()
            console.log(data)
        })
        .catch(err => console.log(err))
}