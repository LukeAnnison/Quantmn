import { Box, Heading, Text, Stack, Center, Button } from '@chakra-ui/react'
import Image from 'next/image'
import phonebooth from '../public/images/nfts/phonebooth.png'

interface Props {
    name: string,
    description?: String,
    key: number,
    price: Number,
    thumbnail: StaticImageData,
}

const Mint = ({ name, key, price, description =             'Utilities and Benefits: You get all this amazing stuff etc etc', thumbnail }: Props) => {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
      <Box p="4">
        <Stack spacing={4} align="center">
          <Heading>{name} {key}</Heading>
          <Text fontSize="md">{price} ETH</Text>
        </Stack>
        <Image src={thumbnail} alt={'mint'} />
        <Box>
          <Text fontSize="md">
{description}          </Text>
          <Button colorScheme="whatsapp" size="lg" width="100%">
            Mint
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Mint
