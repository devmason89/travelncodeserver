const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//SIGNUP

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 13)
    })
    .then(
        createSuccess = (user) => {
            let token = jwt.sign( {id: user.id},
                process.env.JWT_SECRET, {expiresIn: 60*60*24})
        res.json( {
            user: user,
            message: "traveller created",
            sessionToken: token
        })
        },
        createError = err => res.send(err)
    )
    .catch(err => res.send(500, err))
})


//LOGIN
router.post('/login', (req, res) => {
    User.findOne ({where: {username: req.body.user.username}}).then(
        function (user) {
            if(user){
                bcrypt.compare(req.body.user.password, user.password, function(err,matches)
                {
                    if (matches) {
                    let token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET, {expiresIn: 60*60*24})
                    res.json({
                        user: user,
                        message:'successfully authenticated traveller',
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({error: 'Bad Gateway; Password does not match'})
                }
 });
                }else {
                    res.status(500).send({error: 'Failed to Authenticate; no user found'});
                      }              
                    },
                function (err) {
                    res.status(501).send({error:'Not Implemented; failed to process'})
                }
            );
            });





module.exports = router;