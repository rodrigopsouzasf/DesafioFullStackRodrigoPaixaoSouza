const conexao = require('../infraestrutura/conexao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
, { promisify } = require('util');


class Users{


    //cadastro de user
    async adiciona(user,res){
        if(!user.userName){
            return res.status(422).json({msg:"O userName é obrigatório"})
        }
        if(!user.password){
            return res.status(422).json({msg:"O passsword é obrigatório"})
        }
        if(!user.email){
            return res.status(422).json({msg:"O email é obrigatório"})
        }
        //const userExists = await Users.findOne(user.email === email)

        //if(userExists){
        //    return res.status(422).json({msg:'Por favor, utilize outro email'})
        //}

        //criando a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(user.password,salt)
        user.password=passwordHash

        //data de cadastro
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

    async login(user,res){
        if(!user.userName){
            return res.status(422).json({msg:"O userName é obrigatório"})
        }
        if(!user.password){
            return res.status(422).json({msg:"O passsword é obrigatório"})
        }

        const usuario = await this.findOne(user.userName)
        //usuario.then(res=> console.log(res))
        console.log(user)
        
        console.log(usuario)
        if(!usuario){
            return res.status(404).json({msg:"Usuario não cadastrado"})
        }

        if(usuario.userName !== user.userName){
            return res.status(422).json({msg:"Usuario não cadastrado"})
        }


        const checkPass = await bcrypt.compare(user.password,usuario.password)

        if(!checkPass){
            return res.status(422).json({msg: 'password invalida'})
        }

        //const usuarioretorn = await this.findRetorn(user.userName)

        try{
            const secret = process.env.SECRET
            const token = jwt.sign({id:usuario.id,name:usuario.userName,email:usuario.email,expiresIn: 86400 // seconds, 24h
},secret);  
            res.set('x-access-token',token);
            res.status(200).json({msg: 'Autenticação realizada com Sucesso',auth:true, token:token})
            
        }catch(err){
            console.log(err)

            res.status(500).json({
                msg: 'Aconteceu um erro no Servidor, tente novamente mais tarde'
            })
        }
        
    }


    async findOne(userName) {

        return new Promise((resolve, reject) => conexao.query(
            `SELECT * FROM users WHERE userName = ?`,
            [userName],
            (err, row) => {
                if (err) {
                    console.log(err);
                    return reject('Can`t find user');
                }
                 
                if(row) resolve(row[0]);
                resolve(null);
            }
        ));
        
    }



     lista(res){
         const sql = 'SELECT * FROM USERS'

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

     buscaPorId(id,res){
         const sql = `SELECT * FROM USERS WHERE id = ?`

         conexao.query(sql,[id],(erro,resultado)=>{
             if(erro){
                 res.status(400).json(erro)
             }else {
                 res.status(200).json(resultado)
             }
         })
     }
    async altera(id,valores,res){
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(valores.password,salt)
        valores.password=passwordHash
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

         conexao.query(sql,[id],(erro,resultado)=>{
             if(erro){
                 res.status(400).json(erro)
             }else {
                 res.status(200).json(resultado)
             }
         })
     }
}

module.exports = new Users