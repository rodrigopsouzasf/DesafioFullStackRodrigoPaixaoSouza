const Users = require('../models/user')

module.exports = app => {
    // Adicionar os cabeçalhos Access-Control-Allow-Origin
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        next();
      });

     app.get('/user',(req,res)=>{
        let valor = ''
        if(req.query.valor){
            valor = req.query.valor
        }
         Users.lista(valor,res)
    })



    app.get('/user/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        Users.buscaPorId(id,res)
    })

    app.post('/user/login',(req,res)=>{
        const user = req.body
        Users.conect(user,res)
    })

    app.post('/user',(req,res)=>{
    const user = req.body

    Users.adiciona(user,res)
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