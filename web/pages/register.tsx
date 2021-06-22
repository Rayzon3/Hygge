import { Button, Flex, Heading, Input, useColorMode, useColorModeValue } from "@chakra-ui/react"
import Router from "next/router"
import Link from "next/link"


const RegisterPage = () => {

    const { toggleColorMode } = useColorMode()
    const formBackground = useColorModeValue("telegram.100", "grey.400")

    return(
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6} textColor="teal">Register!</Heading>
                <Input name="email" textColor="white" placeholder="Email" variant="filled" mb={3} type="email"/>
                <Input name="username" textColor="white" placeholder="Username" variant="filled" mb={3} type="text"/>
                <Input  name="password" textColor="white" placeholder="Password" variant="filled" mb={3} type="password"/>
                <Button type="submit" colorScheme="teal" mb={6}>Register</Button>
                <Flex mb={4} textColor="teal">
                <Link href="/login"><a>Already a user? Login</a></Link>
                </Flex>
                <Button onClick={toggleColorMode} > Toggle Theme </Button>
            </Flex>
        </Flex>
    )
}

export default RegisterPage;