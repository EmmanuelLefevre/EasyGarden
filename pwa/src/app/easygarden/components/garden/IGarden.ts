export interface IGarden {
  id?: number,
  name: string
}

export interface IDataGarden {
  data: IGarden[]
}

export interface IGardenFilter {
  name: string
}