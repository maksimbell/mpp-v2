const form = document.querySelector('.register-form')
console.log(form)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addCredentials(e)
})

function addCredentials(e) {

    const formData = new FormData()
    formData.append('login', e.target.login.value)
    formData.append('password', e.target.psw.value)

    fetch("register", {
            method: "POST",
            body: formData,
        })
        .then(res => res.json())
        .then(column => {
            e.target.reset()
            // columnSelector.insertBefore(newColumn(column), columnSelector.children[columnSelector.children.length - 1])
            // addListeners()
        })
        .catch(err => console.log(err))
}