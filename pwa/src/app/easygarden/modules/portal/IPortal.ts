import { IGarden } from "../../components/garden/IGarden";

export interface IPortal {
  id: number,
  name: string,
  presenceSensor: boolean,
  status: boolean,
  garden: {
    id: number,
    name: string
  }
}

export interface IDataPortal {
  'hydra:member': IPortal[]
}

export interface IAddPortal {
  name: string,
  garden: IGarden | null
}

export interface IPortalFilter {
  name: string
}