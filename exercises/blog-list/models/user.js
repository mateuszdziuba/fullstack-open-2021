const mognoose = require('mongoose')

const userSchema = new mognoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  notes: [
    {
      type: mognoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User