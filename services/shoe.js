const Shoe = require('../models/Shoe');
const User = require('../models/User');

async function getAll() {
    return Shoe.find({});
}

async function search(query) {
    const title = query || '';
    return Shoe.find({ brand: new RegExp(`^${title}$`, 'i') });
}

async function getMyShoes(id){
    console.log(id)
    const shoes = await User.findById(id);
    const myCart = [];

    for(let id of shoes.myShoes){
        console.log(id)
        const shoe = await Shoe.findById(id);
        
        myCart.push(shoe);
    }

    return myCart;
}

async function create(shoe) {
    const result = new Shoe(shoe);

    await result.save();

    return result;
}

function getById(id) {
    return Shoe.findById(id);
}

async function update(id, shoe) {
    const existing = await Shoe.findById(id);

    existing.brand = shoe.brand;
    existing.model = shoe.model;
    existing.year = shoe.year;
    existing.img = shoe.img;
    existing.material = shoe.material;
    existing.price = shoe.price;
    existing.description = shoe.description;
    existing.size = shoe.size;
    existing.color = shoe.color;

    await existing.save();

    return existing;
}

async function deleteShoe(id){
    await Shoe.findByIdAndDelete(id);
}

async function toCart(userId, shoeId){
    const user = await User.findById(userId);
    user.myShoes.push(shoeId);
    await user.save();
}

async function removeCart(userId, shoeId){
    const user = await User.findById(userId);
    console.log('asdasd')
    const index = user.myShoes.indexOf(shoeId);
    user.myShoes.splice(index, 1);
    await user.save();
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteShoe,
    toCart,
    search,
    getMyShoes,
    removeCart
}