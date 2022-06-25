import type { NextApiRequest, NextApiResponse } from 'next'
import { isString } from 'lodash';

import dbConnect from '../../../utils/dbConnect'
import Quark from '../../../models/quark'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    query: { filters }
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        console.log('YEPYEP', filters)
        const query = isString(filters) ? JSON.parse(filters) : {}
        console.log({query})

        const quarks = await Quark.find(query)
        console.log('GETTING QUARKS', quarks)

        if (!quarks) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json(quarks);
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      return res.status(200).json({ success: true })
  }
}
