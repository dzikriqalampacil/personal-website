import { Box, Text, VStack, Heading, Link, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;

  // Example blog post data - you can replace this with actual data fetching
  const post = {
    title: "Getting Started with Web Development",
    content: `
            <p>Web development is an exciting field that combines creativity with technical skills. In this post, we'll explore the fundamentals of web development and how to get started.</p>
            
            <h2>What is Web Development?</h2>
            <p>Web development is the process of building websites and web applications. It involves both frontend development (what users see) and backend development (server-side logic).</p>
            
            <h2>Essential Technologies</h2>
            <p>To get started with web development, you'll need to learn:</p>
            <ul>
                <li>HTML - Structure</li>
                <li>CSS - Styling</li>
                <li>JavaScript - Interactivity</li>
            </ul>
        `,
    date: "2024-03-28",
    author: "Dzikri Qalam Hatorangan",
  };

  return (
    <VStack
      bg={"#161616"}
      minH="100vh"
      position={"relative"}
      overflow="hidden"
      id="blog-post"
    >
      <Text
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "42px", md: "100px", lg: "150px" }}
        position={"absolute"}
        right={{ base: "-10", md: "-70", lg: "-130" }}
        top="0"
        userSelect={"none"}
      >
        BLOG
      </Text>

      <Container maxW="container.md" pt="100px" pb="50px">
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading
              fontWeight={700}
              color={"white"}
              fontSize={{ base: "23px", lg: "37.5px" }}
              mb={4}
            >
              {post.title}
            </Heading>

            <Box mb={8}>
              <Text color="brand.green" fontSize="sm" mb={2}>
                {new Date(post.date).toLocaleDateString()}
              </Text>
              <Text color="#8F8F8F" fontSize="sm">
                By {post.author}
              </Text>
            </Box>

            <Box
              color="#8F8F8F"
              fontSize="md"
              lineHeight="1.8"
              sx={{
                h2: {
                  color: "white",
                  fontSize: "xl",
                  fontWeight: "bold",
                  mt: "2em",
                  mb: "0.5em",
                },
                ul: {
                  pl: "1.5em",
                  mb: "1em",
                },
                li: {
                  mb: "0.5em",
                },
              }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Box>

          <Box mt={8}>
            <Link
              as={NextLink}
              href="/blog"
              color="brand.green"
              display="inline-block"
              _hover={{ textDecoration: "none", color: "brand.green.500" }}
              fontSize="md"
              fontWeight="medium"
            >
              ← Back to Blog
            </Link>
          </Box>
        </VStack>
      </Container>
    </VStack>
  );
}

export default BlogPost;
