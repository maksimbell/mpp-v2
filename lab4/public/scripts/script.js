const columnSelector = document.querySelector('.columns')
const socket = io()
window.socket = socket

socket.on('board:get', getBoardHandler)
socket.on('board:addCard', addCardHandler)
socket.on('board:addColumn', addColumnHandler)
socket.on('board:deleteColumn', deleteColumnHandler)

function getBoard() {
    console.log('get board')
    socket.emit('board:get')
}

function tryAccess() {
    fetch('/attempt', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + document.cookie.split('; ')
                .find((row) => row.startsWith('jwt='))?.split('=')[1]
        }
    }).then(res => {
        // alert(res.status)
        if (res.status === 401) {
            window.location.href = window.location.origin + '/login';
        } else {
            getBoard()
        }
    })
}

function addCard(e) {
    const id = e.target.id.slice(4, e.target.id.length)

    const currentColumn = document.querySelector(`#col${id}`)

    const card = {
        id,
        content: e.target.content.value,
        file: e.target.uploaded.files[0]
    }

    socket.emit('board:addCard', card)
    e.target.reset()
}

function newColumn(data) {
    const container = document.createElement('div')
    container.classList.add('column')
    container.classList.add('university-column')
    container.id = `col${data.id}`

    const columnHeading = document.createElement('h3')
    columnHeading.textContent = data.name
    container.appendChild(columnHeading)

    const cardsDiv = document.createElement('div')
    cardsDiv.classList.add('column__cards')
    cardsDiv.classList.add('cards')

    container.appendChild(cardsDiv)

    for (let card of data.cards) {
        container.appendChild(newCard(card))
    }

    const formDiv = document.createElement('div')
    formDiv.classList.add('clickable-card')

    const form = document.createElement('form')
    form.classList.add('cardForm')

    form.id = 'form' + data.id
    form.innerHTML +=
        `<textarea class="card card__content input__add-card" type="text" name="content"
            placeholder="Enter heading"></textarea>
        <input id="${data.id}" class="button__add-card" value="Add card" type="submit"/>
        <label class="input-file">
            <input type="file" name="uploaded" id="file_input_${data.id}">
            <span class="file-span" id="file_span_${data.id}">Choose file</span>
        </label>
        <label class="input_delete-column">
            <input type="button" name="deleteCol">
            <span id="deleteCol${data.id}">Delete</span>
        </label>`

    formDiv.appendChild(form)
    container.appendChild(formDiv)

    return container
}

function addColumn(e) {
    const id = columnSelector.children.length < 2 ? 'col-1' : columnSelector.lastChild.previousSibling.id
    const newId = 1 + +id.slice(3, id.length)

    const column = {
        id: newId,
        name: e.target.columnName.value
    }

    socket.emit('board:addColumn', column)
    e.target.reset()
}

function deleteColumn(e) {
    const id = e.target.id.slice(9, e.target.id.length)
    socket.emit('board:deleteColumn', id)
}


function newCard(card) {
    const container = document.createElement('div')
    container.classList.add('clickable-card')
    container.classList.add('card')

    container.innerHTML += `<a class="clickable-card__link"></a>`

    if (card.file) {
        container.innerHTML += `<a class="card__content download-file" href="/files/${card.file.originalname}" download="">Attached file</a>`
        console.log(card.file)
    }

    const name = document.createElement('p')
    name.classList.add('card__content')
    name.textContent = card.content
    container.appendChild(name)

    return container
}

function addListeners() {
    const forms = document.querySelectorAll('.cardForm')

    for (const form of forms) {
        form.removeEventListener('submit', addCardCallback)
        form.addEventListener('submit', addCardCallback)
    }

    const newColumnForm = document.querySelector('.newColumnForm')
    newColumnForm.removeEventListener('submit', addColumnCallback)
    newColumnForm.addEventListener('submit', addColumnCallback)

    const deleteBtns = document.querySelectorAll('.input_delete-column')

    for (const btn of deleteBtns) {
        btn.removeEventListener('click', deleteColumnCallback)
        btn.addEventListener('click', deleteColumnCallback)
    }


    const fileInputs = document.querySelectorAll('.input-file input[type=file]')
    const fileSpans = document.querySelectorAll('.file-span')

    for (let i = 0; i < fileInputs.length; i++) {
        fileInputs[i].addEventListener('change', () => {
            const file = fileInputs[i].files[0]
            fileSpans[i].innerText = file.name.length < 9 ? file.name : file.name.slice(0, 7).padEnd(10, '.')
        })
    }
}

function addCardCallback(e) {
    e.preventDefault()
    console.log('new card')
    addCard(e)
}

function addColumnCallback(e) {
    e.preventDefault()
    console.log('new column')
    addColumn(e)
}

function deleteColumnCallback(e) {
    e.preventDefault()
    console.log('column delete')
    deleteColumn(e)
}

try {
    tryAccess()
    // if (tryAccess())
    // getBoard()
} catch (err) {
    console.log(err)
}

function getBoardHandler(board) {
    console.log(board)
    for (let col of board.columns) {
        columnSelector.appendChild(newColumn(col))
    }

    columnSelector.innerHTML +=
        `<div class="column">
        <div class="clickable-card">
            <form class="newColumnForm">
                <textarea class="card card__content input__add-card" type="text" name="columnName"
                    placeholder="Enter column name"></textarea>
                <input class="button__add-card" value="Add column" type="submit" />
            </form>
        </div>
    </div>`

    addListeners()
}

function addCardHandler(card) {
    const id = card.colId
    console.log(id)

    const currentColumn = document.querySelector(`#col${id}`)
    currentColumn.insertBefore(newCard(card), currentColumn.children[currentColumn.children.length - 1])
}

function addColumnHandler(column) {
    console.log(column)
    columnSelector.insertBefore(newColumn(column), columnSelector.children[columnSelector.children.length - 1])
    addListeners()
}

function deleteColumnHandler(columnId) {
    columnSelector.removeChild(columnSelector.querySelector(`#col${columnId}`))
}