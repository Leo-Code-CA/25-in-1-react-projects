import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import TransactionFrom from "../add-transaction";

export default function Summary({ onClose, isOpen }) {
    return (
        <Box p={'6'} border={'1px solid'} borderColor={'gray.100'} overflow={'hidden'} borderRadius={'10'} bg={'white'} display={'flex'}>
            <Flex w={'full'} justifyContent={'center'} alignItems={'center'} flexDirection={{
                base: 'column',
                sm: 'column',
                md: 'column',
                lg: 'row',
                xl: 'row'
            }}>
                <Flex flex={'1'} w={'full'} flexDirection={'column'} alignItems={'center'} justifyContent={'space-evenly'} ml={'-20'} mr={'2'}>
                    <Heading size={'md'} mb={'4'} color={'gray.600'}>
                        Balance is 100
                    </Heading>
                    <Flex justifyContent={'space-evenly'} alignItems={'center'} bg={'gray.50'} w={'full'} h={'100px'} border={'1px solid'} borderColor={'gray.100'}>
                        <Flex flexDirection={'column'}>
                            <Heading color={'gray.700'}>
                                $100
                            </Heading>
                            <Text color={'gray.600'}>
                                Total Income
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex justifyContent={'space-evenly'} alignItems={'center'} bg={'gray.50'} w={'full'} h={'100px'} border={'1px solid'} borderColor={'gray.100'}>
                        <Flex flexDirection={'column'}>
                            <Heading color={'gray.700'}>
                                $100
                            </Heading>
                            <Text color={'gray.600'}>
                                Total Expense
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box flex={1} mt={'10'} ml={'-90px'} mr={'5'} w={'300px'} height={'300px'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                    <Heading>This is our chart</Heading>
                </Box>
            </Flex>
            <TransactionFrom onClose={onClose} isOpen={isOpen}></TransactionFrom>
        </Box>
    );
}