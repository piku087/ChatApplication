const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user')
//signup 

router.post('/signup', async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

       if(user)
        {

        
       return res.status(400).send({
            message : 'User already exists.',
            success: false

        })

       }
       
       const hashedPassword = await bcrypt.hash(req.body.password, 10);
       req.body.password = hashedPassword;

       const newUser = new User(req.body);
        await newUser.save();

        res.status(201).send({
            message: 'User create succesfully!',
            success: true
        });

    } catch (error){
        console.error(error);
        res.status(500).send({
            message: error.message,
            success: false
        })

    }
})

//login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).select('+password');

        if (!user) {
            return res.status(400).send({
                message: 'User does not exist.',
                success: false
            });
        }

        const isvalid = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isvalid) {
            return res.status(400).send({
                message: 'Invalid Password',
                success: false
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "365d" }
        );

        return res.send({
            message: 'User logged in successfully',
            success: true,
            token: token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;