const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt=require('jsonwebtoken')

// Schema 생성
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String
  }

},{versionKey:false})

UserSchema.methods.comparePassword = function(plainPassword, next){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
      if(err) return next(err)
      next(null, isMatch)
  })
}

UserSchema.methods.generateToken = function(next){
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "scyllacore")

  user.token = token

  user.save()
  .then((user) =>{
    next(null, user)
  })
  .catch((err) => next(err))

}

const User = mongoose.model("account", UserSchema);
module.exports = User