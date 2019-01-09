var express = require('express');
var Review = require('../models').Review;
var router = express.Router();


router.get('/:bookId', function(req, res){
    Review.findAll({ 
        where: { bookId: req.params.bookId }
    }).then(reviews => {
        res.status(200).json(reviews);
    });

});

router.post('/', function(req, res){
    Review.create({
        bookId: req.body.bookId,
        message: req.body.message
    }).then(review => {
        /*console.log(review.get({
            plain: true
        }));*/
        res.status(200).json(review);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

module.exports = router;