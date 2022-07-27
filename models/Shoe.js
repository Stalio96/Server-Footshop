const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: String, required: true },
    img: { type: String, required: true },
    material: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    size: { type: String },
    color: { type: String },
    owner: { type: ObjectId, ref: 'User'}
}, { timestamps: { createdAt: 'created_at' } });

module.exports = model('Shoe', schema);