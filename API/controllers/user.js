const Users = require('../models/user.js')
const jwt = require('jsonwebtoken')


module.exports= app =>{
     // Adicionar os cabeçalhos Access-Control-Allow-Origin
     app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Expose-Headers", "x-access-token");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, X-XSRF-TOKEN, Authorization, Content-Type, Accept");
    
        next()
    });

     app.get('/user',(req,res)=>{
         Users.lista(res)
     })
     app.get('/user/:id',(req,res)=>{
         const id = parseInt(req.params.id)
         Users.buscaPorId(id,res)
     })

    app.post('/user/register',(req,res)=>{
        const users = req.body
        Users.adiciona(users,res)
    })

    app.post('/user/login',(req,res,next)=>{
        const users = req.body
        Users.login(users,res,req,next)
    })



     app.put('/user/:id',(req,res)=>{
       const id = parseInt(req.params.id) 
       const valores = req.body

       Users.altera(id,valores,res)
     })

     app.delete('/user/:id',(req,res)=>{
       const id = parseInt(req.params.id)
       Users.delete(id,res)
   })
}