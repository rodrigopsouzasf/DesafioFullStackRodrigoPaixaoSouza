const VehicleData = require('../models/vehicleData')

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

     app.get('/vehicleData',(req,res)=>{
        let valor = ''
        if(req.query.valor){
            valor = req.query.valor
        }
         VehicleData.lista(valor,res)
    })



    app.get('/vehicleData/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        VehicleData.buscaPorId(id,res)
    })

    app.post('/vehicleData',(req,res)=>{
    const vehicleData = req.body

    VehicleData.adiciona(vehicleData,res)
    })

    app.put('/vehicleData/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        const valores = req.body
  
        VehicleData.altera(id,valores,res)
      })

    app.delete('/vehicleData/:id',(req,res)=>{
        const id = parseInt(req.params.id)
        VehicleData.delete(id,res)
    })
}