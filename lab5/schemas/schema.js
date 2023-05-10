import {
    buildSchema
} from 'graphql'

export default buildSchema(`
type Card {
    id: ID,
    content: String
}

type Column {
    id: ID,
    name: String,
    cards: [Card]
}

type Board {
    name: String,
    columns: [Column]
}

type Query {
  hello: String,
  getBoard: Board,
}

type Mutation {
    addCard(colId: ID, content: String): Card
    addColumn(colId: ID, name: String): Column
    deleteColumn(colId: ID): ID
}
`)