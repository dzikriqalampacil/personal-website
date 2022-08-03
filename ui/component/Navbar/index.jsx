import { HStack, Flex, Text, Box } from '@chakra-ui/react'
import React from 'react'

function Item({ text, isActive, ...rest }) {
    return (
        <Flex border='1px' borderColor='gray' direction={'column'} alignItems="center">
            {isActive && <Box borderRadius={'50%'} bg={'brand.green'} width='7px' height='6px' />}
            <Text color={isActive ? 'brand.green' : 'brand.white'}>{text}</Text>
        </Flex>
    )
}

function Navbar() {
    return (
        <HStack border='1px' borderColor='red'  >
            <Item text='Home' isActive={true} />
            <Item text='About' isActive={false} />
        </HStack>
    )
}

export default Navbar