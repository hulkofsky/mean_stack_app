const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true}
})

UserSchema.pre('save', function(next){
    const user = this
    if (this.isModified('password')|| this.isNew) {
        bcrypt.genSalt(10, (err,salt)=>{
            if (err){
                return next(err)
            }
            bcrypt.hash(user.password, salt, (err, hash)=>{
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }else{
        return next()
    }
})

//compare the password
UserSchema.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, (err, isMatch)=>{
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)