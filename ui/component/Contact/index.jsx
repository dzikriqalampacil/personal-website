import React from 'react'
import {
    Flex, HStack, VStack, Text, Box, Image, FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Textarea
} from '@chakra-ui/react'

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

function ItemForm({ }) {
    return (
        <VStack align='flex-start'>
            <FormLabel color='#C1C1C1'>Your name</FormLabel>
            <Input type='email' />
        </VStack>
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
                <FormControl w='60%' p='50px'>
                    <VStack align='flex-start' w='full' border='2px solid green' spacing='30px' >
                        <HStack justify={'space-between'} w='full'>
                            <VStack align='flex-start' spacing={'0'}>
                                <FormLabel color='#C1C1C1'>Your name</FormLabel>
                                <Input type='email' color='#C1C1C1' />
                            </VStack>
                            <VStack align='flex-start' spacing={'0'} >
                                <FormLabel color='#C1C1C1'>Your email</FormLabel>
                                <Input type='email' color='#C1C1C1' />
                            </VStack>
                        </HStack>
                        <VStack align='flex-start' spacing={'0'} w='full'>
                            <FormLabel color='#C1C1C1'>Subject</FormLabel>
                            <Input type='email' color='#C1C1C1' />
                        </VStack>
                        <VStack align='flex-start' spacing={'0'} w='full'>
                            <FormLabel color='#C1C1C1'>Message</FormLabel>
                            <Textarea color='#C1C1C1' />
                        </VStack>
                        <HStack bg='brand.green' borderRadius={'10px'} padding={'6px 28px'} cursor={'pointer'} alignSelf='flex-end'>
                            <Image src='/assets/circle_down.svg' alt='next' width='26.25px' height='26.25px' />
                            <Text color='brand.black' fontWeight={'600'} fontSize='15px'>Send</Text>
                        </HStack>
                    </VStack>
                </FormControl>
            </HStack>
        </Flex>
    )
}

export default Contact