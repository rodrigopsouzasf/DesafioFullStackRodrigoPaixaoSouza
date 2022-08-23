class TabelasVehicle{
    init(conexao){
        this.conexao = conexao

        this.criarVehicles()

        this.inserirVeiculosPadrao()
    }

    criarVehicles(){
        const sql = 
            `CREATE TABLE IF NOT EXISTS VEHICLE(id INT
                 PRIMARY KEY AUTO_INCREMENT,vehicle VARCHAR(20) NOT NULL,
                 volumetotal INT,connected INT,softwareUpdates INT)`
        this.conexao.query(sql,erro=>{
            if(erro){
                console.log(erro)
            }else {
                console.log('tabela vehicle criada com sucesso')
            }
        })
    }

    inserirVeiculosPadrao(){
        this.inserirVeiculos('Ranger', 145760, 70000, 27550);
		this.inserirVeiculos('Mustang', 1500, 500, 750);
		this.inserirVeiculos('Territory', 4560, 4000, 3050);
		this.inserirVeiculos('Bronco Sport', 7560, 4060, 2050);
		this.inserirVeiculos('GT', 4038, 4000, 3900);
		this.inserirVeiculos('Fusion', 832, 700, 600);
		this.inserirVeiculos('Ecosport', 2992, 2700, 2500);
		this.inserirVeiculos('Fiesta', 5713, 4060, 3800);
    }


    inserirVeiculos(vehicle, volumetotal, connected, softwareUpdates) {
		const INSERT_VEHICLE = `
            INSERT INTO VEHICLE (
                vehicle, 
                volumetotal,
                connected,
                softwareUpdates
            ) SELECT '${vehicle}', ${volumetotal}, ${connected}, ${softwareUpdates} 
                WHERE NOT EXISTS (SELECT * FROM VEHICLE WHERE vehicle = '${vehicle}')`

		this.conexao.query(INSERT_VEHICLE, error =>{
            if(error){
            console.log(error)
        }else{
            console.log('Dados da tabela vehicle ' + vehicle +  ' adicionados')
        }})
	}
}



module.exports = new TabelasVehicle