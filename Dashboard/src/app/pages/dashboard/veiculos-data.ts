export interface VeiculosData extends Array<VeiculoData>{}


export interface VeiculoData {
  id?: number | string;
  vin: string;
  odometer: number | string;
  tirePressure: number | string;
  status: boolean | null;
  batteryStatus: string;
  fuelLevel: number | string;
  lat: number | string;
  longi: number | string|null;

}

export interface VeiculosDataAPI{
  vehiclesData: VeiculosData;
}
