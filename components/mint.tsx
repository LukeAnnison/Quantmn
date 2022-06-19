import { Box, Heading, Text, Stack, Center, Button } from '@chakra-ui/react'
import Image from 'next/image'
import { useDeleteQuarkMutation } from '../store/apiSlice'

interface Props {
  name: string
  description?: String
  key: number
  price: Number
  thumbnail: StaticImageData
  id: string
}

const Mint = ({
  name,
  key,
  price,
  description,
  id = 'Utilities and Benefits: You get all this amazing stuff etc etc',
  thumbnail
}: Props) => {
  const [deleteQuark] = useDeleteQuarkMutation()

  const handleDelete = async id => {
    try {
        console.log({id})
      await deleteQuark(id)
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
      <Box p="4">
        <Stack spacing={4} align="center">
          <Heading>
            {name} {key}
          </Heading>
          <Text fontSize="md">{price} ETH</Text>
        </Stack>
        <Image src={thumbnail} alt={'mint'} />
        <Box>
          <Text fontSize="md">{description} </Text>
          <Button colorScheme="whatsapp" size="lg" width="100%">
            Mint
          </Button> 
          <Button
            onClick={() => handleDelete(id)}
            style={{ marginTop: '10px' }}
            colorScheme="whatsapp"
            size="lg"
            width="100%"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Mint
