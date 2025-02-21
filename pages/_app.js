import { ChakraProvider } from '@chakra-ui/react'
import theme from '../ui/theme'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <title>Dzikri Qalam Hatorangan</title>
        <meta name='description' content="A personal website where I can showcase of my projects, and some of my experiences. You can contact me too if you like." />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />

        <meta property="og:image" content="/assets/personal.jpg" />
        <meta property="og:title" content="Dzikri Qalam Hatorangan" />
        <meta property="og:description" content="A personal website where I can showcase of my projects, and some of my experiences. You can contact me too if you like." />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp