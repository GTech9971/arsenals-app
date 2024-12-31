import { Box, Flex, Spacer, Text } from "@chakra-ui/react"

export type ContentLayoutProps = {
    children: React.ReactNode | undefined,
    title: string
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ children, title }) => {
    return (
        <Flex direction='column' minHeight="100vh">
            <Box as="header" bg="blue.500" color="white" py="4">
                <Box maxWidth="1600px" width="100%" mx="auto" px="8">
                    <Flex alignItems='flex-start' fontWeight="bold">
                        <Text fontSize='xl'>{title}</Text>
                        <Spacer />
                    </Flex>
                </Box>
            </Box>

            {/* メインコンテント */}
            <Box as="main" flex="1" py="8" bg="gray.50" >
                <Box maxWidth="1600px" width="100%" mx="auto" px="8">
                    {children}
                </Box>
            </Box>

            {/* Footer */}
            <Box as="footer" bg="blue.500" color="white" py="4" >
                <Box maxWidth="1600px" width="100%" mx="auto" px="8">
                    <Text textAlign="center">@ footer info</Text>
                </Box>
            </Box>

        </Flex>
    )
}