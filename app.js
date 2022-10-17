const express = require('express')
const mongoose  = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const cookieParser = require('cookie-parser')

const blogRoutes = require('./routes/blogRoutes')
const accountRoutes = require('./routes/accountRoutes')

const app = express()


//const dbURI = process.env.MONGODB_URI;
const dbURI = 'mongodb+srv://scyllacore:(pwd)@scyllacore.ur5ud.mongodb.net/blog?retryWrites=true&w=majority'
mongoose.connect(dbURI,{useNewUrlParser:true , useUnifiedTopology: true})
    .then(()=>{
        app.listen(process.env.PORT || 3000)
        console.log('connected to db')
    })
    .catch((err)=>{console.log(err)})


app.set('view engine','ejs')
app.use(express.static(path.join(__dirname ,'public')))
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(express.json({extended:false}))

app.use(cookieParser())

app.get('/',(req,res)=>{
    res.redirect('/blogs')
 })

app.get('/about',(req,res)=>{
    res.render('blog/about',{title:'about'})
 })

app.use('/blogs',blogRoutes)

app.use('/login', accountRoutes)

app.get('/logout',(req,res)=>{
    res.clearCookie('x_auth').redirect('/')
});

app.use((req,res)=>{
    res.status(404).render('404',{title:'scyllacore Blog'})
})




