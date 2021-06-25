import {
  VStack,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Spacer,
  Input,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/button";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const dark = "grey.400";
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("white", dark);

  return (
    <VStack
      padding={2}
      background={formBackground}
      justifyContent="center"
      alignContent="center"
    >
      <Flex w="100%">
        <Heading
          ml="2"
          size="lg"
          fontSize="4xl"
          fontWeight="bold"
          color="teal.400"
          marginTop={2}
        >
          Hygge
        </Heading>
        <Input
          type="sm"
          placeholder="Search"
          focusBorderColor="teal.200"
          isInvalid={false}
          errorBorderColor="crimson"
          marginLeft={60}
          marginRight={60}
          marginTop={2}
        />
        <Spacer />
        <IconButton
          icon={<SunIcon w={5} h={5} />}
          isRound={true}
          onClick={toggleColorMode}
          marginTop={2}
        ></IconButton>
        <Button marginRight={2} marginLeft={2} marginTop={2}>
          LogOut
        </Button>
      </Flex>
    </VStack>
  );
}
