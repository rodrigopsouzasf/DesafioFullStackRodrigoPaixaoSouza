const bcrypt = require('bcrypt')

class TabelasUser{
    init(conexao){
        this.conexao = conexao

        this.criarUsers()

        this.inserirUsersPadrao()

    }
    criarUsers(){
        const sql = 
            `CREATE TABLE IF NOT EXISTS USERS(id INT
                 PRIMARY KEY AUTO_INCREMENT,userName VARCHAR(20) NOT NULL,
                 email VARCHAR(20) NOT NULL,password VARCHAR(100) NOT NULL,
                 full_name VARCHAR(40) NOT NULL,join_date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP)`
        this.conexao.query(sql,erro=>{
            if(erro){
                console.log(erro) 
            }else {
                console.log('tabela users criada com sucesso')
            }
        })
    }

    inserirUsersPadrao(){
        this.insereUser('admin', 'admin@ford.com', '123456', 'Admin');
        this.insereUser('marcos', 'marcos@ford.com', '123456', 'Marcos Prado');
        this.insereUser('patricia', 'patricia@ford.com', '123456', 'Patricia Tourinho');
        this.insereUser('rodrigo', 'rodrigo@ford.com', '123456', 'Rodrigo P Souza');
    }
    
    
    
    
    
    
        async insereUser(userName, email, password, full_name){
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password,salt)
        password=passwordHash
            const INSERT_USER = `
                INSERT INTO USERS (
                    userName,
                    email,
                    password,
                    full_name
                ) SELECT '${userName}', '${email}', '${password}', '${full_name}' 
                WHERE NOT EXISTS (SELECT * FROM USERS WHERE userName = '${userName}')`
            
                this.conexao.query(INSERT_USER, error =>{
                    if(error){
                    console.log(error)
                }else{
                    console.log('Dados da tabela USERS ' + userName +  ' adicionados')
                }})
        }
        



}

module.exports=new TabelasUser