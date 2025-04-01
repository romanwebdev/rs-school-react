export interface ICountry {
  name: IName;
  population: number;
  region: string;
  flags: IFlag;
  flag: string;
}

export interface IName {
  common: string;
  official: string;
  nativeName: INativeName;
}

export interface INativeName {
  eng: Eng;
}

export interface Eng {
  official: string;
  common: string;
}

interface IFlag {
  svg: string;
}
