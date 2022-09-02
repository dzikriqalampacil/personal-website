import React from 'react'
import {
    Flex, HStack, VStack, Text, Box, Image, FormControl,
    FormLabel,
    Input,
    Textarea
} from '@chakra-ui/react'

function ItemContact({ image, text }) {
    return (
        <HStack pl={{ base: '5%', lg: '22%' }}>
            <Image src={image} />
            <Text color='white'>
                {text}
            </Text>
        </HStack>
    )
}

function ItemForm({ label, type }) {
    return (
        <VStack align='flex-start' spacing={'0'} w='full'>
            <FormLabel color='#C1C1C1'>{label}</FormLabel>
            <Input type={type} bg='#343434' border='none' borderRadius={'8px'} color='#C1C1C1' />
        </VStack>
    )
}

function Contact() {
    return (
        <Flex justify={'center'} align='center' minH='100vh' bg='#161616' py={{ base: '10%', md: '0' }}>
            <Flex border={'2px solid red'} w='80%' borderRadius={'33px'} spacing={0} flexDirection={{ base: 'column', md: 'row' }}>
                <VStack borderRadius={{ base: '33px 33px 0px 0px', md: '33px 0px 0px 33px' }} bg='#272727' w={{ base: 'full', md: '40%' }} alignItems={'flex-start'} justifyContent='center' p={{ base: '5%', md: '0' }}>
                    <HStack pl={{ base: '5%', lg: '22%' }} mb={{ base: '10px', md: '40px' }} w='full'>
                        <Text color='white' fontWeight={600} fontSize='26px'>
                            CONTACT
                        </Text>
                        <Box bg='white' height={'3px'} width='100%' />
                    </HStack>
                    <VStack spacing={'25px'} align='flex-start' pb={{ base: '40px', md: '90px' }} w='full' border='2px solid blue'>
                        <ItemContact image={'/assets/socmed/github.svg'} text={'087855474426'} />
                        <ItemContact image={'/assets/socmed/github.svg'} text={'dzikri.qalam01@ui.ac.id'} />
                        <ItemContact image={'/assets/socmed/github.svg'} text={'Depok, Jawa Barat, Indonesia'} />
                    </VStack>
                    <Box bg='white' height={'3px'} width='40%' alignSelf='flex-start' />
                </VStack>
                <FormControl w={{ base: 'full', md: '60%' }} p={{ base: '5%', md: '50' }} bg='#202020' borderRadius={{ base: '0px 0px 33px 33px', md: '0px 33px 33px 0px' }} >
                    <VStack align='flex-start' w='full' border='2px solid green' spacing='30px' >
                        <HStack justify={'space-between'} spacing='5%' w='full'>
                            <ItemForm label="Your name" />
                            <ItemForm label="Your Email" />
                        </HStack>
                        <ItemForm label="Subject" />
                        <VStack align='flex-start' spacing={'0'} w='full'>
                            <FormLabel color='#C1C1C1'>Message</FormLabel>
                            <Textarea color='#C1C1C1' bg='#343434' border='none' borderRadius={'8px'} />
                        </VStack>
                        <HStack bg='brand.green' borderRadius={'10px'} padding={'6px 28px'} cursor={'pointer'} alignSelf='flex-end'>
                            <Image src='/assets/circle_down.svg' alt='next' width='26.25px' height='26.25px' />
                            <Text color='brand.black' fontWeight={'600'} fontSize='15px'>Send</Text>
                        </HStack>
                    </VStack>
                </FormControl>
            </Flex>
        </Flex>
    )
}

export default Contact