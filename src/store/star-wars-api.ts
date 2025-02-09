import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter } from '../types/character.type';

type IResponse = {
  results: ICharacter[];
  count: number;
};

type IRequest = { page: string; search: string };

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getCharacters: builder.query<IResponse, IRequest>({
      query: ({ page, search }) => `/?page=${page}&search=${search}`,
    }),
    getCharacterById: builder.query<ICharacter, { id: string | undefined }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIdQuery } = starWarsApi;
