import { Box, FileUpload, HStack, Image, UseFileUploadReturn } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import {
  DragDropContext,
  Draggable,
  type DraggableProvided,
  Droppable,
  type DroppableProvided,
} from "@hello-pangea/dnd"
import { useColorModeValue } from "../ui/color-mode"
import { LuTrash2 } from "react-icons/lu"

interface ImagesContainerProps {
  fileUpload: UseFileUploadReturn
}

const ImagesOrderingContainer = ({
  fileUpload
}: ImagesContainerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (evt: WheelEvent) => {
      evt.preventDefault()
      container.scrollLeft += evt.deltaY / 3
    }

    container.addEventListener("wheel", handleWheel)
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const updated = [...fileUpload.acceptedFiles]
    const [moved] = updated.splice(result.source.index, 1)
    updated.splice(result.destination.index, 0, moved)
    fileUpload.clearFiles()
    fileUpload.setFiles(updated)
  }

  // const handleRemoveImg = (indexToRemove: number) => {
  //   const updated = fileUpload.acceptedFiles.filter((_, i) => i !== indexToRemove)
  //   fileUpload.clearFiles()
  //   fileUpload.setFiles(updated)
  // }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided: DroppableProvided) => (
          <HStack
            ref={(node) => {
              scrollContainerRef.current = node
              provided.innerRef(node)
            }}
            mt={4}
            pb=".5rem"
            overflowX="auto"
            gap={0}
            w="full"
            css={{
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar-thumb": {
                background: useColorModeValue("ui.main", "ui.dim"),
              },
            }}
            {...provided.droppableProps}
          >
            {fileUpload.acceptedFiles.map((file: File, index: number) => (
              <Draggable
                key={`${index}-${file.name}`}
                draggableId={`${index}-${file.name}`}
                index={index}
              >
                {(draggableProvided: DraggableProvided) => (
                  <Box
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                    position="relative"
                    mr={2}
                  >
                    <FileUpload.Item
                      key={file.name} 
                      file={file} 
                      p={0}
                      border="none"
                    >
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Uploaded image ${index + 1}`}
                        boxSize="125px"
                        minW="125px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                  
                      <FileUpload.ItemDeleteTrigger
                        right={0}
                        top={0}
                        position="absolute"
                        boxSize={6}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        // onClick={() => handleRemoveImg(index)}
                      >
                        <LuTrash2 size={14} color="#ef4444" cursor="pointer" />
                      </FileUpload.ItemDeleteTrigger>
                    </FileUpload.Item>
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </HStack>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ImagesOrderingContainer