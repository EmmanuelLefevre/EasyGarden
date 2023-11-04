import { IGarden } from "../../components/garden/IGarden";

export interface ILawnmower {
  id: number,
  name: string,
  batterySensor: string,
  status: boolean,
  garden: {
    id: number,
    name: string
  }
}

export interface IDataLawnmower {
  id?: number;
  'hydra:member'?: ILawnmower[];
}

export interface IAddLawnmower {
  name: string,
  garden: IGarden | null
}

export interface ILawnmowerFilter {
  name: string
}