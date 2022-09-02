import { Box, Text, VStack, Heading, Image } from '@chakra-ui/react'
import React from 'react'

function About() {
    return (
        <VStack bg={'#161616'} minH='100vh' justifyContent={'center'} position={'relative'} overflow='hidden' id='about'>
            <Text fontWeight={700} color={'#272727'} fontSize={{ base: '42px', md: '100px', lg: '150px' }} position={'absolute'} right={{ base: '-10', md: '-70', lg: '-130' }} top='0'>
                ABOUT
            </Text>
            <Image src={'/assets/balls.svg'} position={'absolute'} left='0' bottom='5' boxSize={{ base: '42px', md: '100px', lg: '170px' }} />
            <Heading fontWeight={700} color={'white'} fontSize={{ base: '23px', lg: '37.5px' }}>
                ABOUT ME
            </Heading>
            <Box bg='brand.green' height={'3px'} width='65px' borderRadius={'10px'} />
            <Text fontWeight={500} color={'#8F8F8F'} w={{ base: '80%', md: '49%' }} pt='26px' textAlign={'center'} fontSize='16px'>
                I'm <Text as='span' color='#13FF00'>Dzikri Qalam Hatorangan</Text>, I'm 20 years old and I live in <Text as='span' color='#13FF00'>Bekasi</Text>.<br />
                <Text as='span' color='#13FF00'>Front-end developer </Text> and UI Designer, I'm passionate about interfaces, from their creation to development. I like to learn more and more about the area, challenges that take me out of my comfort zone are the best.
                <br /><br />
                I have prototyped and developed Landing Pages, Sites, E-commerces, E-mails Marketing, Apps and Programs.
            </Text>
        </VStack>
    )
}

export default About