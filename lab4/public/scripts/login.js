const logForm = document.querySelector('.login-form')
socket.on('auth:login', loginHandler)

logForm.addEventListener('submit', (e) => {
    e.preventDefault()
    login(e)
})

function login(e) {

    const user = {
        login: e.target.logLogin.value,
        password: e.target.logPsw.value
    }
    
    console.log('sent')
    socket.emit('auth:login', user)
}

function loginHandler(token) {
    console.log('token is ready on client')
    socket.auth = {
        token
    }

    socket.emit('wtf', 'smth')
    // socket.disconnect()
    // socket.socket.connect()
}