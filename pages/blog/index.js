import {
  Box,
  Text,
  VStack,
  Heading,
  SimpleGrid,
  Link,
  Container,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { blogPosts } from "../../data/blog-posts";

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Sort posts by date, newest first
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
      overflowX="hidden" // Prevent horizontal overflow
      id="blog"
      pb={{ base: 16, md: 20 }} // Match bottom padding from detail page
    >
      {/* --- Background Text - Synced with Detail Page --- */}
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
      >
        BLOG
      </Text>

      {/* --- Container - Synced with Detail Page --- */}
      <Container
        maxW="container.xl"
        pt={{ base: "60px", md: "80px" }} // Responsive top padding
        pb="50px"
        px={{ base: 4, md: 6 }} // Responsive horizontal padding
        zIndex={1}
        position="relative"
      >
        {/* --- Main Heading - Synced with Detail Page H1 equivalent --- */}
        <Heading
          fontWeight={700}
          color={"white"}
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} // Match detail page H1 size
          lineHeight={{ base: 1.2, md: 1.1 }} // Match detail page H1 line height
        >
          LATEST POSTS
        </Heading>
        {/* --- Underline --- */}
        <Box
          bg="brand.green"
          height={"3px"}
          width={{ base: "50px", md: "65px" }} // Slightly smaller on base
          borderRadius={"10px"}
          mt={2} // Add small top margin
          mb={{ base: 8, md: 10 }} // Add bottom margin to space from grid
        />

        {/* --- Blog Post Grid --- */}
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 6, md: 8 }} // Slightly less spacing on mobile
          // Removed fixed width 'w' prop - Container padding handles width now
        >
          {posts.map((post) => (
            <Link
              as={NextLink}
              href={`/blog/${post.slug}`}
              key={post.id}
              _hover={{ textDecoration: "none" }} // Ensure no underline on hover for the link itself
              display="block" // Ensure link takes up block space for proper hover on card
            >
              <Box
                bg="brand.black" // Use a slightly distinct background if needed, e.g., #1F1F1F
                p={6}
                borderRadius="10px"
                transition="all 0.2s ease-in-out" // Standardized transition
                cursor="pointer"
                height="100%" // Make cards in a row equal height if needed
                display="flex" // Use flex for better internal alignment
                flexDirection="column" // Stack content vertically
                _hover={{
                  transform: "translateY(-4px)", // Slightly less dramatic lift
                  boxShadow: "0 5px 15px rgba(19, 255, 0, 0.15)", // Adjusted shadow
                }}
              >
                {/* --- Post Metadata --- */}
                <Text color="brand.green" fontSize="sm" mb={2}>
                  {new Date(post.date).toLocaleDateString()}
                </Text>
                {/* --- Post Title --- */}
                <Heading
                  color="white"
                  fontSize={{ base: "lg", md: "xl" }} // Responsive title size (lg/xl)
                  lineHeight={1.3} // Add line height
                  mb={3}
                  flexGrow={0} // Prevent title from growing excessively if card height forces it
                >
                  {post.title}
                </Heading>
                {/* --- Post Excerpt --- */}
                <Text
                  color="#AEAEAE" // Match detail page content color
                  fontSize="md" // Keep excerpt slightly smaller than main content
                  lineHeight={1.6} // Adjust line height for excerpt
                  noOfLines={4} // Limit excerpt to 4 lines with ellipsis
                  flexGrow={1} // Allow excerpt to fill remaining space (pushes date/title up)
                >
                  {/* Use a summary field if available, otherwise grab first few lines */}
                  {post.summary ||
                    post.content
                      .split("\n")
                      .filter((line) => line.trim() && !line.startsWith("#"))
                      .slice(0, 2)
                      .join(" ")
                      .substring(0, 150) + "..."}
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
