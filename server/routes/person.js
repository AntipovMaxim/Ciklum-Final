var router = require('express').Router();
var Person = require('../models/person');


router.get('/', function (req, res) {

    Person.find((err, persons) => {
        res.json(persons)
    });
});


router.post('/', function (req, res) {
    console.log(req.body)
    var person = new Person(req.body);

    if (person) {
        person.save();

        res.json({
            success: true,
            message: "New person was successfully created!",
            data: person
        });
    } else {

        res.json({
            success: false,
            message: "Couldn't create a person!",
            data: null
        });
    }

});

router.put('/:Sid/:Pid', function (req, res) {

    console.log(req.params.Sid);

    Person.findOne({_id: req.params.Sid}, (err, existingPerson) => {

        if (err) {
            console.log(`Cannot update Person ${err}`);
        }

        existingPerson = Object.assign(existingPerson, {seatId: req.params.Pid});

        existingPerson.save();

        res.json(existingPerson);
    })

})


module.exports = router;