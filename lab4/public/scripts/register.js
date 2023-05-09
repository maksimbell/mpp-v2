const regForm = document.querySelector('.register-form')
console.log(window.socket)
socket.on('auth:register', registerHandler)

regForm.addEventListener('submit', (e) => {
    e.preventDefault()
    register(e)
})

function register(e) {

    const newUser = {
        login: e.target.login.value,
        password: e.target.psw.value
    }

    socket.emit('auth:register', newUser)
    e.target.reset()
}

function registerHandler(user) {
    if (user)
        console.log('registered')
}