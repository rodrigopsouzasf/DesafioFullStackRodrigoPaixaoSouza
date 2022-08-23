const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const TabelasVehicle = require('./infraestrutura/tabelasVehicle')
const TabelasVehicleData = require('./infraestrutura/tabelasVehicleData')
const TabelasUser = require('./infraestrutura/tabelasUser')


conexao.connect(erro => {
    if(erro){
        console.log(erro)
    }else{

        
        console.log('conectado ao banco')

        TabelasVehicle.init(conexao)
        TabelasVehicleData.init(conexao)
        TabelasUser.init(conexao)

        const app = customExpress()

        //Tela de Bem vindo
        app.get('/',(req,res)=>{
         res.status(200).json({msg: 'Bem vindos a API de Rodrigo Paixão de Souza'})
        })


        app.listen(3000,()=> console.log('servidor rodando na porta 3000'))
    }
})

