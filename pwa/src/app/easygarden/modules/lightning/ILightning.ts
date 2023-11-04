import { IGarden } from "../../components/garden/IGarden";

export interface ILightning {
  id: number,
  name: string,
  status: boolean,
  garden: {
    id: number,
    name: string
  }
}

export interface IDataLightning {
  id?: number;
  'hydra:member': ILightning[];
}

export interface IAddLightning {
  name: string,
  garden: IGarden | null
}

export interface ILightningFilter {
  name: string
}