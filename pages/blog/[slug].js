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

function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [headings, setHeadings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Example blog post data - you can replace this with actual data fetching
  const post = {
    title: "Getting Started with Web Development",
    content: `## Introduction
Web development is an exciting journey that combines creativity with technical skills. In this post, we'll explore the fundamentals of web development and how to get started.

![Test Image](/favicon.png)

## The Basics
When starting with web development, it's important to understand the core technologies:

1. HTML - Structure
2. CSS - Styling
3. JavaScript - Interactivity

![Test Image 2](/favicon.png)

## Next Steps
After mastering the basics, you can move on to more advanced topics like:

- React and modern frameworks
- Backend development
- Database management
- Deployment strategies

Remember, the key to success in web development is consistent practice and staying updated with the latest technologies.`,
    date: "2024-03-28",
    author: "Dzikri Qalam Hatorangan",
  };

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      // Function to extract headings from content
      const getHeadings = () => {
        const headings = [];
        const lines = post.content.split("\n");

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
  }, [router.isReady, post.content]);

  if (isLoading) {
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
