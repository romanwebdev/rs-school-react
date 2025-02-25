import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter } from '../types/character.type';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<ICharacter, { id: string | undefined }>({
      query: ({ id }) => `/${id}`,
    }),
  }),
});

export const { useGetCharacterByIdQuery } = starWarsApi;
