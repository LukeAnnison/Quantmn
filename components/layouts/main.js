import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" p={4}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Luke's homepage" />
        <meta name="author" content="Luke Annison " />
        <meta name="author" content="luke" />

        <meta name="twitter:title" content="Luke Annison " />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@luke" />
        <meta name="twitter:creator" content="@luke" />
        <meta name="twitter:image" content="images/logo" />
        <meta property="og:site_name" content="Luke Annison " />
        <meta name="og:title" content="Luke Annison " />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.craftz.dog/card.png" />
        <title>Takuya Matsuyama - Homepage</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.xl" pt={14}>
        {children}
        <Footer />
      </Container>
    </Box>
  )
}

export default Main
