import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  
  export default function Contact() {
    return (
      <section id="contact">
      <Flex
        minH={'10vh'}
        align={'center'}
        justify={'center'}
        py={12}
        marginBottom={150}>
        <Stack
          boxShadow={'2xl'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}>
            <Stack align={'center'} spacing={2}>
            <Text 
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize='2xl'
            fontWeight='extrabold'
            // fontSize={'lg'} 
            // color={'gray.500'}
            >
              Subscribe to our newsletter & stay up to date!
            </Text>
          </Stack>
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
            <Input
              type={'text'}
              placeholder={'john@doe.net'}
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
            />
           <Button
               as={'a'}
               display={{ base: 'none', md: 'inline-flex' }}
               fontSize={'sm'}
               fontWeight={600}
               color={'white'}
               bg={'purple.400'}
               href={'#'}
               _hover={{
                 bg: 'purple.300',
               }}>
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </section>

    );
  }
  
