import { Icon, IconButton, Link } from "@chakra-ui/react"
import { FaWhatsapp } from "react-icons/fa"


interface WhatsAppWidgetProps { }

const WhatsAppWidget = ({ }: WhatsAppWidgetProps) => {
    return (
    <Link
      href="https://wa.me/380985130800"
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"
      right={3}
      bottom={3}
      zIndex={9999}
      cursor="default"
      rounded="full"
    >
        <IconButton
            rounded="full"
            bg='#25D356'
            boxSize="44px"
            boxShadow="lg"
            transition="transform 0.2s ease"
            _hover={{
                transform: "scale(1.08)",
                "& svg": {
                    transform: "scale(1.2)",
                },
            }}
            _active={{
                transform: "scale(0.96)",
            }}
            css={{
                "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    borderRadius: "full",
                    background: "rgba(255,255,255,0.4)",
                    transform: "scale(0)",
                    opacity: 0,
                    pointerEvents: "none",
                },
                "&:active::after": {
                    animation: "whatsappRipple 0.25s ease-out",
                },
                "& svg": {
                    transition: "transform .25s",
                },
            }}
        >
            <Icon as={FaWhatsapp} boxSize="24px" />
        </IconButton>
    </Link>
    )
}

export default WhatsAppWidget