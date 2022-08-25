const conexao = require('../infraestrutura/conexao')
class Vehicle{
    adiciona(vehicle,res){
        const sql = 'INSERT INTO VEHICLE SET ?'

        conexao.query(sql,vehicle,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.json(resultado)
            }
        })

    }

    lista(res){
        const sql = 'SELECT id,vehicle,volumetotal,connected,softwareUpdates FROM VEHICLE'

        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                const vehicle = resultado;
                const result = { vehicles: vehicle };
                res.status(200).json(result)
            }

        })
    }

    buscaPorId(id,res){
        const sql = `SELECT id,vehicle,volumetotal,connected,softwareUpdates FROM VEHICLE WHERE id = ?`

        conexao.query(sql,[id],(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }
    altera(id,valores,res){
        const sql = `UPDATE VEHICLE SET ? WHERE id =?`

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
        const sql = `DELETE FROM VEHICLE WHERE id = ?`

        conexao.query(sql,[id],(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new Vehicle