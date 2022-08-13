import React from 'react'
import { Text, VStack, Heading, Image, HStack, Box, Button } from '@chakra-ui/react'

function Project() {
    return (
        <VStack bg='#272727' borderRadius={'18px'} spacing='0' boxShadow='0px 4px 40px rgba(0, 0, 0, 0.16)' border='2px solid red' zIndex='2'>
            <Image src='/assets/dummy_card.png' />
            <VStack p='25px' align='flex-start' justifyContent={'flex-start'} border='2px solid green' w='full' borderRadius={'18px'}>
                <Text fontWeight={700} fontSize='14px' color='white'>
                    Portfolio Website
                </Text>
                <HStack>
                    <Image src={'/assets/socmed/github.svg'} />
                    <Text fontWeight={600} fontSize='10px' color='#E2E2E2'>
                        UI Design
                    </Text>
                </HStack>
                <HStack border='2px solid red' w='full' justifyContent={'space-between'}>
                    <Text fontWeight={600} fontSize='10px' color='white'>
                        View Code &rarr;
                    </Text>
                    <Button bg='#13FF00'>See Project</Button>
                </HStack>
            </VStack>
        </VStack>
    )
}

function Circle({ ...styles }) {
    return (
        <Box w='800px' h='800px' borderRadius={'50%'} bg='#252525' />
    )
}

function Projects() {
    return (
        <VStack bg={'#202020'} justifyContent={'center'} alignItems={'center'} minH='100vh' position={'relative'} overflow='hidden'>
            <Box w='800px' h='800px' borderRadius={'50%'} bg='#252525' position={'absolute'} right={'-400'} top={'-400'} />
            <Box w='800px' h='800px' borderRadius={'50%'} bg='#252525' position={'absolute'} left={'-400'} bottom={'-400'} />
            <VStack pb='26px' zIndex='2'>
                <Heading fontWeight={700} color={'white'} fontSize={'37.5px'} >
                    PROJECTS
                </Heading>
                <Box bg='brand.green' height={'3px'} width='65px' borderRadius={'10px'} />
            </VStack>
            <Project />
        </VStack>
    )
}

export default Projects