
import { Box, Breadcrumb, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import 'swiper/css'
import 'swiper/css/navigation'

export const Route = createFileRoute("/_main_layout/about-us")({
  component: AboutUs,
})


function AboutUs() {
  const bannerSrc = useBreakpointValue({
    base: "assets/images/main-banner-mobile.svg",
    md: "assets/images/main-banner.svg",
  });

  return (
    <Box
      pt="126px"
    >
      <Breadcrumb.Root
        pb={["32px", "32px", "77px", "77px"]}
        pr={["16px", "16px", "46px", "46px"]}
        pl={["16px", "16px", "46px", "46px"]}
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
            >ABOUT US
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>

        <Box 
          position="relative"
          pl={["16px", "16px", "48px", "48px"]}
          pr={["16px", "16px", "48px", "48px"]}
        >
          <Image
            w="100vw"
            h="100%" 
            src={bannerSrc}
            backgroundSize="cover"
            backgroundPosition="center top"
            backgroundRepeat="no-repeat"
          />
          <Text 
            position="absolute"
            w="100%" 
            color="ui.white" 
            bottom={["14px", "14px", "5px", "5px"]}
            left="50%"
            transform="translateX(-50%)"
            fontSize={["18px", "18px", "24px", "24px"]}
            fontWeight={["300", "300", "400", "400"]}
            textAlign={["center"]}
            textTransform="uppercase"
            >
            ОДА МОЇЙ МАМІ І МОЄМУ ДОМУ 
            НА БЕРЕГАХ ЧОРНОГО МОРЯ
          </Text>
        </Box>
        <Box 
          mt={["16px", "16px", "24px", "24px"]} 
          mb={["16px", "16px", "60px", "60px"]} 
          pr={["16px", "16px", "46px", "46px"]}
          pl={["16px", "16px", "46px", "46px"]}
        >
          <Text
            color="ui.main"
            fontWeight="300"
            fontSize={["14px", "14px", "16px", "16px"]}
          >
            На фото молода Людмила, моя мати. Мама займає вагоме місце у моєму житті: вона навчила мене бачити цей світ
            прекрасним, познайомила з мистецтвом й підтримувала у всіх починаннях та найшаленіших бажаннях.
          </Text>

          <Flex
            alignItems="flex-end"
            flexDirection={["column", "column", "unset", "unset"]}
            pt={["46px", "46px", "60px", "60px"]}
            pb={["46px", "46px", "72px", "72px"]}
            gap={["16px", "16px", "60px", "60px"]}
          >
            <Image src="assets/images/about-us1.svg"/>
            <Text
              color="ui.main" 
              fontWeight="300" 
              fontSize={["14px", "14px", "16px", "16px"]}
              mb={["0", "0", "40px", "40px"]}
            >
              Одним з цих бажань було створити щось власне, яке б говорило про мої внутрішні сенси й відгукувалось моїм думкам.
            </Text>
          </Flex>

          <Flex
            flexDirection={["column", "column", "unset", "unset"]}
          >
            <Flex
              flexDirection="column"
              gap={["46px", "46px", "78px", "78px"]}
              w={["100%", "100%", "50%", "50%"]}
            >
              <Flex
                flexDirection="column"
                gap={["8px", "8px", "12px", "12px"]}
              >
                <Image
                  display={["block", "block", "none", "none"]}
                  src="assets/images/about-us3.svg"
                  mb="4px"
                />
                <Text 
                  color="ui.main" 
                  fontWeight="300" 
                  fontSize={["14px", "14px", "16px", "16px"]}
                >
                  Ще на початкових етапах створення продукту і сторінки в інстаграм, я замислилась над тим, що могло б якнайкраще ілюструвати головну ідею і сенси бренду. І я зупинилась на прізвищі - симбіозі моїх батьків і цін-ностей, які вони заклали у мене.
                </Text>
                <Text 
                  color="ui.main" 
                  fontWeight="300" 
                  fontSize={["14px", "14px", "16px", "16px"]}
                >
                  Батько дав мені тверде розуміння того, що я завжди є сама у себе, не дивлячись ні на що. Він також казав: «Ніколи не бреши собі, і інші не будуть. Правда - гарний шлях до реального себе, без ілюзій і гарних слів.» Це не завжди легко збагнути. Але що б ми робили, якби у нашому житті не було одночасно і чорного і білого.
                </Text>
                <Text
                  color="ui.main"  
                  fontWeight="300" 
                  fontSize={["14px", "14px", "16px", "16px"]}
                >
                  Саме тому, чорний і білий - основні кольори, які використовуються у позиціонуванні.
                </Text>
              </Flex>

              <Image 
                src="assets/images/about-us2.svg"
                mb={["16px", "16px", "0", "0"]}
              />
            </Flex>

            <Flex
              flexDirection="column"
              w={["100%", "100%", "50%", "50%"]}
              gap="60px"
            >
              <Image
                display={["none", "none", "block", "block"]}
                ml="59px" 
                src="assets/images/about-us3.svg"
              />
              <Image src="assets/images/about-us4.svg"/>
            </Flex>
          </Flex>
        </Box>

        <Flex
          flexDirection={["column-reverse", "column-reverse", "column", "column"]}
        >
          <Image
            w="100vw"
            h="100%" 
            src="assets/images/about-us5.svg"
            backgroundSize="cover"
            backgroundPosition="center top"
            backgroundRepeat="no-repeat"
            mb={["46px", "46px", "60px", "60px"]}
            pr={["16px", "16px", "0", "0"]}
            pl={["16px", "16px", "0", "0"]}
          />

          <Box
            pr={["16px", "16px", "46px", "46px"]}
            pl={["16px", "16px", "46px", "46px"]}
            pb={["46px", "46px", "60px", "60px"]}
          >
            <Flex
              flexDirection="column"
              gap="12px"
              w={["100%", "100%", "50%", "50%"]}
            >
              <Text 
                color="ui.main" 
                fontWeight="300" 
                fontSize={["14px", "14px", "16px", "16px"]}
              >
                Зображення логотипу повертає мене до початку моєї історії - до мого дому.            
              </Text>
              <Text 
                color="ui.main" 
                fontWeight="300" 
                fontSize={["14px", "14px", "16px", "16px"]}
              >
                Саме в символі мушлі живе образ дому, спокійного моря, ранкового сходу чи вечірнього заходу сонця, мушель на пляжі та буремних хвиль.            
              </Text>
              <Text
                color="ui.main"  
                fontWeight="300" 
                fontSize={["14px", "14px", "16px", "16px"]}
              >
                При тому, не даремно нагадує золоте січення, яке каже про досконалість форми, поки бренд транслює думку про те, що кожна жінка є досконалою завдяки власній унікальності. Мʼяке поєднання ідеї моря - символу народження та початку життя, яке дає жінка, образу матері (що є ключо-вою фігурою в житті бренду), ідеального критерію золотого січення та маніфестації краси кожної жінки в єдиному символі мушлі з перлиною несе в собі глубокі сенси.
              </Text>
            </Flex>      
          </Box>
        </Flex>

        <Box 
          position="relative" 
        >
          <Image
            w="100vw"
            h="100%" 
            src="assets/images/about-us6.svg"
            backgroundSize="cover"
            backgroundPosition="center top"
            backgroundRepeat="no-repeat"
            pr={["16px", "16px", "0", "0"]}
            pl={["16px", "16px", "0", "0"]}
            pt={["62px", "62px", "0", "0"]}
          />
          <Text 
            position="absolute"
            w="100%"
            color={["ui.main", "ui.main", "ui.white", "ui.white"]}
            top={["0", "0", "36px", "36px"]}
            left="50%"
            transform="translateX(-50%)"
            fontSize={["18px", "18px", "24px", "24px"]}
            fontWeight={["300", "300", "400", "400"]}
            textTransform="uppercase"
            textAlign={["left", "left", "center", "center"]}
            pl={["16px", "16px", "0", "0"]}
            >SHTOR - це маніфест справжньості жінки
          </Text>
        </Box>

        <Box 
          pr={["16px", "16px", "46px", "46px"]}
          pl={["16px", "16px", "46px", "46px"]}
          pt={["16px", "16px", "60px", "60px"]}
          pb={["46px", "46px", "60px", "60px"]}
        >
          <Flex 
            gap={["16px", "16px", "60px", "60px"]}
            flexDirection={["column", "column", "unset", "unset"]}
          >
            <Flex
              w={["100%", "100%", "50%", "50%"]}
            >
              <Image h="419px" src="assets/images/about-us7.svg"/>
            </Flex>

            <Flex
              flexDirection="column"
              w={["100%", "100%", "50%", "50%"]}
              gap={["16px", "16px", "60px", "60px"]}
            >
              <Image src="assets/images/about-us8.svg"/>
              <Image src="assets/images/about-us9.svg"/>
            </Flex>
          </Flex>
        </Box>

        <Text
          display={["block", "block", "none", "none"]}
          fontSize="18px"
          fontWeight="300"
          textTransform="uppercase"
          lineHeight="30px"
          mb="46px"
          pl="16px"
          pr="16px"
        >
          SHTOR цінує жіночу красу та силу в усіх їх проявах, та сублімує це в унікальний продукт.
        </Text>

        <Image
          w="100vw"
          h="100%" 
          src="assets/images/about-us10.svg"
          backgroundSize="cover"
          backgroundPosition="center top"
          backgroundRepeat="no-repeat"
          mb={["16px", "16px", "103px", "103px"]}
          pr={["16px", "16px", "0", "0"]}
          pl={["16px", "16px", "0", "0"]}
        />

        <Box 
          pr={["16px", "16px", "46px", "46px"]}
          pl={["16px", "16px", "46px", "46px"]}
          pb={["74px", "74px", "120px", "120px"]}
        >
          <Flex gap="60px">
            <Image 
              src="assets/images/about-us11.svg"
              mb={["16px", "16px", "0", "0"]}
            />
            <Flex
              flexDirection="column"
              w="50%"
              gap="60px"
              fontSize="24px"
              fontWeight="400"
            >
              <Text
                display={["none", "none", "block", "block"]}
                fontSize="24px"
                fontWeight="400"
                textTransform="uppercase"
                lineHeight="30px"
              >
                SHTOR цінує жіночу красу та силу в усіх їх проявах, та сублімує це в унікальний продукт.
              </Text>
            </Flex>
          </Flex>

          <Flex
            justifyContent="end"
          >
            <Image src="assets/images/about-us12.svg"/>
          </Flex>

          <Flex
            pt={["46px", "46px", "60px", "60px"]}
            flexDirection="column"
            justifyContent="center"
            alignItems={["right", "right", "center", "center"]}
          >
            <Text
              color="ui.main"  
              fontWeight={["300", "300", "400", "400"]}
              fontSize={["18px", "18px", "24px", "24px"]}
              mb={["46px", "46px", "24px", "24px"]}
              textTransform="uppercase"
            >
              А сімейні цінності стають важливим досвідом, який живе в сенсах SHTOR
            </Text>
            <Image src="assets/images/about-us13.svg"/>
            <Text
              color="ui.main"  
              fontWeight={["300", "300", "400", "400"]}
              fontSize={["18px", "18px", "24px", "24px"]}
              mt={["16px", "16px", "24px", "24px"]}
              textTransform="uppercase"
            >
              SHTOR - це дослідження себе і своєї природи.
            </Text>
            <Text
              display={["block", "block", "none", "none"]}
              color="ui.main"  
              fontWeight={["300", "300", "400", "400"]}
              fontSize={["18px", "18px", "24px", "24px"]}
              mt="46px"
              textTransform="uppercase"
              textAlign="right"
            >
              перейти до колекцій
            </Text>

          </Flex>
        </Box>
        

      {/* <Flex
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
      </Box> */}
    </Box>
  )
}