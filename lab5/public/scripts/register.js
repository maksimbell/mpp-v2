const regForm = document.querySelector('.register-form')

regForm.addEventListener('submit', (e) => {
    e.preventDefault()
    register(e)
})

function register(e) {

    const newUser = {
        login: e.target.login.value,
        password: e.target.psw.value
    }

    e.target.reset()
}

function registerHandler(user) {
    if (user)
        console.log('registered')
}