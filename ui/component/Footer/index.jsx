import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

function Footer() {
    return (
        <Flex justify={'center'} align='center' py='28px' bg='#202020' px='5%'>
            <Text color='#8F8F8F' textAlign={'center'}>
                © 2022 Dzikri Qalam Hatorangan. All rights reserved.
            </Text>
        </Flex>
    )
}

export default Footer