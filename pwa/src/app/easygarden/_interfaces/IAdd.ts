import { IGarden } from "../components/garden/IGarden"

export interface IAdd {
  name: string,
  garden?: IGarden | null
}