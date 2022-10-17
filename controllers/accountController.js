const userObject = require('../models/user')
const bcrypt = require("bcryptjs")
const mongoose  = require('mongoose')
const jwt=require('jsonwebtoken')


const user_create_post = async (req, res) => {
  const { name, email, password } = req.body

  try {
    let user = await userObject.findOne({ name })
    if (user) {

      const alreadyExists = `<script>alert('이미 가입된 사용자입니다.')
      window.location.href = 'register'
      </script>`

      return res.status(409).send(alreadyExists) // return을 붙여야한다.
    }

    user = new userObject({
      name,
      email,
      password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt)

    user.generateToken((err, user)=>{
      if(err) {
        
        const generateErr = `<script>alert('토큰화 오류. 다시 시도 부탁드립니다.')
      window.location.href = 'register'
      </script>`

        return res.status(400).send(generateErr) // 여긴 왜 return 쓰고
      }
    })

    res.redirect('/blogs')

  } catch (error) {

    const serverErr = `<script>alert('서버 오류. 다시 시도 부탁드립니다.')
      window.location.href = 'register'
      </script>`

    console.error(error.message)
    res.status(500).send(serverErr) // 여긴 왜 안씀?
  }
}





const user_login_post = (req, res)=>{

  userObject.findOne({name: req.body.name}, (err, user)=>{
      if(!user){

        const notFoundID = `<script>alert('아이디를 찾을 수 없습니다. 다시 입력해주세요.')
        window.location.href = '/login'
        </script>`

          return res.status(404).send(notFoundID)
      }  

      //console.log(user)

      user.comparePassword(req.body.password, (err, isMatch)=>{
          if(!isMatch){

            const wrongPwd = `<script>alert('비밀번호가 잘못 되었습니다. 다시 입력해주세요')
        window.location.href = '/login'
        </script>`

              return res.status(403).send(wrongPwd)
            }
          // 일치 시, 토큰 생성
          user.generateToken((err, user)=>{
              if(err) return res.status(400).send(err)
              res.cookie("x_auth", user.token).redirect('/blogs')   
          })
      }) 

  })
}




const user_register_get = (req, res) => {
  res.render('account/createAccount', { title: 'create' })
}



const user_login_get = (req, res) => {
  res.render('account/login', { title: 'create' })
}


module.exports = {
  user_create_post,
  user_login_post,
  user_register_get,
  user_login_get,
}