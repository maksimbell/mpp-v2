const columnSelector = document.querySelector('.columns')

async function getBoard() {

    const res = await fetch('board/get', {
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
                    <form action="/board/add-column" method="POST">
                        <textarea class="card card__content input__add-card" type="text" name="columnName"
                            placeholder="Enter column name"></textarea>
                        <input class="button__add-card" value="Add column" type="submit" />
                    </form>
                </div>
            </div>`
        })

    }
}

function newColumn(data){
    const container = document.createElement('div')
    container.classList.add('column')
    container.classList.add('university-column')

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

    container.innerHTML += 
    `<div class="clickable-card">
        <form action="/board/add-card/${data.id}" method="POST" enctype="multipart/form-data">
            <textarea class="card card__content input__add-card" type="text" name="content"
                placeholder="Enter heading"></textarea>
            <input class="button__add-card" value="Add card" type="submit" />
            <label class="input-file">
                <input type="file" name="uploaded" id="file_input_1">
                <span id="file_span_1">Choose file</span>
            </label>
        </form>
    </div>`

    console.log(container)

    return container
}

function newCard(card){
    const container = document.createElement('div')
    container.classList.add('clickable-card')
    container.classList.add('card')

    container.innerHTML += `<a class="clickable-card__link" href="/board/open-card/${card.id}"></a>`
    if(card.file)
        container.innerHTML += `<a class="card__content download-file" href="/files/${card.file}" download="">Attached file</a>`

    const name = document.createElement('p')
    name.classList.add('card__content')
    name.textContent = card.content
    container.appendChild(name)

    return container
}

getBoard()