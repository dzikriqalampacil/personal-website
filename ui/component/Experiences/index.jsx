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
        <VStack bg={'#161616'} minH='100vh' position={'relative'} overflow='hidden' pb='280px'>
            <Text fontWeight={700} color={'#272727'} fontSize={'150px'} position={'absolute'} left='-50' bottom='5'>
                UT ME
            </Text>
            <Image src={'/assets/exballs.svg'} position={'absolute'} right='5' top='5' />
            <SimpleGrid columns={2} pt='70px' spacingX={'17%'} w='60%' border='2px solid red' alignSelf={'center'}>
                <VStack alignItems={'flex-start'} border='2px solid white' spacing={'51px'}>
                    <Heading fontWeight={700} color={'white'} fontSize={'32px'}>Education</Heading>
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                </VStack>
                <VStack alignItems={'flex-start'} border='2px solid white' spacing={'51px'}>
                    <Heading fontWeight={700} color={'white'} fontSize={'32px'}>Jobs</Heading>
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                    <Item date={'January 2020 - December 2023'} title={'Computer Science'} institution={'Universitas Indonesia'} />
                </VStack>
            </SimpleGrid>
        </VStack>
    )
}

export default Experiences