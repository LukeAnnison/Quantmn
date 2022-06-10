import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { INft } from '../utils/types'

interface NftServerResponse {
  success?: boolean
  data?: INft
}

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api'
  }),
  endpoints: builder => ({
    getNft: builder.query<NftServerResponse, string>({
      query: id => `/nft/${id}`
    }),

    createNft: builder.mutation<NftServerResponse, INft>({
      query: (data) => ({
        url: '/nft',
        method: 'POST',
        body: data
      })
    })
  })
})

// Export hooks for usage in functional components
export const { useGetNftQuery, useCreateNftMutation } = apiSlice
