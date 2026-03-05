import { Box, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react"
import { chakra } from "@chakra-ui/react"
import GiftCard from "../Gift/Card"
import { useQuery } from "@tanstack/react-query"
import { GiftOccasion, GiftPublic, GiftsService } from "@/client"


interface WomansDay2026Props {}


function getGiftQueryOptions({ occasion }: { occasion: GiftOccasion }) {
  return {
    queryFn: () =>
      GiftsService.readGiftsByOccasion({ occasion }),
    queryKey: ["gifts", { occasion }],
  }
}


const WomansDay2026 = ({}: WomansDay2026Props) => {
  const Video = chakra("video")

  const { data: giftsData, isPending: isGiftsPending } = useQuery({
    ...getGiftQueryOptions({ occasion: "MARCH8" })
  })

  const gifts = giftsData?.data

  return (
    <>
      <Box
        w={["100%", "100%", "100%", "100vw"]}
        h={["100%", "100%", "100%", "100vh"]}
        position={["initial", "initial", "relative", "relative"]}
        overflow="hidden"
        mt={["44px", "44px", "44px", "110px"]}
      >
        <Video
          src="/assets/videos/8march2026.mov"
          autoPlay
          muted
          loop
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
      {isGiftsPending ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" saturate="1s" color="ui.main" />
        </Flex>
      ) : (
        <Grid
          templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
          gapX={["24px", "24px", "54px", "54px"]}
          gapY={["32px", "32px", "46px", "46px"]}
          p={["0px 16px", "0px 16px ", "0px 16px", "0 46px"]}
          mt={["45px", "45px", "45px", "55px"]}
          mb={["90px", "90px", "90px", "110px"]}
        >
          <GridItem />
          {gifts?.map((gift: GiftPublic, index: number) => (
            <GiftCard
              key={index}
              gift={gift}
              showPrice={false}
            />
          ))}
        </Grid>
      )}
    </>
  )
}

export default WomansDay2026