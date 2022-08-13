import React from 'react'
import { Text, VStack, Heading, Image, HStack, Box, Button } from '@chakra-ui/react'

function Project() {
    return (
        <VStack bg='#272727' borderRadius={'18px'} boxShadow='0px 4px 40px rgba(0, 0, 0, 0.16)'>
            <Image />
            <Text>
                Portfolio Website
            </Text>
            <Text>
                UI Design
            </Text>
            <HStack>
                <Text>
                    View Code &rarr;
                    <Button>See Project </Button>
                </Text>
            </HStack>
        </VStack>
    )
}

function Projects() {
    return (
        <VStack bg={'#202020'} justifyContent='center' minH='100vh' position={'relative'} overflow='hidden' pb='280px'>
            <Heading fontWeight={700} color={'white'} fontSize={'37.5px'}>
                PROJECTS
            </Heading>
            <Box bg='brand.green' height={'3px'} width='65px' borderRadius={'10px'} />
            <Project />
        </VStack>
    )
}

export default Projects