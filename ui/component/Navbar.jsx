import { HStack, Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'

function Item({ text, ...rest }) {
    return (
        <Flex border='1px' borderColor='gray' direction={'column'} alignItems="center">
            <Box borderRadius={'50%'} bg={'#13FF00'} width='7px' height='6px' />
            <Text>{text}</Text>
        </Flex>
    )
}

function Navbar() {
    return (
        <HStack border='1px' borderColor='red'  >
            <Item text='Home' />
            <Item text='About' />
        </HStack>
    )
}

export default Navbar