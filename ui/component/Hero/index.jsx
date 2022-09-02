import React from 'react'
import { Box, Text, VStack, HStack, Flex } from '@chakra-ui/react'
import Navbar from '../Navbar'
import Image from 'next/image'

function Socmed({ image }) {
    return (
        <VStack bg={'#353535'} w='45.75px' h='45.75px' borderRadius={'50%'} alignItems='center' justifyContent={'center'} cursor='pointer'>
            <Image src={image} width='26.25px' height='26.25px' />
        </VStack>
    )
}

function GreenButton() {
    return (
        <HStack bg='brand.green' borderRadius={'10px'} padding={'6px 28px'} cursor={'pointer'}>
            <Image src='/assets/circle_down.svg' alt='next' width='26.25px' height='26.25px' />
            <Text color='brand.black' fontWeight={'600'} fontSize='15px'>Portfolio</Text>
        </HStack>
    )
}

function RightTriangle() {
    return (
        <Box alignSelf='flex-end' w='0' h='0' zIndex={'2'} borderRight='35vw solid transparent' borderBottom={'100vh solid #202020'} display={{ base: 'none', md: 'block' }} />
    )
}

function GreenCircle() {
    return (
        <Box position={'absolute'} right={{ base: '6%', md: '0%', lg: '6%', xl: '20%' }} top={{ base: '15%', md: '15%', lg: '15%', xl: '15%' }}>
            <Image src='/assets/circle_hero.svg' width='650' height='650' />
        </Box>
    )
}

function Hero() {
    return (
        <Box bg={'brand.blackless'} minH='100vh'  >
            <Navbar />
            <Flex minH='100vh' position={'relative'}>
                <VStack alignItems={'flex-start'} justify='center' width={{ base: '100%', md: '75%', lg: '60%', xl: '46%' }} bg='brand.black' pl={{ base: '4%', lg: '10%' }} pr={{ base: '5%', lg: '2%' }} zIndex={'2'} border='2px solid white'>
                    <Text color="brand.green" fontWeight={'800'} fontSize={{ base: '21px', lg: '33px' }}>
                        DZIKRI QALAM HATORANGAN
                    </Text>
                    <Box bg='brand.green' height={'3px'} width='80%' alignSelf={'flex-end'} />
                    <Text color='brand.white' fontWeight={'700'} fontSize={{ base: '23px', lg: '37.5px' }} >
                        Full-Stack Engineer
                    </Text>
                    <Text color='#8F8F8F' fontWeight={'500'} fontSize='16px' py='10px'>
                        I'm a Full-stack engineer focused on creating Web and Mobile applications. I really like different projects that solve real problems.
                    </Text>
                    <HStack spacing='66px' >
                        {/* <HStack bg='brand.black' cursor={'pointer'} padding={'8px 0'}>
                            <Image src='/assets/cloud_down.svg' alt='next' width='26.25px' height='26.25px' />
                            <Text color='brand.white' fontWeight={'600'} fontSize='15px'>Download CV</Text>
                        </HStack> */}
                        <GreenButton />
                    </HStack>
                    <HStack spacing='23px' pt='50px'>
                        <Socmed image={'/assets/socmed/github.svg'} />
                        <Socmed image={'/assets/socmed/linkedIn.svg'} />
                        <Socmed image={'/assets/socmed/github.svg'} />
                        <Socmed image={'/assets/socmed/github.svg'} />
                    </HStack>
                </VStack>
                <RightTriangle />
                <GreenCircle />
            </Flex>
        </Box>
    )
}

export default Hero