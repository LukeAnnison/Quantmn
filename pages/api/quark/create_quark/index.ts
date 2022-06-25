import type { NextApiRequest, NextApiResponse } from 'next'

import dbConnect from '../../../../utils/dbConnect'
import Quark from '../../../../models/quark'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    body: { name, description, price, file },
    method,
    query: { id },
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
        const newQuark = await Quark.create({
          created_at: Date.now(),
          name,
          description,
          price,
          file,
          today_complete: false
        })

        res.status(201).json(newQuark)
      } catch (error: any) {
        console.log(error)
        return res.status(400).json({ success: false, message: error.message })
      }
      break

    case 'DELETE':
        try {
            console.log('deleting')
            console.log({id})
            const quark = await Quark.findOne({ _id: id });
    
            if (!quark) {
              return res
                .status(400)
                .json({ success: false, message: 'Quark does not exist' });
            }
    
            quark.remove();
    
    
            res.status(200).json({ quark });
          } catch (error) {
            res.status(400).json({ success: false, message: error });
          }
          break;
    default:
      return res.status(200).json({ success: true })
  }
}
