import React from 'react'
import { Flex, HStack, VStack, Text, Box, Image, Divider } from '@chakra-ui/react'

function ItemContact({ image, text }) {
    return (
        <HStack pl='110px'>
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
            <HStack border={'2px solid red'} w='80%' borderRadius={'33px'}>
                <VStack borderRadius={'33px 0px 0px 33px'} bg='#272727' py='90px' w='40%' alignItems={'flex-start'}>
                    <HStack pl='110px' w='full'>
                        <Text color='white' fontWeight={600} fontSize='26px'>
                            CONTACT
                        </Text>
                        <Box bg='white' height={'3px'} width='100%' />
                    </HStack>
                    <br />
                    <VStack spacing={'25px'} align='flex-start'>
                        <ItemContact image={'/assets/socmed/github.svg'} text={'087855474426'} />
                        <ItemContact image={'/assets/socmed/github.svg'} text={'dzikri.qalam01@ui.ac.id'} />
                        <ItemContact image={'/assets/socmed/github.svg'} text={'Depok, Jawa Barat, Indonesia'} />
                    </VStack>
                    <br />
                    <br />
                    <Box bg='white' height={'3px'} width='40%' alignSelf='flex-start' />
                </VStack>
                <VStack w='60%'>

                </VStack>
            </HStack>
        </Flex>
    )
}

export default Contact