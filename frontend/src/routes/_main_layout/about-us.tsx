
import { Box, Breadcrumb, Container, Flex, Image, Text } from "@chakra-ui/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from "swiper";
import { createFileRoute } from "@tanstack/react-router"
import { Navigation } from 'swiper/modules';
import { useRef } from "react";
import 'swiper/css';
import 'swiper/css/navigation';

export const Route = createFileRoute("/_main_layout/about-us")({
  component: AboutUs,
})


function AboutUs() {
  const aboutUsImg = "/assets/images/about-us.svg"
  const swiperRef = useRef<SwiperCore | null>(null);

  return (
    <Container
      pt="120px"
      pr={["16px", "16px", "48px", "48px"]}
      pl={["16px", "16px", "48px", "48px"]}
    >
      <Breadcrumb.Root
        pb="36px"
      >
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              href="/#root"
              fontSize="16px"
            >HOME/
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Breadcrumb.Link
              href="#"
              fontWeight="500"
              fontSize="16px"
            >About us
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

      <Flex
        pb={["46px", "46px", "30px", "30px"]}
        gap={["12px", "12px", "20px", "20px"]}
        flexWrap="wrap"
      >
        <Flex
          gap={["12px", "12px", "20px", "20px"]}
        >
          <Image
            w={["108px", "108px", "273px", "273px"]}
            src={aboutUsImg}
          />
          <Image
            w={["108px", "108px", "273px", "273px"]}
            src={aboutUsImg}
          />
          <Box
            w={["108px", "108px", "273px", "273px"]}
            display={["block", "none", "none", "none",]}
          />
        </Flex>
        <Flex
          gap={["12px", "12px", "20px", "20px"]}
          justifyContent={["flex-end", "flex-end", "flex-start", "flex-start"]}
        >
          <Box
            w={["108px", "108px", "273px", "273px"]}
            display={["block", "none", "none", "none",]}
          />
          <Image
            w={["108px", "108px", "273px", "273px"]}
            src={aboutUsImg}
          />
          <Image
            w={["108px", "108px", "273px", "273px"]}
            src={aboutUsImg}
          />
        </Flex>
      </Flex>


      <Box>
        <Text
          pb={["9px", "9px", "10px", "10px"]}
          fontWeight="400"
          fontSize={["28px", "28px", "46px", "46px"]}
          lineHeight={["38px", "38px", "58px", "58px"]}
        >About Us
        </Text>
        <Flex
          gap={["0", "0", "36px", "36px"]}
          flexDirection={["column", "column", "row", "row"]}
        >
          <Text
            maxW={["100%", "100%", "268px", "268px"]}
            fontSize={["12px", "12px", "16px", "16px"]}
            fontWeight="300"
            lineHeight="20px"
          >
            The name SHTOR comes from my surname and is a perfect symbiosis of my parents and the values
            they instilled in me. My father always said: "The truth is a good way to the real you, without
            illusions and pretty words." This is not always easy to understand. But what would we do without
            black and white in our lives? That is why black and white are the primary colors used in the brand positioning.
            As for my mother, she taught me to see this world as beautiful, introduced me to art, and supported me in all my wildest desires.
          </Text>
          <Flex
            flexDirection={["column", "column", "column", "column"]}
            justifyContent="space-between"
          >
            <Text
              maxW={["100%", "100%", "270px", "270px"]}
              fontWeight="300"
              fontSize={["12px", "12px", "16px", "16px"]}
              lineHeight="20px"
            >
              As for the idea, it came to my mind while looking through old family photos when I came across a picture of my mother.
              In the shot, she was only 16 years old and still living in a small village. But she was full of faith in herself and the
              future. And what struck me the most was her intense look, a whole of complete freedom. This image of identity is embodied in the brand.»
            </Text>
            <Text
              textAlign="right"
              mb="4px"
            >
              -Galina Shtor, the brand owner
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Flex
        pt={["12px", "60px", "177px", "177px"]}
        pb={["32px", "32px", "130px", "130px"]}
        flexDirection={["column", "column", "row", "row"]}
      >
        <Image
          translate={["-16px", "-16px", "-48px", "-48px"]}
          src="/assets/images/about-us-big.svg"
          w={["311px", "311px", "450px", "450px"]}
          h={["383px", "383px", "553px", "553px"]}
          objectFit="fill"
        />
        <Box
          maxW={["100%", "100%", "510px", "510px"]}
          pt={["60px", "60px", "0", "0"]}
        >
          <Text
            fontWeight="400"
            fontSize={["28px", "28px", "46px", "46px"]}
            lineHeight={["38px", "38px", "58px", "58px"]}
            mb={["24px", "24px", "8px", "8px"]}
          >Gala Shtor</Text>
          <Text
            fontWeight={["200", "200", "300", "300"]}
            fontSize="16px"
            lineHeight="20px"
          >
            The name SHTOR comes from my surname and is a perfect symbiosis of my parents and the values they instilled in me.
            My father always said: "The truth is a good way to the real you, without illusions and pretty words." This is not always
            easy to understand. But what would we do without black and white in our lives? That is why black and white are the primary
            colors used in the brand positioning.<br></br>
            As for my mother, she taught me to see this world as beautiful, introduced me to art, and supported me in all my wildest desires.
          </Text>
        </Box>
      </Flex>

      <Box pb={["132px", "132px", "303px", "303px"]}>
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Navigation]}
          slidesPerView={6}
          spaceBetween={14}
          rewind={true}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <SwiperSlide key={index}>
              <Image src={aboutUsImg} />
              <Text 
                fontWeight="300" 
                fontSize="24px" 
                lineHeight="24px" 
                mt="12px">
                Name of the collection
              </Text>
            </SwiperSlide>
          ))}
          <Box
            mt="32px"
            display={["block", "block", "none", "none"]}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image 
              src="assets/icons/arrow-right.svg" 
              alt="Next Slide"
              w="46px"
            />
          </Box>
        </Swiper>
      </Box>
    </Container>
  )
}