import { ICharacter } from './character.type';

export type IResponse = {
  results: ICharacter[];
  count: number;
};
