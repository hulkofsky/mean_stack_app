const User = require('../models/user')
const _ = require('lodash')

module.exports = router=>{
    router.post('/users', (req,res)=>{
        if(!_.isEmpty(req.body.username)&&!_.isEmpty(req.body.email)&&!_.isEmpty(req.body.password)) {
            const newUser = new User ({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            newUser.save(err=>{
                if(err){
                    return res.json({success: false, message: 'that email already exists'})
                }
                res.json({success: true, message: 'Succesfully created new user'})
            })
        }else{
            res.json({success: false, message: 'Ensure that u have entered all information!'})
        }
        
    })
    return router
}


