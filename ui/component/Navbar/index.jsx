import { HStack, Flex, Text, Link } from '@chakra-ui/react'
import React from 'react'

function Item({ text, isActive, ...rest }) {
    return (
        <Flex direction={'column'} alignItems="center">
            {/* {isActive && <Box borderRadius={'50%'} bg={'brand.green'} width='7.1px' height='6.23px' />} */}
            <Text color={'brand.white'} _hover={{ color: 'brand.green', cursor: 'pointer', textShadow: '0px 0px 20px #13FF00' }} fontWeight={'700'} fontSize={'15px'}>{text}</Text>
        </Flex>
    )
}

function Navbar() {
    return (
        <HStack spacing='5%' justifyContent={'center'} position='absolute' width={'100%'} zIndex={'3'} pt={5}>
            <Link href='#home' >
                <Item text='Home' />
            </Link>
            <Link href='#about' >
                <Item text='About me' />
            </Link>
            <Link href='#contact'>
                <Item text='Contact' />
            </Link>
        </HStack>
    )
}

export default Navbar