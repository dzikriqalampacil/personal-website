import React, { useState } from "react";
import { Box, VStack, Text, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Head from "next/head";

export default function BellPage() {
  const [loading, setLoading] = useState(false);
  const [ringing, setRinging] = useState(false);
  const toast = useToast();

  const handleRing = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/bell", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setRinging(true);
        setTimeout(() => setRinging(false), 1000);
        toast({
          title: "Ding dong!",
          description: "Bell rang on my mini computer!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else if (res.status === 429) {
        toast({
          title: "Too fast!",
          description: `Try again in ${data.retryAfter}s`,
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.error);
      }
    } catch {
      toast({
        title: "Oops",
        description: "Could not ring the bell",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ring the Bell - Dzikri Qalam</title>
        <meta
          name="description"
          content="Ring a real bell on my mini computer!"
        />
      </Head>
      <Box bg="brand.black" minH="100vh">
        <VStack justify="center" minH="100vh" spacing="30px" px="5%">
          <Text
            color="brand.green"
            fontWeight="800"
            fontSize={{ base: "24px", lg: "40px" }}
            textAlign="center"
          >
            Ring My Bell
          </Text>
          <Text
            color="#8F8F8F"
            fontWeight="500"
            fontSize="16px"
            textAlign="center"
            maxW="500px"
          >
            Press the bell to make a real sound on my mini computer. Yes, it
            actually rings!
          </Text>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={ringing ? { rotate: [0, -15, 15, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <VStack
              bg="#353535"
              w="120px"
              h="120px"
              borderRadius="50%"
              alignItems="center"
              justifyContent="center"
              cursor={loading ? "not-allowed" : "pointer"}
              opacity={loading ? 0.5 : 1}
              onClick={handleRing}
              _hover={{
                boxShadow: "0px 0px 20px #13FF00",
              }}
            >
              <Icon
                icon={ringing ? "mdi:bell-ring" : "mdi:bell"}
                width="60px"
                height="60px"
                color={ringing ? "#13FF00" : "white"}
              />
            </VStack>
          </motion.div>
          <Text color="#555" fontWeight="500" fontSize="13px">
            5s cooldown between rings
          </Text>
        </VStack>
      </Box>
    </>
  );
}
