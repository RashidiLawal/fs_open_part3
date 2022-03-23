const express = require('express')
const { request, response } = require('express')
const app = express()
const cors = require('cors')
let morgan = require('morgan')

app.use(express.json())
morgan.token('body', (request, response) =>  JSON.stringify(request.body))
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


// app.use(morgan('tiny'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "040-123456"
    }
]

let info = [
    {
        "id": 1,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 2,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
]

app.get('/api/persons', (request, response) => {
    response.json(persons) 
    })

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) response.json(person) 
    else response.status(404).end()
    })

app.get('/info', (request, response) => {
    const phonebookLength = info.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${phonebookLength} people</p><p>${date}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const generateRandomId = () => {
    const maxNumber = 50

    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0

    const maxIdPlus = maxId + 1
    const randomId = Math.floor(Math.random() * (maxNumber - maxIdPlus) + maxIdPlus)
   
     return randomId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    const person = {
        name: body.name,
        number:body.number,
        date: new Date(),
        id: generateRandomId()
    }
    
    persons = persons.concat(person)
       
       response.json(person)
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`'It's my server'`)
})
