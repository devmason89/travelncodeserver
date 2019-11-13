const router = require('express').Router();
const Office = require('../db').import('../models/office');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const validateSession = require('../middleware/validate-session');

//**POST AN OFFICE */
router.post('/', validateSession, (req, res) => {
    const officeFromRequest = {
    name : req.body.office.name,
    type : req.body.office.type,
    freeWifi : req.body.office.freeWifi,
    freeRestroom : req.body.office.freeRestroom,
    comments : req.body.office.comments,
    rating : req.body.office.rating,
    owner : req.user.id                //have to point to the other table to link these 2 tables 
}
Office.create(officeFromRequest)
.then(office => res.status(200).json(office))
.catch(err => res.json(req.errors))
})

//*GETS ALL OFFICES FOR SPECIFIC TRAVELLER*//
router.get('/getall', validateSession, function (req, res) {
    let userid = req.user.id

    Office
    .findAll({
        where: { owner: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data)
        },
        function findAllError(err){
            res.send(500, err.message)
        }
    )
})

//* GET A SINGLE OFFICE A SPECIFIC TRAVELLER*//
router.get('/:id', validateSession, function (req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    Office 
        .findOne({
            where: {id: data, owner: userid}
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message)
            }
        )
})

//*DELETES ITEM FOR INDIVIDUAL USER*//
router.delete('/:id', validateSession, function (req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    Office
    .destroy ({
        where: {id: data, owner: userid}
    }).then(
        function deleteOfficeSuccess(data) {
            res.send("you removed an office")
        },
        function deleteOfficeError(err){
            res.send(500, err.message)
        }
    )
})

//**UPDATE ITEM FOR INDIVIDUAL USER */
router.put('/:id', validateSession, (req,res) => {
    // const updateOffice = {
        // name : req.body.office.name,
        // type : req.body.office.type,
        // freeWifi : req.body.office.freeWifi,
        // freeRestroom : req.body.office.freeRestroom,
        // comments : req.body.office.comments,
        // rating : req.body.office.rating,
        // owner : req.user.id 
    // }
    Office.update(req.body.office, { 
        where: {
            id : req.params.id,
            owner: req.user.id}}       //only the person who made this office can update it now
    ).then(office => res.status(200).json(office))
    .catch(err => res.json(req.errors))
    
})


module.exports = router;