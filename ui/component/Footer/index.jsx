import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

function Footer() {
    return (
        <Flex justify={'center'} align='center' py='36px' bg='#202020'>
            <Text color='#8F8F8F'>
                © 2022 Dzikri Qalam. All rights reserved.
            </Text>
        </Flex>
    )
}

export default Footer