import { useState } from 'react'
import {
  Heading,
  Box,
  SimpleGrid,
  Button,
  Center,
  Container
} from '@chakra-ui/react'
import {  map } from 'lodash'


import Quark from '../../models/quark'
import dbConnect from '../../utils/dbConnect'
import thumbYouTube from '../../public/images/links/youtube.png'
import thumbInkdrop from '../../public/images/works/inkdrop_eyecatch.png'
import phonebooth from '../../public/images/quarks/phonebooth.png'

const QUARKS = [
  { tier: 1, price: '0.15', thumbnail: phonebooth },
  { tier: 2, price: '0.5', thumbnail: thumbYouTube },
  { tier: 3, price: '2.15', thumbnail: thumbInkdrop },
  { tier: 1, price: '6', thumbnail: phonebooth }
]

const Today = ({ data }: any) => {
  const [todayList, setTodayList] = useState(data)

  const handleComplete = item => {
    console.log({todayList})
    const list = map(todayList, (quark) => {
       if (quark.name != item) {
        console.log({quark, item})
        return quark;
       }
    })
    console.log({list})
    setTodayList(list)
    console.log({todayList })
  }

  return data.map(quark => (
    <div style={{ display: 'flex' }}>
      <Button key={quark.id} onClick={e => handleComplete(e.currentTarget.textContent)}>
        {quark.name}
      </Button>
    </div>
  ))
}

export default Today

export async function getServerSideProps() {
  await dbConnect()

  /* find all the artists in our database, parse it, so readable by next */
  const response = await Quark.find({}).lean().select({
    name: 1,
    description: 1,
    price: 1,
    file: 1,
    _id: 1
  })

  if (!response) {
    return {
      notFound: true
    }
  }

  const data = JSON.parse(JSON.stringify(response))
  return { props: { data } }
}
