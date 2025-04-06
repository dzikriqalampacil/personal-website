import {
  Box,
  Text,
  VStack,
  Heading,
  Link,
  Container,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "../../data/blog-posts";
import throttle from "lodash.throttle";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getStaticPaths() {
  return {
    paths: blogPosts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);

  return {
    props: {
      post: {
        ...frontmatter,
        content,
        slug,
      },
    },
  };
}

function BlogPost({ post }) {
  const router = useRouter();
  const { slug } = router.query;
  const [headings, setHeadings] = useState([]);
  const [activeHeadingId, setActiveHeadingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const headingElementsRef = useRef({});

  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);

      if (post) {
        const getHeadings = () => {
          const headingsArr = [];
          const lines = post.content.split("\n");
          const tempHeadingMap = {};

          lines.forEach((line) => {
            if (line.startsWith("## ")) {
              const text = line.replace("## ", "").trim();
              let id = text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              let counter = 1;
              let potentialId = id;
              while (tempHeadingMap[potentialId]) {
                counter++;
                potentialId = `${id}-${counter}`;
              }
              id = potentialId;
              tempHeadingMap[id] = true;
              headingsArr.push({
                text,
                id,
              });
            }
          });
          setHeadings(headingsArr);
        };
        getHeadings();
      } else {
        setHeadings([]);
      }
    }
  }, [router.isReady, post]);

  useEffect(() => {
    if (!headings.length) return;

    const calculateOffsets = () => {
      const offsets = {};
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          offsets[id] = rect.top + window.scrollY;
        }
      });
      headingElementsRef.current = offsets;
    };

    const timeoutId = setTimeout(calculateOffsets, 100);

    const scrollOffset = 110;
    const bottomScrollBuffer = 50;

    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const pageBottom =
        document.documentElement.scrollHeight - window.innerHeight;
      let currentActiveId = null;

      if (currentScrollY >= pageBottom - bottomScrollBuffer) {
        currentActiveId = headings[headings.length - 1]?.id || null;
      } else {
        const headingIds = Object.keys(headingElementsRef.current);
        for (let i = headingIds.length - 1; i >= 0; i--) {
          const id = headingIds[i];
          const offsetTop = headingElementsRef.current[id];

          if (offsetTop && currentScrollY >= offsetTop - scrollOffset) {
            currentActiveId = id;
            break;
          }
        }
      }

      setActiveHeadingId((prevId) => {
        return currentActiveId;
      });
    }, 150);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [headings]);

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
    <VStack bg={"#161616"} minH="100vh" position={"relative"} id="blog-post">
      <Text
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "32px", md: "80px", lg: "120px" }}
        position={"absolute"}
        right={{ base: "-10", md: "-70", lg: "-130" }}
        top="0"
        userSelect={"none"}
        zIndex={0}
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
        zIndex={0}
      >
        BLOG
      </Text>

      <Container
        maxW="container.xl"
        pt={{ base: "60px", md: "80px" }}
        pb="50px"
        zIndex={1}
        position="relative"
      >
        <HStack spacing={20} align="start">
          <Box
            position="sticky"
            top={{ base: "60px", lg: "40px" }}
            w="300px"
            display={{ base: "none", lg: "block" }}
            p={4}
            pr={8}
            alignSelf="flex-start"
          >
            <Text color="brand.green" fontSize="lg" fontWeight="bold" mb={5}>
              Table of Contents
            </Text>
            <Box
              maxH="calc(100vh - 200px)"
              overflowY="auto"
              css={{
                "&::-webkit-scrollbar": {
                  width: "4px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#161616",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#444",
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <Box pb={8}>
                <VStack spacing={4} align="start">
                  {headings.map((heading) => {
                    const isActive = heading.id === activeHeadingId;
                    return (
                      <Link
                        key={heading.id}
                        href={`#${heading.id}`}
                        color={isActive ? "brand.green" : "#8F8F8F"}
                        fontSize="md"
                        pl={2}
                        borderLeft="3px solid"
                        borderLeftColor={
                          isActive ? "brand.green" : "transparent"
                        }
                        lineHeight="1.4"
                        fontWeight={isActive ? "bold" : "normal"}
                        textDecoration="none"
                        transition="color 0.15s ease-in-out, border-color 0.15s ease-in-out, font-weight 0.15s ease-in-out"
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveHeadingId(heading.id);
                          const targetElement = document.getElementById(
                            heading.id
                          );
                          if (targetElement) {
                            const offset = 100;
                            const bodyRect =
                              document.body.getBoundingClientRect().top;
                            const elementRect =
                              targetElement.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                            setTimeout(() => {
                              history.pushState(null, null, `#${heading.id}`);
                            }, 400);
                          }
                        }}
                      >
                        {heading.text}
                      </Link>
                    );
                  })}
                </VStack>
              </Box>
            </Box>
          </Box>

          <Box flex={1} minW={0}>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading
                  fontWeight={700}
                  color={"white"}
                  fontSize={{ base: "28px", md: "3xl", lg: "4xl" }}
                  mb={4}
                >
                  {post.title}
                </Heading>

                <HStack spacing={2}>
                  <Text color="brand.green" fontSize="sm">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </Text>
                  <Text color="#8F8F8F" fontSize="sm">
                    By {post.author}
                  </Text>
                </HStack>

                <Box
                  w="100%"
                  color="#AEAEAE"
                  fontSize={{ base: "16px", lg: "17px" }}
                  lineHeight="1.8"
                  sx={{
                    "& img": {
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      margin: "1.5rem 0 0.5rem 0",
                      boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
                    },
                    "& h2": {
                      color: "white",
                      fontSize: { base: "24px", md: "28px" },
                      fontWeight: "bold",
                      marginTop: "3rem",
                      marginBottom: "1.5rem",
                      borderBottom: "1px solid #444",
                      paddingBottom: "0.75rem",
                      scrollMarginTop: "100px",
                    },
                    "& ul, & ol": {
                      marginLeft: "2rem",
                      marginBottom: "1.5rem",
                      color: "#DADADA",
                    },
                    "& li": {
                      marginBottom: "0.75rem",
                      lineHeight: "1.7",
                    },
                    "& p": {
                      marginBottom: "1.5rem",
                      color: "#DADADA",
                      letterSpacing: "0.2px",
                      lineHeight: "1.8",
                    },
                    "& p:first-of-type": {
                      fontSize: { base: "17px", lg: "18px" },
                      color: "#FFFFFF",
                      marginTop: "1.5rem",
                    },
                    "& a": {
                      color: "brand.green",
                      textDecoration: "underline",
                      _hover: {
                        textDecoration: "none",
                        opacity: 0.8,
                      },
                    },
                    "& strong": {
                      color: "#FFFFFF",
                      fontWeight: "700",
                      letterSpacing: "0.3px",
                      padding: "0 2px",
                    },
                    "& em": {
                      color: "#B4B4B4",
                      fontStyle: "italic",
                    },
                    "& code:not(pre > code)": {
                      backgroundColor: "#2D3748",
                      color: "#EDF2F7",
                      padding: "0.2em 0.4em",
                      borderRadius: "3px",
                      fontSize: "0.9em",
                    },
                    "& pre": {
                      backgroundColor: "#1A202C",
                      padding: "1.25rem",
                      borderRadius: "md",
                      overflowX: "auto",
                      fontSize: "0.9em",
                      lineHeight: "1.6",
                      marginBottom: "1.5rem",
                      border: "1px solid #2D3748",
                    },
                    "& pre code": {
                      backgroundColor: "transparent",
                      color: "inherit",
                      padding: 0,
                      fontSize: "inherit",
                      fontFamily: "monospace",
                    },
                    "& blockquote": {
                      borderLeft: "4px solid #444",
                      paddingLeft: "1rem",
                      marginLeft: 0,
                      marginBottom: "1.5rem",
                      color: "#B4B4B4",
                      fontStyle: "italic",
                    },
                  }}
                >
                  <ReactMarkdown
                    components={{
                      h2: ({ node, children, ...props }) => {
                        const childrenText = node.children
                          .map((child) => {
                            if (child.type === "text") return child.value;
                            return "";
                          })
                          .join("");
                        const headingData = headings.find(
                          (h) => h.text === childrenText
                        );
                        const id = headingData
                          ? headingData.id
                          : childrenText
                              .toLowerCase()
                              .replace(/[^a-z0-9]+/g, "-")
                              .replace(/(^-|-$)/g, "");

                        return (
                          <h2 id={id} {...props}>
                            {children}
                          </h2>
                        );
                      },
                      img: ({ node, src, alt, ...props }) => (
                        <Box width="100%" marginY="2.5rem">
                          <Box
                            position="relative"
                            display="flex"
                            justifyContent="center"
                          >
                            <Image
                              src={src}
                              alt={alt}
                              width={800}
                              height={500}
                              priority
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: "10px",
                                boxShadow: "0 6px 25px rgba(0, 0, 0, 0.3)",
                              }}
                              {...props}
                            />
                          </Box>
                          {alt && (
                            <Text
                              fontSize="13px"
                              color="#8F8F8F"
                              textAlign="center"
                              mt="0.75rem"
                              mb="1rem"
                              fontStyle="italic"
                              maxWidth="800px"
                              mx="auto"
                            >
                              {alt}
                            </Text>
                          )}
                        </Box>
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </Box>
              </Box>

              <Box mt={12}>
                <Link
                  href="/blog"
                  color="brand.green"
                  display="inline-flex"
                  alignItems="center"
                  transition="all 0.2s"
                  _hover={{
                    textDecoration: "none",
                    textShadow: "0 0 12px rgba(19, 255, 0, 0.6)",
                    transform: "translateX(-5px)",
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
