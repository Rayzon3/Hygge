import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import Axios from "axios"

Axios.defaults.baseURL = "http://localhost:5000/api" 


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
    
  )
}
export default MyApp
