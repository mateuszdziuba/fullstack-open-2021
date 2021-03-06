const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.vfva7.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url)


const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean,
})

Note.find({ important: true }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})