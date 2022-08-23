class TabelasVehicleData{
    init(conexao){
        this.conexao = conexao

        this.criarVehiclesData()

        this.inserirVehicleDataPadrao()
    }

    criarVehiclesData(){
        const sql =`CREATE TABLE IF NOT EXISTS VEHICLEDATA(
            id INT PRIMARY KEY AUTO_INCREMENT,
            vin VARCHAR(20) NOT NULL UNIQUE,
            odometer VARCHAR(10) DEFAULT ('') NOT NULL,
            tirePressure VARCHAR(30) DEFAULT ('') NOT NULL,
            status VARCHAR(10) DEFAULT ('') NOT NULL,
            batteryStatus VARCHAR(10) DEFAULT ('') NOT NULL,
            fuelLevel VARCHAR(10) DEFAULT ('') NOT NULL,
            lat VARCHAR(10) DEFAULT ('') NOT NULL,
            longi VARCHAR (10) DEFAULT ('') NOT NULL);`


        this.conexao.query(sql,erro=>{
            if(erro){
                console.log(erro)
            }else {
                console.log('tabela vehicleData criada com sucesso')
            }
        })
    }



    inserirVehicleDataPadrao(){

        this.inserirVehicleData('2FRHDUYS2Y63NHD22454', '23344', '36,36,35,34','ON', 'OK', '76', '-12,2322', '-35,2314');

        this.inserirVehicleData('2RFAASDY54E4HDU34874', '130000', '36,34,36,33', 'OFF', 'Recharge', '19','-12,2322', '-35,2314');

        this.inserirVehicleData('2FRHDUYS2Y63NHD22455', '50000', '36,36,35,34', 'ON', 'OK', '90','-12,2322', '-35,2314');

        this.inserirVehicleData('2RFAASDY54E4HDU34875', '10000', '36,34,36,33', 'OFF', 'OK', '25','-12,2322', '-35,2314' );

        this.inserirVehicleData('2FRHDUYS2Y63NHD22654', '23544', '36,36,35,34', 'ON','OK', '76', '-12,2322', '-35,2314');

        this.inserirVehicleData('2FRHDUYS2Y63NHD22854', '23574', '36,36,35,34', 'ON','OK', '75', '-13,2322', '-35,280');
    }
    

    inserirVehicleData(vin, odometer, tirePressure, status, batteryStatus, fuelLevel, lat, longi
) {
		const INSERT_VEHICLEDATA = `
            INSERT INTO VEHICLEDATA (
                vin, 
                odometer,
                tirePressure,
                status,
                batteryStatus, 
                fuelLevel,
                lat,
                longi
            ) SELECT '${vin}', '${odometer}', '${tirePressure}', '${status}',
                '${batteryStatus}', '${fuelLevel}', '${lat}', '${longi}'
                WHERE NOT EXISTS (SELECT * FROM VEHICLEDATA WHERE vin = '${vin}')`

        this.conexao.query(INSERT_VEHICLEDATA, error =>{
            if(error){
            console.log(error)
        }else{
            console.log('Dados da tabela vehicleData ' + vin +  ' adicionados')
        }
    })


    }


    


}



module.exports = new TabelasVehicleData