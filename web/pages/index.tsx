import {
  VStack,
  Flex,
  Heading,
  useColorMode,
  useColorModeValue,
  Spacer,
  Input
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, SearchIcon, ChatIcon } from "@chakra-ui/icons";
import { Button, IconButton } from "@chakra-ui/button";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Post } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { GetServerSideProps } from "next";
import Card from "../components/card"

dayjs.extend(relativeTime)

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
        <Flex w="100%" marginTop={2}>
          <Heading
            ml="2"
            size="lg"
            fontSize="4xl"
            fontWeight="bold"
            color="black"
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
        <VStack w={500}>
          {posts.map((post) => (
            <Card post={post} key={post.identifier} />
          ))}
        </VStack>
      </VStack>
    </div>
  );
}

//sever side rendering
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get('/post')
//     return {
//       props: {posts: res.data}
//     }
//   } catch (error) {
//     return {props: {error: "Oops! Something went wrong :/"}}
//   }
// }
