const conexao = require('../infraestrutura/conexao')
class Users{
    adiciona(user,res){
        const join_date = new Date()
        const userDatado = {...user,join_date}
        const sql = 'INSERT INTO USERS SET ?'

        conexao.query(sql,userDatado,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                res.json(resultado)
            }
        })

    }

   
    lista(valor,res){
        
        const sql = `SELECT * FROM USERS WHERE userName like '%${valor}%'`
    

        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else{
                const user = resultado;
                const result = { users: user };
                res.status(200).json(result)
            }

        })
    }

    conect(user,res){
        const sql = `SELECT * FROM USERS WHERE USERNAME = ? AND PASSWORD = ?`

        conexao.query(sql,[user.userName,user.password],(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                console.log(resultado)
                res.status(200).json(resultado)
            }
        })
    }



    buscaPorId(id,res){
        const sql = `SELECT * FROM USERS WHERE id = ${id}`

        conexao.query(sql,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }


    altera(id,valores,res){
        const sql = `UPDATE USERS SET ? WHERE id =?`

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
        const sql = `DELETE FROM USERS WHERE id = ?`

        conexao.query(sql,id,(erro,resultado)=>{
            if(erro){
                res.status(400).json(erro)
            }else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new Users