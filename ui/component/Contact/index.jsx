import React from 'react'
import {
    Flex, HStack, VStack, Text, Box, Image, FormControl,
    FormLabel,
    Input,
    Textarea
} from '@chakra-ui/react'
import { Icon } from '@iconify/react'

function ItemContact({ image, text }) {
    return (
        <HStack pl={{ base: '5%', lg: '22%' }}>
            <Icon icon={image} color='white' width={'26.25px'} height='26.25px' />
            <Text color='white' fontSize='16px'>
                {text}
            </Text>
        </HStack>
    )
}

function ItemForm({ label, type, ...other }) {
    return (
        <VStack align='flex-start' spacing={'0'} w='full' {...other}>
            <FormLabel color='#C1C1C1'>{label}</FormLabel>
            <Input type={type} bg='#343434' border='none' borderRadius={'8px'} color='#C1C1C1' />
        </VStack>
    )
}

function Contact() {
    return (
        <Flex justify={'center'} align='center' minH='100vh' bg='#161616' py={{ base: '10%', md: '0' }} id='contact'>
            <Flex w='80%' borderRadius={'33px'} spacing={0} flexDirection={{ base: 'column', md: 'row' }}>
                <VStack borderRadius={{ base: '33px 33px 0px 0px', md: '33px 0px 0px 33px' }} bg='#272727' w={{ base: 'full', md: '40%' }} alignItems={'flex-start'} justifyContent='center' p={{ base: '5%', md: '0' }}>
                    <HStack pl={{ base: '5%', lg: '22%' }} mb={{ base: '10px', md: '40px' }} w='full'>
                        <Text color='white' fontWeight={600} fontSize={{ base: '21px', md: '26px' }}>
                            CONTACT
                        </Text>
                        <Box bg='white' height={'3px'} width='100%' />
                    </HStack>
                    <VStack spacing={'25px'} align='flex-start' pb={{ base: '40px', md: '90px' }} w='full'>
                        <ItemContact image={'fluent:call-12-regular'} text={'087855474426'} />
                        <ItemContact image={'carbon:email'} text={'dzikri.qalam01@ui.ac.id'} />
                        <ItemContact image={'akar-icons:location'} text={'Depok, Jawa Barat, Indonesia'} />
                    </VStack>
                    <Box bg='white' height={'3px'} width='40%' alignSelf='flex-start' />
                </VStack>
                <FormControl w={{ base: 'full', md: '60%' }} p={{ base: '5%', md: '50' }} bg='#202020' borderRadius={{ base: '0px 0px 33px 33px', md: '0px 33px 33px 0px' }} >
                    <VStack align='flex-start' w='full' spacing='30px' >
                        <Flex justify={'space-between'} w='full' flexDirection={{ base: 'column', sm: 'row' }}>
                            <ItemForm label="Your name" />
                            <ItemForm label="Your Email" ml={{ base: '0', sm: '5%' }} mt={{ base: '30px', sm: '0' }} />
                        </Flex>
                        <ItemForm label="Subject" />
                        <VStack align='flex-start' spacing={'0'} w='full'>
                            <FormLabel color='#C1C1C1'>Message</FormLabel>
                            <Textarea color='#C1C1C1' bg='#343434' border='none' borderRadius={'8px'} />
                        </VStack>
                        <HStack bg='brand.green' borderRadius={'10px'} padding={'6px 28px'} cursor={'pointer'} alignSelf='flex-end' _hover={{
                            boxShadow: '0px 0px 11px #13FF00'
                        }}>
                            <Icon icon={'bx:mail-send'} color='black' width={'26.25px'} height='26.25px' />
                            <Text color='brand.black' fontWeight={'600'} fontSize='15px'>Send</Text>
                        </HStack>
                    </VStack>
                </FormControl>
            </Flex>
        </Flex>
    )
}

export default Contact