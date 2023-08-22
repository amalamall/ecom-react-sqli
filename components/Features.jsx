import { Container, Box, SimpleGrid, Icon, Text, Stack, Flex , Center, Heading } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit, FcMoneyTransfer } from 'react-icons/fc';



const Feature = ({ title, text, icon }) => {
  return (
    <Stack display={"flex"} alignItems={"center"}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text 
        bgGradient='linear(to-r, purple.700, blue.700 )'
        bgClip='text'
      fontWeight={600} textAlign="center">{title}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <section>
      <Container maxW="container.xl">
      <Center margin={50}>
      <Heading
      fontSize='5xl'
      fontWeight='extrabold'
      textAlign={"center"} 
      >Features</Heading>
    </Center>
    <Box p={4} width="full" marginTop={50} marginBottom={150}>

      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'FREE SHIPPING WORLD WIDE'}
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'100% MONEY BACK GUARANTEE'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
          title={'MANY PAYMENT GATWAYS'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
       <Feature
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          title={'24/7 ONLINE SUPPORT'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>
    </Box>
      </Container>

    </section>

  );
}