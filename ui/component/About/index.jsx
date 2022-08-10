import { Box, Text, VStack, Heading, Image } from '@chakra-ui/react'
import React from 'react'

function About() {
    return (
        <VStack bg={'#161616'} minH='100vh' justifyContent={'center'} position={'relative'} overflow='hidden'>
            <Text fontWeight={700} color={'#272727'} fontSize={'150px'} position={'absolute'} right='-130' top='0'>
                ABOUT
            </Text>
            <Image src={'/assets/balls.svg'} position={'absolute'} left='0' bottom='0' />
            <Heading fontWeight={700} color={'white'} fontSize={'37.5px'}>
                ABOUT ME
            </Heading>
            <Box bg='brand.green' height={'3px'} width='65px' borderRadius={'10px'} />
            <Text fontWeight={500} color={'#8F8F8F'} w={'49%'} pt='26px' textAlign={'center'}>
                I'm Thiago Leão, I'm 20 years old and I live in São Vicente -SP.
                Front-end developer and UI Designer, I'm passionate about interfaces, from their creation to development. I like to learn more and more about the area, challenges that take me out of my comfort zone are the best.
                <br /><br />
                I have prototyped and developed Landing Pages, Sites, E-commerces, E-mails Marketing, Apps and Programs.
            </Text>
        </VStack>
    )
}

export default About