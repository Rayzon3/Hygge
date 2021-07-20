import {
    Icon,
    Box,
    Container,
    Text,
    HStack,
    Spacer,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/button";
import { Post } from "../types";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import { ChatIcon } from "@chakra-ui/icons";
import Axios from "axios";

dayjs.extend(relativeTime)

interface CardProps {
    post: Post
}

export default function Card ({ post: { identifier, title, slug, subName, createdAt, updatedAt, username, body, url, totalVotes, countComment, userVote } }: CardProps) {

  const vote = async (value : number) => {
    try {
      const res = await Axios.post("/misc/vote", {
        identifier,
        slug,
        value
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

    return(
        <Container boxShadow="xl"
              key={identifier}
              background="gray.200"
              maxW="full"
              maxH="fit-content"
              centerContent
              marginTop={4}
              marginBottom={4}
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
                    <Link href={`/h/${subName}`}>
                      <a>/h/{subName}</a>
                    </Link>
                  </Text>
                  <Text fontWeight="light" as="sub" fontStyle="normal" fontSize={12}>
                  • Posted by 
                  </Text>
                  <Text fontSize={12} as="u">
                    <Link href={`/u/${username}`} > 
                        <a>/u/{username}</a>
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
                <Link href={url}>
                  <a>{title}</a>
                </Link>
                </Text>
                {body}
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
                  <Text colorScheme="cyan" fontWeight="medium">
                  Posted: {dayjs(createdAt).fromNow()}
                    <IconButton icon={<ChatIcon/>} background="gray.200" colorScheme="cyan" isRounded={true} variant="ghost" marginLeft={4} />
                    {countComment}
                  </Text>
                  <Spacer/>
                  {/* upvote */}
                  <IconButton backgroundColor="gray.200" isRound={true} colorScheme="cyan" variant="ghost" onClick={() => vote(1)}>
                    <i className="icon-up-vote"></i>
                  </IconButton>
                  <Text color="black" fontWeight="semibold" fontSize={18}>{totalVotes}</Text>
                   {/* downvote */}
                   <IconButton backgroundColor="gray.200" isRound={true} colorScheme="cyan" variant="ghost" onClick={() => vote(-1)}>
                    <i className="icon-down-vote"></i>
                  </IconButton>
                </HStack>
              </Box>
            </Container>
    )
}