const conexao = require('../infraestrutura/conexao')
class VehicleData{
    adiciona(vehicledata,res){
        const sql = 'INSERT INTO VEHICLEDATA SET ?'

        conexao.query(sql,vehicledata,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.json(resultado)
            }
        })

    }

   
    lista(valor,res){
        
        const sql = `SELECT * FROM VEHICLEDATA WHERE vin like '%${valor}%'`
    

        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                const vehicledata = resultado;
                const result = { vehiclesData: vehicledata };
                res.status(200).json(result)
            }

        })
    }

    buscaPorId(id,res){
        const sql = `SELECT * FROM VEHICLEDATA WHERE id = ${id}`

        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }
    altera(id,valores,res){
        const sql = `UPDATE VEHICLEDATA SET ? WHERE id =?`

        conexao.query(sql,[valores,id],(erro,resultado)=>{
            if(erro){
                console.log(res.valores)
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }

    delete(id,res){
        const sql = `DELETE FROM VEHICLEDATA WHERE id = ?`

        conexao.query(sql,id,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new VehicleData