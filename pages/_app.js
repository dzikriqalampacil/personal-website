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
        <meta name='description' content="Hello! my name is Dzikri Qalam Hatorangan and currently I am pursuing Computer Science degree at Universitas Indonesia. I am passionate about software development especially as Front-end Engineer and Back-end Engineer. I really like different projects that solve real problems." />

        <meta property="og:image" content="/assets/personal-web.png" />
        <meta property="og:title" content="Dzikri Qalam Hatorangan" />
        <meta property="og:description" content="This is my personal website. My name is Dzikri Qalam Hatorangan and currently I am pursuing Computer Science degree at Universitas Indonesia. I am passionate about software development especially as Front-end Engineer and Back-end Engineer. I really like different projects that solve real problems." />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp