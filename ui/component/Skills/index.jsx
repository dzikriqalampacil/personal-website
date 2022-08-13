import React from 'react'
import { Box, Text, VStack, Heading, Image, SimpleGrid, HStack } from '@chakra-ui/react'

function Item({ image, text }) {
    return (
        <HStack border='2px solid green' width={'auto'}>
            <Image src={image} />
            <Text fontWeight={600} color={'#E2E2E2'} fontSize={'22px'}>
                {text}
            </Text>
        </HStack>
    )
}

function Skills() {
    return (
        <VStack bg={'#1D1D1D'} minH='100vh' pt='84px' position={'relative'} overflow='hidden'>
            <Heading fontWeight={700} color={'white'} fontSize={'32px'} mb='50px'>
                My Skills
            </Heading>
            <SimpleGrid columns={2} spacingX={'300px'} spacingY={'50px'} border='2px solid red' w={'60%'}>
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
            </SimpleGrid>
        </VStack>
    )
}

export default Skills