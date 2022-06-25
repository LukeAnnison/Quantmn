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
    getQuarks: builder.query<QuarkServerResponse, string | void | null>({
      query: (args) => ({
        url: `/quarks`,
        params: { filters: args },
      })
    }),
    getAllQuarks: builder.query<QuarkServerResponse, void>({
      query: () => ({
        url: `/quarks`,
        method: 'GET'
      })
    }),
    createQuark: builder.mutation<QuarkServerResponse, IQuark>({
      query: args => ({
        url: 'quark/create_quark',
        method: 'POST',
        body: { ...args }
      })
    }),
    updateQuark: builder.mutation<
      QuarkServerResponse,
      { id: string; data: { [key: string]: any } }
    >({
      query: ({ id, data }) => ({
        url: `quark/${id}`,
        method: 'PATCH',
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
export const {
  useGetQuarkQuery,
  useGetQuarksQuery,
  useGetAllQuarksQuery,
  useCreateQuarkMutation,
  useDeleteQuarkMutation,
  useUpdateQuarkMutation
} = apiSlice
