var router = require('express').Router();
var Seat = require('../models/seat');

router.get('/', function (req, res) {

    Seat.find((err, seats) => {
        res.json(seats)
    });
});


router.post('/', function (req, res) {

    var seat = new Seat(req.body);

    seat.save();

    res.json(seat);

});

router.put('/:id', function (req, res) {
    Seat.findOne({_id: req.params.id}, (err, existingSeat) => {

        if (err) {
            console.log(`Cannot update seat ${err}`);
        }

        existingSeat = Object.assign(existingSeat, req.body);

        existingSeat.save((err, seat) => {

            res.json(seat);
        });


    })

})


router.delete('/:id', function (req, res) {

    Seat.remove({_id: req.params.id}, function (err, removed) {

        if (err) {

            console.log(err);

        } else {

            // res.status(200).send('Removed');

            Seat.find((err, seats) => {
                res.json(seats)
            });

        }

    });

})


module.exports = router;