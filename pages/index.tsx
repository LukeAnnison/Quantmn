import {
  Heading,
  Box,
  SimpleGrid,
  Button,
  Center,
  Container
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { random } from 'lodash'
import Layout from '../components/layouts/article'

import { GridItem } from '../components/grid-item'
import Mint from '../components/mint'

import Nft from '../models/nft'
import dbConnect from '../utils/dbConnect'
import banner from '../public/images/banner.png'
import thumbYouTube from '../public/images/links/youtube.png'
import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png'
import phonebooth from '../public/images/nfts/phonebooth.png'

const NFTS = [
  { tier: 1, price: '0.15', thumbnail: phonebooth },
  { tier: 2, price: '0.5', thumbnail: thumbYouTube },
  { tier: 3, price: '2.15', thumbnail: thumbInkdrop },
  { tier: 1, price: '6', thumbnail: phonebooth }
]

interface Props {}

const Home = ({ data }: any) => {
  const router = useRouter()
  const handleAdd = () => {
    console.log('add')
    router.push('/create')
  }
  console.log({ data })

  const nfts = data

  return (
    <Layout>
      <Container maxW="full">
        <GridItem thumbnail={banner}></GridItem>
        <Box display={{ md: 'flex' }}>
          <Box flexGrow={1}>
            <Center>
              <Heading as="h1" size="2xl" mb={4}>
                THE MINT
              </Heading>
            </Center>
          </Box>
        </Box>
        <SimpleGrid columns={[1, 4, 4]} gap={2}>
          {nfts.map((nft, index) => (

              <Mint
                  key={nft.key}
                  name={nft.name}
                  price={nft.price}
                  thumbnail={NFTS[random(3)].thumbnail}
                />
          ))}
        </SimpleGrid>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <Button
            onClick={handleAdd}
            style={{ width: '30%', backgroundColor: '#4fb3cf' }}
          >
            Add NFT
          </Button>
        </div>
      </Container>
    </Layout>
  )
}

export default Home

export async function getServerSideProps() {
  await dbConnect()

  /* find all the artists in our database, parse it, so readable by next */
  const response = await Nft.find({}).lean().select({
    name: 1,
    description: 1,
    price: 1,
    file: 1
  })

  if (!response) {
    return {
      notFound: true
    }
  }

  const data = JSON.parse(JSON.stringify(response))
  return { props: { data } }
}
