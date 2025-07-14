import { Box, Text, VStack } from "@chakra-ui/react"


interface CustomListProps {
    number: number
    title: string
    listElements: { number: string; content: string }[];
}

export const CustomList = ({
    title,
    number,
    listElements
}: CustomListProps) => {
  
  return (
    <VStack
      alignItems="flex-start"
      gap={["16px", "16px", "12px", "12px"]}
    >
      <Text>
        {number}. {title}
      </Text>
      <Box
        as="ul"
        listStyleType="none"
    >
      {listElements?.map((item, index) => (
        <li key={index}>{item.number} {item.content}</li>
      ))}
    </Box>
    </VStack>
  )
}

