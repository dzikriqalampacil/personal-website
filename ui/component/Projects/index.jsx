import React from 'react'
import { Text, VStack, Heading, Image, HStack, Box, Button, Link } from '@chakra-ui/react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Pagination } from "swiper"
import { Icon } from '@iconify/react'

function Project({ title, stacks, link, image, viewCode }) {
    return (
        <VStack bg='#272727' borderRadius={'18px'} spacing='0' boxShadow='0px 4px 40px rgba(0, 0, 0, 0.16)' zIndex='2' w={{ base: '300px', md: '412px' }}>
            <Image src={image} borderRadius="18px 18px 0 0" userSelect={'none'} alt='Project Image' w={{ base: '300px', md: '412px' }} h={{ base: '145.6311px', md: '200px' }} />
            <VStack p='25px' align='flex-start' justifyContent={'flex-start'} w='full' borderRadius={'18px'}>
                <Text fontWeight={700} fontSize='18px' color='white' userSelect={'none'}>
                    {title}
                </Text>
                <HStack spacing={3}>
                    {stacks && stacks.map((ctx, idx) => <Icon icon={ctx} key={ctx} width='26.25px' height='26.25px' color='#13FF00' />)}
                </HStack>
                <HStack w='full' justifyContent={'space-between'} pt='24px'>
                    {viewCode !== "" &&
                        <Link href={viewCode} style={{ textDecoration: 'none' }} isExternal>
                            <Text fontWeight={600} fontSize='14px' color='white'>
                                View Code &rarr;
                            </Text>
                        </Link>
                    }
                    <Link href={link} style={{ textDecoration: 'none' }} isExternal >
                        <HStack bg='brand.green' borderRadius={'10px'} padding={'6px 28px'} cursor={'pointer'} _hover={{
                            boxShadow: '0px 0px 11px #13FF00'
                        }}>
                            <Text color='brand.black' fontWeight={'600'} fontSize='15px' userSelect={'none'}>See Project</Text>
                        </HStack>
                    </Link>
                </HStack>
            </VStack>
        </VStack >
    )
}

function Projects() {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '" style="background:#13FF00; box-shadow: 0px 0px 20px #13FF00;">' + "</span>";
        },
    }

    const allProject = [
        {
            title: "Property Agent",
            stacks: ["akar-icons:react-fill", "fa6-brands:golang"],
            link: "https://nanyeravictoria.com/",
            image: "/assets/era.png",
            viewCode: ""
        },
        {
            title: "Festival Rakyat UI",
            stacks: ["akar-icons:gatsby-fill", "ion:logo-nodejs"],
            link: "https://fesrak-staging.netlify.app/",
            image: "/assets/fesrak.jpg",
            viewCode: ""
        },
        {
            title: "LPJ Online",
            stacks: ["akar-icons:react-fill", "tabler:brand-django"],
            link: "https://bemapps.cs.ui.ac.id/LPJ",
            image: "/assets/lpj.jpg",
            viewCode: ""
        },
        {
            title: "Best Staff",
            stacks: ["akar-icons:react-fill", "tabler:brand-django"],
            link: "https://bemapps.cs.ui.ac.id/best-staff",
            image: "/assets/best-staff.jpg",
            viewCode: ""
        },
        {
            title: "Personal Website",
            stacks: ["teenyicons:nextjs-outline"],
            link: "/",
            image: "/assets/personal.jpg",
            viewCode: "https://github.com/dzikriqalampacil/personal-website"
        }
    ]

    return (<>
        <Box bg={'#202020'} minH='100vh' position={'relative'} overflow='hidden' id='projects'>
            <Box boxSize={{ base: '500px', sm: '600px', lg: '800px' }} borderRadius={'50%'} bg='#252525' position={'absolute'} right={'-400'} top={'-400'} />
            <Box boxSize={{ base: '500px', sm: '600px', lg: '800px' }} borderRadius={'50%'} bg='#252525' position={'absolute'} left={'-400'} bottom={'-400'} />
            <VStack pb='26px' mt='60px'>
                <Heading fontWeight={700} color={'white'} fontSize={'37.5px'} zIndex='2' >
                    PROJECTS
                </Heading>
                <Box bg='brand.green' height={'3px'} width='65px' borderRadius={'10px'} zIndex='2' />
            </VStack>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                style={{ paddingBottom: '80px', marginTop: '15px' }}
                centeredSlides={true}
                centeredSlidesBounds={true}
            >
                {allProject.map((ctx, idx) => <SwiperSlide style={{ display: 'flex', justifyContent: 'center' }} key={ctx.link}><Project title={ctx.title} stacks={ctx.stacks} link={ctx.link} image={ctx.image} viewCode={ctx.viewCode} /></SwiperSlide>)}
            </Swiper>
        </Box>
    </>
    )
}

export default Projects