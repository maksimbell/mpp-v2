const columnSelector = document.querySelector('.columns')

async function getBoard() {

    const res = await fetch('board/columns', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    })

    if (res.ok) {
        res.json().then(board => {
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
        })
    }
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
            <input type="file" name="uploaded" id="file_input_1">
            <span id="file_span_1">Choose file</span>
        </label>`

    formDiv.appendChild(form)
    container.appendChild(formDiv)

    return container
}

async function addCard(e) {
    const id = e.target.id.slice(4, e.target.id.length)
    const form = document.querySelector(`#form${id}`)

    const currentColumn = document.querySelector(`#col${id}`)
    console.log(currentColumn)

    const card = {
        id,
        content: form.content.value,
    }

    form.reset();
    currentColumn.insertBefore(newCard(card), currentColumn.children[currentColumn.children.length - 1])

    const res = await fetch("board/card", {
        method: "POST",
        // x-www-form-urlencoded
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(card)
    });

    if (res.ok === true) {
        const user = await response.json();
    }
}

async function addColumn(e) {

    const column = {
        id: columnSelector.children.length - 1,
        name: e.target.columnName.value,
        cards: [],
    }
    console.log(column)

    e.target.reset();
    columnSelector.insertBefore(newColumn(column), columnSelector.children[columnSelector.children.length - 1])

    const res = await fetch("board/column", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(column)
    });

    if (res.ok === true) {
        const user = await response.json();
    }
}

function newCard(card) {
    const container = document.createElement('div')
    container.classList.add('clickable-card')
    container.classList.add('card')

    container.innerHTML += `<a class="clickable-card__link" href="/board/open-card/${card.id}"></a>`
    if (card.file)
        container.innerHTML += `<a class="card__content download-file" href="/files/${card.file}" download="">Attached file</a>`

    const name = document.createElement('p')
    name.classList.add('card__content')
    name.textContent = card.content
    container.appendChild(name)

    return container
}

function addListeners() {
    const forms = document.querySelectorAll('.cardForm')
    console.log(forms)

    for (let form of forms) {
        console.log(form)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            console.log('neq card submitted')
            addCard(e)
        })
    }

    const newColumnForm = document.querySelector('.newColumnForm')
    newColumnForm.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('new column submitted')
        addColumn(e)
    })
}

getBoard()