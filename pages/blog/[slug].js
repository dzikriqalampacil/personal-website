import {
  Box,
  Text,
  VStack,
  Heading,
  Link,
  Container,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "../../data/blog-posts";

function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [headings, setHeadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      const currentPost = blogPosts.find((p) => p.slug === slug);
      setPost(currentPost);

      if (currentPost) {
        // Function to extract headings from content
        const getHeadings = () => {
          const headings = [];
          const lines = currentPost.content.split("\n");

          lines.forEach((line) => {
            if (line.startsWith("## ")) {
              const text = line.replace("## ", "").trim();
              const id = text.toLowerCase().replace(/\s+/g, "-");
              headings.push({
                text,
                id,
              });
            }
          });

          setHeadings(headings);
        };

        getHeadings();
      }
    }
  }, [router.isReady, slug]);

  if (isLoading || !post) {
    return (
      <VStack
        bg={"#161616"}
        minH="100vh"
        position={"relative"}
        overflow="hidden"
        id="blog-post"
        justifyContent="center"
        alignItems="center"
      >
        <Text color="brand.green" fontSize="xl">
          Loading...
        </Text>
      </VStack>
    );
  }

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
        <HStack spacing={8} align="start">
          {/* Table of Contents */}
          <Box
            position="sticky"
            top="120px"
            w="250px"
            display={{ base: "none", lg: "block" }}
            p={4}
          >
            <Text color="brand.green" fontSize="sm" fontWeight="bold" mb={4}>
              Table of Contents
            </Text>
            <VStack spacing={3} align="start">
              {headings.map((heading) => (
                <Link
                  key={heading.id}
                  href={`#${heading.id}`}
                  color="#8F8F8F"
                  fontSize="sm"
                  pl={2}
                  borderLeft="2px solid transparent"
                  _hover={{
                    color: "brand.green",
                    borderLeftColor: "brand.green",
                  }}
                  transition="all 0.2s"
                >
                  {heading.text}
                </Link>
              ))}
            </VStack>
          </Box>

          {/* Main Content */}
          <Box flex={1}>
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
                  w="100%"
                  color="#8F8F8F"
                  fontSize="lg"
                  lineHeight="1.8"
                  sx={{
                    "& img": {
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      margin: "2rem 0",
                      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                    "& h2": {
                      color: "white",
                      fontSize: "2xl",
                      fontWeight: "bold",
                      marginTop: "2rem",
                      marginBottom: "1rem",
                    },
                    "& ul, & ol": {
                      marginLeft: "1.5rem",
                      marginBottom: "1rem",
                    },
                    "& li": {
                      marginBottom: "0.5rem",
                    },
                    "& p": {
                      marginBottom: "1rem",
                    },
                  }}
                >
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => {
                        const id = children
                          .toString()
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)/g, "");
                        return (
                          <h2 id={id} style={{ scrollMarginTop: "100px" }}>
                            {children}
                          </h2>
                        );
                      },
                      img: ({ src, alt }) => (
                        <Box width="100%" margin="2rem 0">
                          <Image
                            src={src}
                            alt={alt}
                            width={1200}
                            height={675}
                            style={{
                              width: "100%",
                              height: "auto",
                              borderRadius: "10px",
                              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                            }}
                          />
                        </Box>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </Box>
              </Box>

              <Box mt={8}>
                <Link
                  href="/blog"
                  color="brand.green"
                  display="inline-block"
                  transition="all 0.2s"
                  _hover={{
                    textDecoration: "none",
                    textShadow: "0 0 12px rgba(19, 255, 0, 0.6)",
                    transform: "translateX(-4px)",
                  }}
                  fontSize="md"
                  fontWeight="medium"
                >
                  ← Back to Blog
                </Link>
              </Box>
            </VStack>
          </Box>
        </HStack>
      </Container>
    </VStack>
  );
}

export default BlogPost;
