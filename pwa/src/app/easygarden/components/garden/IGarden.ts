export interface IGarden {
  id?: number,
  name: string
}

export interface IDataGarden {
  'hydra:member': IGarden[]
}

export interface IGardenFilter {
  name: string
}