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
import ReactMarkdown from "react-markdown";

function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [headings, setHeadings] = useState([]);

  // Example blog post data - you can replace this with actual data fetching
  const post = {
    title: "Getting Started with Web Development",
    content: `
Web development is an exciting field that combines creativity with technical skills. In this post, we'll explore the fundamentals of web development and how to get started.

## What is Web Development?

Web development is the process of building websites and web applications. It involves both frontend development (what users see) and backend development (server-side logic).

## Essential Technologies

To get started with web development, you'll need to learn:

- HTML - Structure
- CSS - Styling
- JavaScript - Interactivity

## Frontend Development

Frontend development focuses on creating the user interface and experience. Here are some key concepts:

- Responsive Design - Making websites work on all devices
- CSS Frameworks - Bootstrap, Tailwind, etc.
- JavaScript Frameworks - React, Vue, Angular
- State Management - Redux, Context API

## Backend Development

Backend development handles server-side logic and data management. Important areas include:

- Server Languages - Node.js, Python, PHP
- Databases - MySQL, MongoDB, PostgreSQL
- API Development - REST, GraphQL
- Authentication & Security

## Development Tools

Modern web development relies on various tools and practices:

- Version Control - Git and GitHub
- Package Managers - npm, yarn
- Build Tools - Webpack, Vite
- Code Editors - VS Code, Sublime Text

## Best Practices

Following best practices is crucial for maintaining high-quality code:

- Clean Code Principles
- Testing - Unit Tests, Integration Tests
- Performance Optimization
- Accessibility Standards
- SEO Best Practices

## Getting Started

Here's how you can begin your web development journey:

1. Learn HTML, CSS, and JavaScript basics
2. Build simple static websites
3. Study responsive design principles
4. Learn a frontend framework
5. Explore backend development
6. Practice with real projects
    `,
    date: "2024-03-28",
    author: "Dzikri Qalam Hatorangan",
  };

  useEffect(() => {
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
  }, [post.content]);

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
                      scrollMarginTop: "100px",
                    },
                    ul: {
                      pl: "1.5em",
                      mb: "1em",
                    },
                    li: {
                      mb: "0.5em",
                    },
                    ol: {
                      pl: "1.5em",
                      mb: "1em",
                    },
                    p: {
                      mb: "1em",
                    },
                  }}
                >
                  <ReactMarkdown
                    components={{
                      h2: ({ children }) => {
                        const id = children
                          .toString()
                          .toLowerCase()
                          .replace(/\s+/g, "-");
                        return <h2 id={id}>{children}</h2>;
                      },
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
