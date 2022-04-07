const mongoose = require('mongoose')


const password = process.argv[2]
const nameToAdd = process.argv[3] 
const numberToAdd = process.argv[4] 

const url = `mongodb+srv://RasExer:${password}@exercise.hie0x.mongodb.net/Person?retryWrites=true&w=majority`


mongoose.connect(url)

const Person = mongoose.model('Person', personSchema)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})


const person = new Person({
    name: nameToAdd,
    number: numberToAdd
})



if (process.argv.length > 3) {
    Person.save().then(result => {
        console.log(`added ${result.name} number ${result.number}  to the phonebook`)
        mongoose.connection.close()
    })
   
} else {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(`Phonebook: ${person.name} ${person.number}`)
            mongoose.connection.close()
        })
       
    })
    
}

require('events').EventEmitter.prototype._maxListeners = 100


