const Vehicle = require('../models/vehicle')

module.exports = app => {
    // Adicionar os cabeçalhos Access-Control-Allow-Origin
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET,OPTIONS')
        next();
      });

      app.get('/vehicle',(req,res)=>{
        Vehicle.lista(res)
    })
    app.get('/vehicle/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        Vehicle.buscaPorId(id,res)
    })

    app.post('/vehicle',(req,res)=>{
    const vehicle = req.body

    Vehicle.adiciona(vehicle,res)
    })

    app.put('/vehicle/:id',(req,res)=>{
      const id = parseInt(req.params.id)
      const valores = req.body

      Vehicle.altera(id,valores,res)
    })

    app.delete('/vehicle/:id',(req,res)=>{
      const id = parseInt(req.params.id)
      Vehicle.delete(id,res)
  })

    
}