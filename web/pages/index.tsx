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
  Box,
  Container,
  Text,
  HStack,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/button";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Post } from "../types";
import Link from "next/link";

export default function Home() {
  const dark = "grey.400";
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("white", dark);

  const [posts, setposts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setposts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Flex
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
            alignItems="center"
            justifyContent="center"
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
            SignUp
          </Button>
          <Button marginRight={2} marginLeft={2} marginTop={2}>
            Login
          </Button>
        </Flex>
      </Flex>
      <VStack>
        <Flex>
          <Heading size="md" fontWeight="medium" paddingTop={2}>
            Recent Posts
          </Heading>
        </Flex>
        <VStack w={400}>
          {posts.map((post) => (
            <Container
              key={post.identifier}
              background="gray.200"
              maxW="full"
              minH={200}
              centerContent
              marginTop={4}
              mb={2}
              rounded={6}
            >
              <Box
                bg="gray.100"
                rounded={6}
                mt={2}
                mb={2}
                minW={380}
                minH={18}
                maxH="fit-content"
                padding={2}
                fontStyle="italic"
                fontWeight="semibold"
              >
                <HStack>
                  <Text as="u">
                    <Link href={`/h/${post.subName}`}>
                      <a>/h/{post.subName}</a>
                    </Link>
                  </Text>
                  <Text fontWeight="light" as="sub" fontStyle="normal" fontSize={12}>
                  • Posted by 
                  </Text>
                  <Text fontSize={12} as="u">
                    <Link href={`/u/user`} > 
                      <a>/u/user</a>
                    </Link>
                  </Text>
                </HStack>
              </Box>
              <Box
                bg="gray.100"
                rounded={6}
                mb={2}
                minW={380}
                minH={150}
                maxH="fit-content"
                padding={2}
              >
                {post.body}
              </Box>
              <Box
                mb={2}
                minW={380}
                minH={4}
                maxH="fit-content"
                fontStyle="normal"
                fontWeight="light"
                fontSize={14}
              >
                Posted on: {post.createdAt}
              </Box>
            </Container>
          ))}
        </VStack>
      </VStack>
    </div>
  );
}
