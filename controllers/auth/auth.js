const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

  const token = req.cookies['x_auth']
  console.log(token)
  
  if (!token) {
    const unAuthorized = `<script>alert('로그인 후 다시 시도해 주세요')
    window.location.href = '/'
    </script>`    

    return res.status(401).send(unAuthorized)
  }

  try {
    const decoded = jwt.verify(token, "scyllacore")
    req.user = decoded // req.user 객체 express error handler
    next()
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" })
  }
  
}

