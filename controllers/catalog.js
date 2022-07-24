const router = require('express').Router();
const { isAuth, isOwner } = require('../middleweares/guards');
const preload = require('../middleweares/preload');
const api = require('../services/shoe');
const mapErrors = require('../utils/mapper');
const { getUser } = require('../utils/storage');

router.get('/profile/:id', async (req, res) => {
    const user = {
        userId: req.params.id
    }
    const data = await api.getMyShoes(user.userId);
    console.log(data);
    res.json(data);
});

router.get('/all', async (req, res) => {
    console.log(req.session.user);
    const data = await api.getAll();
    res.json(data);
});

router.post('/create', isAuth(), async (req, res) => {
    const shoe = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        img: req.body.img,
        material: req.body.material,
        price: req.body.price,
        description: req.body.description,
        size: req.body.size,
        color: req. body.color,
        owner: req.session.user,
        created_at: Date.now()
    }

    try {
        const result = await api.create(shoe);
        res.status(201).json(result);
    } catch (err) {
        const error = mapErrors(err).map(e => e.msg).join('\n');
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.get('/detail/:id', preload(), (req, res) => {
    const shoe = res.locals.item;
    res.json(shoe);
});

router.put('/edit/:id', preload(), isOwner(), async (req, res) => {
    const shoeId = req.params.id;
    const shoe = {
        brand: req.body.brand,
        model: req.body.model,
        year: req.body.year,
        img: req.body.img,
        material: req.body.material,
        price: req.body.price,
        description: req.body.description,
        size: req.body.size,
        color: req. body.color,
        owner: req.session.user
    }

    try {
        const result = await api.update(shoeId, shoe);
        res.json(result);
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: error });
    }
    res.end();
});

router.delete('/delete/:id', preload(), async (req, res) => {
    try {
        const shoeId = req.params.id;
        await api.deleteShoe(shoeId);
        res.status(204).end();
    } catch (err) {
        const error = mapErrors(err).join('\n');
        console.error(err.message);
        res.status(400).json({ message: error });
    }
});

router.post('/toCart/:id', preload(), async (req, res) => {
    const shoe = {
        owner: req.session.user
    }

    await api.toCart(shoe.owner, req.params.id);
});

router.post('/removeCart/:id', preload(), async (req, res) => {
    const shoe = {
        owner: req.session.user
    }

    await api.removeCart(shoe.owner, req.params.id);
});

router.get('/search', async (req, res) => {
    const brand = req.query.brand
    const data = await api.search(brand);
    res.json(data);
})

module.exports = router;