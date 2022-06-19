import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { IQuark } from '../utils/types'

interface QuarkServerResponse {
  success?: boolean
  data?: IQuark
}

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),
  endpoints: builder => ({
    getQuark: builder.query<QuarkServerResponse, string>({
      query: id => `/quark/${id}`
    }),

    createQuark: builder.mutation<QuarkServerResponse, IQuark>({
      query: data => ({
        url: 'quarks',
        method: 'POST',
        body: data
      })
    }),
    deleteQuark: builder.mutation<QuarkServerResponse, string>({
      query: id => ({
        url: `quark/${id}`,
        method: 'DELETE',
        body: id
      })
    })
  })
})

// Export hooks for usage in functional components
export const { useGetQuarkQuery, useCreateQuarkMutation, useDeleteQuarkMutation } = apiSlice
