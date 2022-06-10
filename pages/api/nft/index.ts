import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import Nft from '../../../models/nft'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, description, price, file },
    method
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const nfts = await Nft.find({})

        if (!nfts) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: nfts })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        console.log('FIRING')
        console.log({ name, description, price, file })
        const newNft = await Nft.create({
          created_at: Date.now(),
          name,
          description,
          price,
          file
        })

        res.status(201).json(newNft)
      } catch (error: any) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
      }
      break

    default:
      return res.status(200).json({ success: true })
  }
}
