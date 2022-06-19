import {
  Heading,
  Box,
  Flex,
  Stack,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Icon,
  useBreakpointValue
} from '@chakra-ui/react'
import { useRef, useCallback } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'

import { useCreateQuarkMutation } from '../../store/apiSlice'
import { UploadDropzone } from '../../components/UploadDropzone'

import styles from './upload.module.scss'

interface Values {
  name: string
  description: string
  price: string
  song: {}
}

const Upload = () => {
  const [createQuark] = useCreateQuarkMutation()

  const handleSubmitData = async values => {
    console.log({ values })
    try {
      const data = {
        name: values.name,
        description: values.description,
        price: values.price,
        song: values.song
      }
      await createQuark(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOpenUploader = useCallback(() => {
    if (uploadSongRef.current) {
      uploadSongRef.current.hanleOpenUploader()
    }
  }, [])

  const uploadSongRef = useRef<any>(null)

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        price: '',
        song: {}
      }}
      enableReinitialize
      onSubmit={handleSubmitData}
    >
      {({ values, handleSubmit, setFieldValue, handleChange }) => (
        <>
          <Form>
            <Box position={'relative'}>
              <Container
                as={SimpleGrid}
                maxW={'7xl'}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}
              >
                <Stack spacing={{ base: 10, md: 20 }}>
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                  >
                    Create an QUARK{' '}
                    <Text
                      as={'span'}
                      bgGradient="linear(to-r, red.400,pink.400)"
                      bgClip="text"
                    >
                      &
                    </Text>{' '}
                    Earn and impact
                  </Heading>
                </Stack>
                <Stack
                  bg={'gray.50'}
                  rounded={'xl'}
                  p={{ base: 4, sm: 6, md: 8 }}
                  spacing={{ base: 8 }}
                  maxW={{ lg: 'lg' }}
                >
                  <Stack spacing={4}>
                    <Heading
                      color={'gray.800'}
                      lineHeight={1.1}
                      fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                    >
                      Create an QUARK
                      <Text
                        as={'span'}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text"
                      >
                        !
                      </Text>
                    </Heading>
                    <Text
                      color={'gray.500'}
                      fontSize={{ base: 'sm', sm: 'md' }}
                    ></Text>
                  </Stack>
                  <Box as={'form'} mt={10}>
                    <Stack spacing={4}>
                      <Input
                        name="name"
                        onChange={handleChange}
                        placeholder="Name"
                        bg={'gray.100'}
                        border={0}
                        color={'gray.500'}
                        _placeholder={{
                          color: 'gray.500'
                        }}
                      />

                      <Input
                        name="description"
                        onChange={handleChange}
                        placeholder="description"
                        bg={'gray.100'}
                        border={0}
                        color={'gray.500'}
                        _placeholder={{
                          color: 'gray.500'
                        }}
                      />
                      <Input
                        name="price"
                        type="number"
                        onChange={handleChange}
                        placeholder="ETH"
                        bg={'gray.100'}
                        border={0}
                        color={'gray.500'}
                        _placeholder={{
                          color: 'gray.500'
                        }}
                      />
                      <UploadDropzone
                        name="song"
                        acceptTypes=".mp3"
                        ref={uploadSongRef}
                        setFieldValue={setFieldValue}
                        data-cy="add-artist-song-file"
                        rejectedFileMsg="Only MP3 is accebtable"
                      />
                      <Button
                        onClick={handleOpenUploader}
                        className={styles.circle__button}
                        fontFamily={'heading'}
                        mt={8}
                        w={'full'}
                        bgColor={
                          values.song.length === 1 ? '#ed2869' : 'red.400'
                        }
                        color={'white'}
                        _hover={{
                          bgGradient: 'linear(to-r, red.400,pink.400)',
                          boxShadow: 'xl'
                        }}
                      >
                        Drag or Upload Image
                      </Button>
                    </Stack>
                    <Button
                      onClick={handleSubmit}
                      fontFamily={'heading'}
                      mt={8}
                      w={'full'}
                      bgColor={'#ed2869'}
                      color={'white'}
                      _hover={{
                        bgGradient: 'linear(to-r, red.400,pink.400)',
                        boxShadow: 'xl'
                      }}
                    >
                      Create
                    </Button>
                  </Box>
                  form
                </Stack>
              </Container>
              <Blur
                position={'absolute'}
                top={-10}
                left={-10}
                style={{ filter: 'blur(70px)' }}
              />
            </Box>
          </Form>
        </>
      )}
    </Formik>
  )
}

export const Blur = props => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  )
}

export default Upload
