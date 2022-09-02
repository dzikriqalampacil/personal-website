import { extendTheme, theme as base } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        brand: {
            green: "#13FF00",
            black: "#202020",
            blackless: "#3F3F3F",
            gray: "#E2E2E2",
            white: "#FFFFFF",
        },
    },
    fonts: {
        heading: `Poppins, ${base.fonts?.heading}`,
        body: `Poppins, ${base.fonts?.body}`,
    },
    components: {
        Input: {
            defaultProps: {
                focusBorderColor: '#13FF00',
            }
        },
        Textarea: {
            defaultProps: {
                focusBorderColor: '#13FF00',
            }
        }
    },
    styles: {
        global: {
            html: {
                scrollBehavior: 'smooth'
            }
        },
    },
});

export default theme