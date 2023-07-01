import { IGarden } from "../../components/garden/IGarden";

export interface IWatering {
  id: number,
  name: string,
  flowSensor: string,
  pressureSensor: string,
  status: boolean,
  garden: {
    id: string,
    name: string
  }
}

export interface IDataWatering {
  'hydra:member': IWatering[]
}

export interface IAddWatering {
  name: string,
  garden: IGarden | null
}

export interface IWateringFilter {
  name: string
}
