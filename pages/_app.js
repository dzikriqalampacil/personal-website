import { ChakraProvider } from '@chakra-ui/react'
import theme from '../ui/theme'
import '@fontsource/poppins'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp