import React from 'react'
import { Flex, HStack, VStack, Text, Box, Image } from '@chakra-ui/react'

function ItemContact({ image, text }) {
    return (
        <HStack>
            <Image src={image} />
            <Text color='white'>
                {text}
            </Text>
        </HStack>
    )
}

function Contact() {
    return (
        <Flex justify={'center'} align='center' minH='100vh' bg='#161616'>
            <HStack border={'2px solid red'} w='90%' borderRadius={'33px'}>
                <VStack borderRadius={'33px 0px 0px 33px'} bg='#272727' py='90px'>
                    <HStack pl='110px' border='2px solid green'>
                        <Text color='white' >
                            CONTACT
                        </Text>
                        <Box bg='white' height={'3px'} width='100%' />
                    </HStack>
                    <ItemContact image={'/assets/socmed/github.svg'} text={'joni'} />
                    <ItemContact image={'/assets/socmed/github.svg'} text={'joni'} />
                    <ItemContact image={'/assets/socmed/github.svg'} text={'joni'} />
                    <Box bg='white' height={'3px'} width='40%' alignSelf='flex-start' />
                </VStack>
                <VStack>

                </VStack>
            </HStack>
        </Flex>
    )
}

export default Contact