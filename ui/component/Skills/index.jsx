import React from 'react'
import { Text, VStack, Heading, SimpleGrid, HStack } from '@chakra-ui/react'
import { Icon } from '@iconify/react'

function Item({ image, text }) {
    return (
        <HStack justify='center'>
            <Icon icon={image} color='#13FF00' width={'39px'} height={'39px'} />
            <Text fontWeight={600} color={'#E2E2E2'} fontSize={'22px'} pl='3'>
                {text}
            </Text>
        </HStack>
    )
}

function Skills() {
    return (
        <VStack bg={'#202020'} minH='100vh' pt='84px' pb='50px' position={'relative'} overflow='hidden' align={'center'} id='skills'>
            < Heading fontWeight={700} color={'white'} fontSize={'32px'} mb={{ base: '50px', lg: '80px' }} >
                My Skills
            </Heading >
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} alignItems='center' justifyContent={'center'} spacingY={'50px'} w={'60%'}>
                <Item image={'icomoon-free:html-five2'} text={'HTML'} />
                <Item image={'icomoon-free:css3'} text={'CSS'} />
                <Item image={'teenyicons:javascript-outline'} text={'Javascript'} />
                <Item image={'akar-icons:react-fill'} text={'React'} />
                <Item image={'teenyicons:nextjs-outline'} text={'Next'} />
                <Item image={'file-icons:typescript'} text={'Typescript'} />
                <Item image={'tabler:brand-python'} text={'Python'} />
                <Item image={'cib:java'} text={'Java'} />
                <Item image={'tabler:brand-django'} text={'Django'} />
                <Item image={'bxl:flutter'} text={'Flutter'} />
                <Item image={'ion:logo-nodejs'} text={'NodeJS'} />
                <Item image={'simple-icons:springboot'} text={'Springboot'} />
                <Item image={'akar-icons:postgresql-fill'} text={'PostgreSQL'} />
                <Item image={'simple-icons:mysql'} text={'MySQL'} />
                <Item image={'tabler:brand-kotlin'} text={'Kotlin'} />
            </SimpleGrid>
        </VStack >
    )
}

export default Skills