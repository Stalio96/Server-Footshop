const { model, Schema, Types: { ObjectId } } = require('mongoose');

const userSchema = new Schema({
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    myShoes: {type: [ObjectId], ref: 'Shoe'}
})

userSchema.index({email: 1}, {
    collation: {
        locale: 'en',
        strength: 1
    }
})

module.exports = model('User', userSchema);