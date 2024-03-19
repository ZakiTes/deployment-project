var express = require('express');
var router = express.Router();
const fs = require('fs');
var path = require('path');

router.get('/', function(req, res, next) {
    const pictures = fs.readdirSync(path.join(__dirname, '../pictures/'));
    res.render('pictures', { pictures: pictures});
});

router.get('/:pictureName', function(req, res, next) {
    const picture = req.params.pictureName;
    const picturePath = path.join(__dirname, '../pictures/', picture);

    fs.access(picturePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('Picture not found');
        }
        res.render('pictures', {pictures: [picture], picture: picture });
    });
});


router.post('/', function(req, res, next) {
    const file = req.files.file;
    fs.writeFileSync(path.join(__dirname, '../pictures/', file.name), file.data);
    res.end();
});

module.exports = router;