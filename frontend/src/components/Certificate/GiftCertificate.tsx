import { Button, CloseButton, Dialog, Field, Input, Portal } from "@chakra-ui/react"


const GiftCertificate = () => {
    return (
        <>
            <Dialog.Root
              size="xs"
              motionPreset="slide-in-bottom"
            >
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    Open Dialog
                </Button>
            </Dialog.Trigger>
                <Portal>
                <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                          borderRadius="0"
                        >
                        <Dialog.Body
                            p="72px 21px 37px 16px"
                        >
                        <Field.Root
                          required
                          gap="12px"
                        >
                        <Field.Label
                          fontSize="18px"
                          fontWeight="400"
                          lineHeight="23px"
                        >
                            From:
                        </Field.Label>
                        <Input
                          border="1px solid #000000"
                          borderRadius="0"
                          fontFamily="'Lexend', sans-serif"
                          fontWeight="300"
                          pl="21px"
                          pr="60px"
                        />
                        <Field.Label
                          fontSize="18px"
                          fontWeight="400"
                          lineHeight="23px"
                        >
                            To:
                        </Field.Label>
                        <Input
                          border="1px solid #3A3A3A"
                          borderRadius="0"
                          fontFamily="'Lexend', sans-serif"
                          fontWeight="300"
                          pl="21px"
                          pr="60px"
                        />
                        <Field.HelperText
                          color="ui.main"
                          fontSize="12px"
                          fontWeight="300"
                          pl="8px"
                          pr="13px"
                        >
                            Let us know if you'd like the gift certificate to be anonymous or if you'd like to include a message for your card
                        </Field.HelperText>
                        </Field.Root>
                            <Button 
                              type="submit"
                              mt="24px"
                              pt="6px"
                              pb="6px"
                              w="100%"
                              fontSize="16px"
                              fontWeight="300"
                              lineHeight="20px"
                              borderRadius="0"
                            >
                                Add to cart
                            </Button>
                        </Dialog.Body>

                        <Dialog.CloseTrigger
                          position="absolute"
                          top="16px"
                          right="11px"
                          display="block"
                        >
                        <CloseButton
                          size="sm"
                          backgroundImage="url('assets/icons/close-btn.svg')"
                          backgroundSize="cover"
                          backgroundRepeat="no-repeat"
                        />
                        </Dialog.CloseTrigger>

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default GiftCertificate