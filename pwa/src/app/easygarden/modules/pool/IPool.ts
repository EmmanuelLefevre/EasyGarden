import { IGarden } from "../../components/garden/IGarden";

export interface IPool {
  id: number,
  name: string,
  status: boolean,
  garden: {
    id: string,
    name: string
  }
}

export interface IDataPool {
  'hydra:member': IPool[]
}

export interface IAddPool {
  name: string,
  garden: IGarden | null
}

export interface IPoolFilter {
  name: string
}