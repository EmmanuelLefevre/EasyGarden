import { IGarden } from "../../components/garden/IGarden";

export interface ILawnmower {
  id: number,
  name: string,
  batterySensor: string,
  status: boolean,
  garden: {
    id: string,
    name: string
  }
}

export interface IDataLawnmower {
  'hydra:member': ILawnmower[]
}

export interface IAddLawnmower {
  name: string,
  garden: IGarden | null
}

export interface ILawnmowerFilter {
  name: string
}