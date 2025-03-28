import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Link,
  Container,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

function Blog() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt:
        "Learn the fundamentals of web development and start your journey...",
      date: "2024-03-28",
      slug: "getting-started-with-web-development",
    },
    {
      id: 2,
      title: "The Future of Frontend Development",
      excerpt:
        "Exploring the latest trends and technologies in frontend development...",
      date: "2024-03-27",
      slug: "future-of-frontend-development",
    },
  ];

  return (
    <VStack
      bg={"#161616"}
      minH="100vh"
      position={"relative"}
      overflow="hidden"
      id="blog"
    >
      <Text
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "32px", md: "80px", lg: "120px" }}
        position={"absolute"}
        right={{ base: "-10", md: "-70", lg: "-130" }}
        top="0"
        userSelect={"none"}
      >
        BLOG
      </Text>

      <Text
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "32px", md: "80px", lg: "120px" }}
        position={"absolute"}
        left={{ base: "-10", md: "-70", lg: "-130" }}
        bottom="0"
        userSelect={"none"}
      >
        BLOG
      </Text>

      <Container maxW="container.xl" pt="100px" pb="50px">
        <Heading
          fontWeight={700}
          color={"white"}
          fontSize={{ base: "23px", lg: "37.5px" }}
        >
          LATEST POSTS
        </Heading>
        <Box
          bg="brand.green"
          height={"3px"}
          width="65px"
          borderRadius={"10px"}
        />

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={8}
          w={{ base: "90%", md: "80%" }}
          pt="40px"
        >
          {blogPosts.map((post) => (
            <Link
              as={NextLink}
              href={`/blog/${post.slug}`}
              key={post.id}
              _hover={{ textDecoration: "none" }}
              style={{ cursor: "pointer" }}
            >
              <Box
                bg="brand.black"
                p={6}
                borderRadius="10px"
                transition="all 0.3s"
                cursor="pointer"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0 4px 20px rgba(19, 255, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <Text color="brand.green" fontSize="sm" mb={2}>
                  {new Date(post.date).toLocaleDateString()}
                </Text>
                <Heading color="white" fontSize="xl" mb={3}>
                  {post.title}
                </Heading>
                <Text color="#8F8F8F" fontSize="md">
                  {post.excerpt}
                </Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Container>
    </VStack>
  );
}

export default Blog;
