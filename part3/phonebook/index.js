const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

app.use(express.json())

morgan.token('req-body' , function (req, res) {
    return Object.keys(req.body).length === 0
        ? null
        : JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

var persons = [
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
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const range = 1000
    return Math.floor(Math.random() * range)
}

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const now = new Date()
    res.send(`Phonebook has info for ${persons.length} people \
    <br/><br/> ${now}`)
})

app.get('/api/persons/:id' , (req, res) => {
    const id = Number(req.params.id)
    const person =  persons.find( person => person.id === id)

    if (person) { 
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter( person => person.id !== id )
    res.status(204).end()
})


app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({ 
            error : 'name missing' 
        })
    }

    if (!body.number) {
        return res.status(400).json({ 
            error : 'number missing' 
        })
    }

    const exist = persons.find( person => person.name.toLowerCase() === body.name.toLowerCase())

    if (exist) {
        return res.status(409).json({
            error : 'name must be unique'
        })
    }

    const id = generateId()

    const person = {
        id: id,
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)

    res.json(person)
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
