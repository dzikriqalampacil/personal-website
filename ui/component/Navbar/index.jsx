import { HStack, Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'

function Item({ text, isActive, ...rest }) {
    return (
        <Flex direction={'column'} alignItems="center">
            <Text color={'brand.white'} _hover={{ color: 'brand.green', cursor: 'pointer', textShadow: '0px 0px 20px #13FF00' }} fontWeight={'700'} fontSize={'15px'}>{text}</Text>
        </Flex>
    )
}

function Navbar() {
    return (
        <HStack spacing='5%' justifyContent={'center'} position='absolute' width={'100%'} zIndex={'3'} pt={5} userSelect={'none'}>
            <Link href='/' style={{ textDecoration: 'none' }}>
                <Item text='Home' />
            </Link>
            <Link href='#about' style={{ textDecoration: 'none' }}>
                <Item text='About me' />
            </Link>
            <Link href='#contact' style={{ textDecoration: 'none' }}>
                <Item text='Contact' />
            </Link>
        </HStack>
    )
}

export default Navbar