import { HStack, Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'

function Item({ text, isActive, ...rest }) {
    return (
        <Flex border='1px' borderColor='gray' direction={'column'} alignItems="center">
            {isActive && <Box borderRadius={'50%'} bg={'brand.green'} width='7.1px' height='6.23px' />}
            <Text color={isActive ? 'brand.green' : 'brand.white'} fontWeight={'700'} fontSize={'15px'}>{text}</Text>
        </Flex>
    )
}

function Navbar() {
    return (
        <HStack spacing='5%' border='1px' borderColor='red' justifyContent={'center'} alignItems={'flex-end'} position='absolute' width={'100%'}>
            <Item text='Home' isActive={true} />
            <Item text='About me' isActive={false} />
            <Item text='Projects' isActive={false} />
            <Item text='Contact' isActive={false} />
        </HStack>
    )
}

export default Navbar