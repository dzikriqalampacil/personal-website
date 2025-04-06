import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Link as ChakraLink,
  Container,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { blogPosts } from "../../data/blog-posts";
import { FaHome } from "react-icons/fa";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticProps() {
  const posts = await Promise.all(
    blogPosts.map(async (post) => {
      const filePath = path.join(
        process.cwd(),
        "content/blog",
        `${post.slug}.md`
      );
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data: frontmatter, content } = matter(fileContents);

      return {
        ...post,
        ...frontmatter,
        content,
      };
    })
  );

  // Sort posts by date
  const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    props: {
      posts: sortedPosts,
    },
  };
}

function Blog({ posts }) {
  return (
    <VStack
      bg={"#161616"}
      minH="100vh"
      position={"relative"}
      overflowX="hidden"
      id="blog"
      pb={{ base: 16, md: 20 }}
    >
      <Text
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "60px", md: "80px", lg: "120px" }}
        position={"absolute"}
        right={{ base: "-30px", md: "-70", lg: "-130" }}
        top="10px"
        userSelect={"none"}
        zIndex={0}
        opacity={{ base: 0.5, md: 1 }}
        aria-hidden="true"
      >
        BLOG
      </Text>
      <Text
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "60px", md: "80px", lg: "120px" }}
        position={"absolute"}
        left={{ base: "-30px", md: "-70", lg: "-130" }}
        bottom="10px"
        userSelect={"none"}
        zIndex={0}
        opacity={{ base: 0.5, md: 1 }}
        aria-hidden="true"
      >
        BLOG
      </Text>

      <Container
        maxW="container.xl"
        pt={{ base: "60px", md: "80px" }}
        px={{ base: 4, md: 6 }}
        zIndex={1}
        position="relative"
        pb={{ base: 16, md: 20 }}
      >
        <Heading
          fontWeight={700}
          color={"white"}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
          lineHeight={{ base: 1.2, md: 1.1 }}
        >
          LATEST POSTS
        </Heading>
        <Box
          bg="brand.green"
          height={"3px"}
          width={{ base: "50px", md: "65px" }}
          borderRadius={"10px"}
          mt={2}
          mb={{ base: 8, md: 10 }}
        />

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 6, md: 8 }}
          width="100%"
        >
          {posts.map((post) => (
            <NextLink href={`/blog/${post.slug}`} key={post.id} passHref>
              <ChakraLink
                _hover={{ textDecoration: "none" }}
                display="block"
                height="100%"
              >
                <Box
                  bg="#1F1F1F"
                  p={6}
                  borderRadius="10px"
                  transition="all 0.2s ease-in-out"
                  cursor="pointer"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "0 5px 15px rgba(19, 255, 0, 0.15)",
                  }}
                >
                  <Text color="brand.green" fontSize="sm" mb={2}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </Text>
                  <Heading
                    color="white"
                    fontSize={{ base: "lg", md: "xl" }}
                    lineHeight={1.3}
                    mb={3}
                    flexGrow={0}
                  >
                    {post.title}
                  </Heading>
                  <Text
                    color="#AEAEAE"
                    fontSize="md"
                    lineHeight={1.6}
                    noOfLines={4}
                    flexGrow={1}
                  >
                    {post.summary ||
                      post.content
                        .split("\n")
                        .filter((line) => line.trim() && !line.startsWith("#"))
                        .slice(0, 2)
                        .join(" ")
                        .substring(0, 150) + "..."}
                  </Text>
                </Box>
              </ChakraLink>
            </NextLink>
          ))}
        </SimpleGrid>
      </Container>

      <Box
        position="absolute"
        bottom={{ base: "30px", md: "60px" }}
        left="50%"
        transform="translateX(-50%)"
        zIndex={2}
      >
        <NextLink href="/" passHref>
          <IconButton
            aria-label="Go to Homepage"
            icon={<Icon as={FaHome} boxSize={6} />}
            variant="outline"
            borderColor="#555"
            color="#AEAEAE"
            size="lg"
            isRound={true}
            transition="all 0.2s ease-in-out"
            _hover={{
              borderColor: "brand.green",
              color: "brand.green",
              bg: "rgba(19, 255, 0, 0.05)",
              transform: "scale(1.05) translateY(-2px)",
            }}
            _active={{
              borderColor: "brand.green",
              color: "brand.green",
              bg: "rgba(19, 255, 0, 0.1)",
              transform: "scale(1.0) translateY(0)",
            }}
          />
        </NextLink>
      </Box>
    </VStack>
  );
}

export default Blog;
