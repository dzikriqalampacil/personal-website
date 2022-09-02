import React from 'react'
import { Box, Text, VStack, Heading, Image, SimpleGrid, HStack } from '@chakra-ui/react'

function Item({ image, text }) {
    return (
        <HStack justify='center'>
            <Image src={image} />
            <Text fontWeight={600} color={'#E2E2E2'} fontSize={'22px'}>
                {text}
            </Text>
        </HStack>
    )
}

function Skills() {
    return (
        <VStack bg={'#202020'} minH='100vh' pt='84px' pb='50px' position={'relative'} overflow='hidden' align={'center'}>
            < Heading fontWeight={700} color={'white'} fontSize={'32px'} mb='50px' >
                My Skills
            </Heading >
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} alignItems='center' justifyContent={'center'} spacingY={'50px'} w={'60%'}>
                <Item image={'/assets/socmed/github.svg'} text={'JavaScriptttttt'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
                <Item image={'/assets/socmed/github.svg'} text={'HTML'} />
            </SimpleGrid>
        </VStack >
    )
}

export default Skills