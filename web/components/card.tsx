import {
    Icon,
    Box,
    Container,
    Text,
    HStack,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Post } from "../types";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { ChatIcon } from "@chakra-ui/icons";

dayjs.extend(relativeTime)

interface cardProps {
    post: Post
}

export default function card ({ post }) {
    return(
        <Container
              key={post.identifier}
              background="gray.200"
              maxW="full"
              maxH="fit-content"
              centerContent
              marginTop={4}
              mb={2}
              rounded={8}
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
                    <Link href={`/u/${post.username}`} > 
                        <a>/u/{post.username}</a>
                    </Link>
                  </Text>
                </HStack>
              </Box>
              <Box
                bg="gray.100"
                rounded={6}
                mb={2}
                minW={380}
                maxH="fit-content"
                padding={2}
              > 
                <Text fontSize={18} fontWeight="semibold">
                <Link href={post.url}>
                  <a>{post.title}</a>
                </Link>
                </Text>
                {post.body}
              </Box>
              <Box
                mb={2}
                minW={480}
                minH={4}
                maxH="fit-content"
                fontStyle="normal"
                fontWeight="light"
                fontSize={14}
              >
                <HStack>
                  <Text>
                  Posted: {dayjs(post.createdAt).fromNow()}
                    <IconButton isRounded={true} background={"gray.200"}>
                      <Icon as={ChatIcon} w={4} h={4} ></Icon>
                    </IconButton>
                  </Text>
                </HStack>
              </Box>
            </Container>
    )
}