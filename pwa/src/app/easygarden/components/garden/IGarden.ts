export interface IGarden {
  id?: number,
  name: string
}

export interface IDataGarden {
  id?: number;
  'hydra:member': IGarden[];
}

export interface IGardenFilter {
  name: string
}