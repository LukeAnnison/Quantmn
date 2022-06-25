import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../utils/dbConnect'
import Quark from '../../../models/quark'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body,
    method,
    query: { id }
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const quarks = await Quark.find({})

        if (!quarks) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: quarks })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'POST':
      try {
        const { name, description, price, file } = body

        const newQuark = await Quark.create({
          created_at: Date.now(),
          name,
          description,
          price,
          file,
          // set todayComplete with default false
          todayComplete: false
        })

        res.status(201).json(newQuark)
      } catch (error: any) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
      }
      break

    case 'PATCH':
      try {
        const quark = await Quark.findOneAndUpdate({ _id: id }, body, {
          new: true
        })

        if (!quark) {
          return res
            .status(400)
            .json({ success: false, message: 'Quark does not exist' })
        }

        res.status(200).json({ success: true, data: quark })
      } catch (error: any) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
      }
      break

    case 'DELETE':
      try {
        const quark = await Quark.findOne({ _id: id })

        if (!quark) {
          return res
            .status(400)
            .json({ success: false, message: 'Quark does not exist' })
        }

        quark.remove()

        res.status(200).json({ quark })
      } catch (error) {
        res.status(400).json({ success: false, message: error })
      }
      break
    default:
      return res.status(200).json({ success: true })
  }
}
