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
  Container
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/button";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Post } from "../types";

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
            <Container key={post.identifier} background="gray.200" maxW="full" centerContent>
              {post.body}
            </Container>
          ))}
        </VStack>
      </VStack>
    </div>
  );
}
