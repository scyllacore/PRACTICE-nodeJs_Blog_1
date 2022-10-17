const blogObject = require('../models/blogModel')
const userObject = require('../models/user')



const blog_index = (req, res) => {
    blogObject.find().sort({createdAt : -1})
        .then((result) =>{
            res.render('blog/index', { title: 'home',bloglist:result })
        })
        .catch((err) =>{
            console.log(err)
        })

}



const blog_create_get = (req, res) => {
    
    
    userObject.findById(req.user)
        .then((result) =>{
            console.log(result.name)
        
            if(result.name==='yms8795'){
            res.render('blog/create', { title: 'create' })
        }
        else{
            const unAuthorized = `<script>alert('접근 권한이 없습니다.')
            window.location.href = '/blogs'
            </script>`    

            return res.status(401).send(unAuthorized)
            }
        })
        .catch((err) => {
            console.log(err)
        })

}



const blog_create_post = (req, res) => {
    console.log(req.body)

    const blog = new blogObject(req.body)


    blog.save()
        .then(() => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
}



const blog_detail = (req,res)=>{
    const id = req.params.id

    blogObject.findById(id)
        .then((result) =>{
            res.render('blog/detail',{title : 'detail',blogDetail:result})
        })
        .catch((err) => {
            console.log(err)
        })

}



const blog_delete = (req, res) => {
    const id = req.params.id;
    blogObject.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' })
      })
      .catch(err => {
        console.log(err)
      })
  }





module.exports = {
    blog_index,
    blog_create_get,
    blog_create_post,
    blog_detail,
    blog_delete
}