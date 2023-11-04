import { IGarden } from "../../components/garden/IGarden";

export interface IWatering {
  id: number,
  name: string,
  flowSensor: string,
  pressureSensor: string,
  status: boolean,
  garden: {
    id: number,
    name: string
  }
}

export interface IDataWatering {
  id?: number;
  'hydra:member': IWatering[];
}

export interface IAddWatering {
  name: string,
  garden: IGarden | null
}

export interface IWateringFilter {
  name: string
}
