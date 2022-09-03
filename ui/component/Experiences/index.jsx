import React from 'react'
import { Text, VStack, Heading, Image, SimpleGrid } from '@chakra-ui/react'

function Item({ date, title, institution }) {
    return (
        <VStack alignItems={'flex-start'}>
            <Text fontWeight={600} color={'white'} fontSize={'16px'} >
                {date}
            </Text>
            <Text fontWeight={500} color={'#13FF00'} fontSize={'22px'}>
                {title}
            </Text>
            <Text fontWeight={500} color={'#C1C1C1'} fontSize={'16px'}>
                {institution}
            </Text>
        </VStack>
    );
}

function Experiences() {
    return (
        <VStack bg={'#161616'} minH='100vh' position={'relative'} overflow='hidden' pb={{ base: '120px', md: '280px' }} id='experience'>
            <Text fontWeight={700} color={'#272727'} fontSize={{ base: '42px', md: '100px', lg: '150px' }} position={'absolute'} left={{ base: '-4', md: '-10', lg: '-65' }} bottom='5'>
                UT ME
            </Text>
            <Image src={'/assets/exballs.svg'} position={'absolute'} right='5' top='5' boxSize={{ base: '42px', md: '100px', lg: '170px' }} />
            <SimpleGrid columns={{ base: 1, md: 2 }} pt='70px' spacingX={'17%'} spacingY={{ base: 100, md: 0 }} w={{ base: '90%', md: '60%' }} alignSelf={'center'}>
                <VStack alignItems={'flex-start'} spacing={'51px'}>
                    <Heading fontWeight={700} color={'white'} fontSize={{ base: '24px', lg: '33px' }}>Education</Heading>
                    <Item date={'August 2020 - Present'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'August 2019 - July 2020'} title={'Chemical Engineering'} institution={'Universitas Indonesia'} />
                </VStack>
                <VStack alignItems={'flex-start'} spacing={'51px'} >
                    <Heading fontWeight={700} color={'white'} fontSize={{ base: '24px', lg: '33px' }}>Experience</Heading>
                    <Item date={'March 2022 - Present'} title={'Head of IT Department'} institution={'BEM Fasilkom UI'} />
                    <Item date={'January 2022 - April 2022'} title={'Software Engineer Intern'} institution={'Ruangguru'} />
                    <Item date={'July 2021 - December 2021'} title={'Frontend Developer'} institution={'Festival Rakyat UI'} />
                    <Item date={'August 2021 - Present'} title={'Freelancer'} institution={'Jasa Teknologi Informasi by FUKI Fasilkom UI'} />
                    <Item date={'March 2021 - Feb 2022'} title={'Staff of IT Department'} institution={'BEM Fasilkom UI'} />
                </VStack>
            </SimpleGrid>
        </VStack>
    )
}

export default Experiences