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
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { blogPosts } from "../../data/blog-posts";
import { FaHome } from "react-icons/fa";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const sortedPosts = [...blogPosts].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setPosts(sortedPosts);
  }, []);

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
                    {new Date(post.date).toLocaleDateString()}
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
        bottom={{ base: "30px", md: "60px" }} // Adjusted bottom positioning
        left="50%"
        transform="translateX(-50%)"
        zIndex={2}
      >
        <NextLink href="/" passHref>
          <IconButton
            aria-label="Go to Homepage"
            icon={<Icon as={FaHome} boxSize={6} />}
            variant="outline" // Use outline variant for the border
            borderColor="#555" // Set initial border color
            color="#AEAEAE" // Set initial icon color
            size="lg"
            isRound={true} // Ensure it's circular
            transition="all 0.2s ease-in-out" // Transition all properties
            _hover={{
              borderColor: "brand.green", // Change border color on hover
              color: "brand.green", // Change icon color on hover
              bg: "rgba(19, 255, 0, 0.05)", // Optional subtle bg tint on hover
              transform: "scale(1.05) translateY(-2px)", // Scale and slight lift
            }}
            _active={{
              borderColor: "brand.green", // Keep border green
              color: "brand.green", // Keep icon green
              bg: "rgba(19, 255, 0, 0.1)", // Darker bg tint on active
              transform: "scale(1.0) translateY(0)", // Reset transform on active
            }}
          />
        </NextLink>
      </Box>
    </VStack>
  );
}

export default Blog;
