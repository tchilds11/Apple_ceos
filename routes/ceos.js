const express = require('express'),
router = express.Router(),
ceosModel = require('../models/ceoModel'),
slugify = require('slugify');

router.get('/', async (req, res) => {
const ceosData = await ceosModel.getAll();

res.render('template', {
    locals: {
        title: "List of Ceos",
        data: ceosData,
    },
    partials: {
        body: 'partials/ceo-list',
    },
});
});

router.get('/:slug', async (req, res) => {
const { slug } = req.params;
const executive = await ceosModel.getBySlug(slug);

if (executive) {
    res.render('template', {
        locals:{
            title: 'An Apple Ceo',
            executive
        },
        partials:{
            body: "partials/ceo-details"
        },
    });
} else{
    res.status(404).send(`No CEO found with that slug ${slug}`)

}

});

router.post('/', async (req, res) => {
const { ceo_name, ceo_year } = req.body;
const slug = slugify(ceo_name, {
    replacement: '_',
    lower: true,
    strict: true
});
const response = await ceosModel. addEntry(ceo_name, slug, ceo_year);
console.log("post data response is: ", response);
if (response.rowCount >= 1) {
    res.redirect('/ceos')
}else {
    res.sendStatus(500)
}
res.sendStatus(200);

});

router.post('/delete', async (req, res) => {
const { ceo_id } = req.body;
// new instance of the ceoModel
const ceo = new ceosModel(ceo_id);
const response = await ceo.deleteEntry();
if (response.rowCount >= 1) {
    res.redirect('/ceos')
} else {
    res.sendStatus(500);
}
});

module.exports = router;