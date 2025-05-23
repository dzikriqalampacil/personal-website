import React from "react";
import { Text, VStack, Heading, Image, SimpleGrid } from "@chakra-ui/react";

function Item({ date, title, institution }) {
  return (
    <VStack alignItems={"flex-start"} spacing={"8px"}>
      <Text fontWeight={600} color={"white"} fontSize={"16px"}>
        {date}
      </Text>
      <Text fontWeight={500} color={"#13FF00"} fontSize={"22px"}>
        {title}
      </Text>
      <Text fontWeight={500} color={"#C1C1C1"} fontSize={"16px"}>
        {institution}
      </Text>
    </VStack>
  );
}

function Experiences() {
  return (
    <VStack
      bg={"#161616"}
      minH="100vh"
      position={"relative"}
      overflow="hidden"
      pb={{ base: "120px", md: "280px" }}
      id="experience"
    >
      <Text
        userSelect={"none"}
        fontWeight={700}
        color={"#272727"}
        fontSize={{ base: "42px", md: "100px", lg: "150px" }}
        position={"absolute"}
        left={{ base: "-4", md: "-10", lg: "-65" }}
        bottom="5"
      >
        UT ME
      </Text>
      <Image
        userSelect={"none"}
        src={"/assets/exballs.svg"}
        position={"absolute"}
        right="5"
        top="5"
        boxSize={{ base: "42px", md: "100px", lg: "170px" }}
        alt="decoration"
      />
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        pt="70px"
        spacingX={"17%"}
        spacingY={{ base: 100, md: 0 }}
        w={{ base: "90%", md: "60%" }}
        alignSelf={"center"}
      >
        <VStack alignItems={"flex-start"} spacing={"80px"}>
          <VStack alignItems={"flex-start"} spacing={"32px"} w="100%">
            <Heading
              fontWeight={700}
              color={"white"}
              fontSize={{ base: "24px", lg: "33px" }}
            >
              Education
            </Heading>
            <Item
              date={"August 2020 - December 2023"}
              title={"Computer Science"}
              institution={"Universitas Indonesia"}
            />
          </VStack>

          <VStack alignItems={"flex-start"} spacing={"32px"} w="100%">
            <Heading
              fontWeight={700}
              color={"white"}
              fontSize={{ base: "24px", lg: "33px" }}
            >
              Organization
            </Heading>
            <Item
              date={"March 2022 - February 2023"}
              title={"Head of IT Department"}
              institution={"BEM Fasilkom UI"}
            />
            <Item
              date={"March 2021 - February 2022"}
              title={"Staff of IT Department"}
              institution={"BEM Fasilkom UI"}
            />
          </VStack>
        </VStack>

        <VStack alignItems={"flex-start"} spacing={"32px"}>
          <Heading
            fontWeight={700}
            color={"white"}
            fontSize={{ base: "24px", lg: "33px" }}
          >
            Experience
          </Heading>
          <Item
            date={"April 2024 - Present"}
            title={"Software Engineer"}
            institution={"GoTo Financial"}
          />
          <Item
            date={"January 2024 - April 2024"}
            title={"IT Intern"}
            institution={"Procter & Gamble"}
          />
          <Item
            date={"February 2023 - August 2023"}
            title={"RPA Intern"}
            institution={"Danone"}
          />
          <Item
            date={"January 2022 - April 2022"}
            title={"Software Engineer Intern"}
            institution={"Ruangguru"}
          />
          <Item
            date={"July 2021 - December 2021"}
            title={"Frontend Developer"}
            institution={"Festival Rakyat UI"}
          />
          <Item
            date={"August 2021 - December 2021"}
            title={"Frontend Developer Freelance"}
            institution={"Jasa Teknologi Informasi by FUKI Fasilkom UI"}
          />
        </VStack>
      </SimpleGrid>
    </VStack>
  );
}

export default Experiences;
