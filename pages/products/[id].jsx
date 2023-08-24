import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Spinner,
  Grid,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import Products from "components/Products";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/slices/productsSlice";
import Color from 'color-thief-react';


export default function ProductById() {
  const [isTablet] = useMediaQuery("(min-width: 768px)");
  const [isDesktop] = useMediaQuery("(min-width: 1024px)");

  const [data, setData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };
  const { query } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedImage(0);
    fetchData();
  }, [query]);

  async function fetchData() {
    const res = await fetch(`/api/products?id=${query.id}`);
    const data = await res.json();
    setData(data[0]);
  }

  const handleAddProduct = () => {
    const newProduct = data;
    dispatch(addProduct(newProduct));
  };

  let gridTemplateColumns = "1fr";

  if (isTablet) {
    gridTemplateColumns = "1fr 1fr";
  }

  if (isDesktop) {
    gridTemplateColumns = "1fr 1fr";
  }

  return (
    <Color src={data?.image} crossOrigin="anonymous" format="hex">
      {({ data: colorProd, loading, error }) => (
      <Container maxW={"7xl"} marginTop={"8rem"} className="bootstrap-wrapper">
        <SimpleGrid templateColumns={gridTemplateColumns}>
          {(data && (
            <>
              <Grid
                display={{ base: "flex", md: "grid" }}
                flexDir={{ base: "column-reverse", md: "row" }}
                gridTemplateColumns="1fr 5fr"
                gap="2rem"
                alignContent="flex-start"
                alignItems="flex-center"
              >
                <Flex flexDir={{ base: "row", md: "column" }} justifyContent={"center"}>
                  {data.images.map((image, index) => {
                    return (
                      <Box
                        padding="0.3rem"
                        border={
                          selectedImage === index
                            ? "1px solid var(--primaryColor)"
                            : "1px solid transparent"
                        }
                        borderRightColor="transparent"
                        cursor="pointer"
                        transition="0.3s"
                        id={index}
                        key={index}
                        onClick={() => handleImageClick(index)}
                        width={"15vmin"}
                      >
                        <Image
                          alt={"product image"}
                          src={image}
                          objectFit={"cover"}
                          width={"100%"}
                        />
                      </Box>
                    );
                  })}
                </Flex>
                <Flex justifyContent={"center"} padding={"2rem"}>
                  <Box
                    padding="0.3rem"
                    border="1px solid var(--primaryColor)"
                    borderRightColor="transparent"
                    cursor="pointer"
                    transition="0.3s"
                    width={"40vmin"}
                  >
                    <Image
                      rounded={"md"}
                      alt={"product image"}
                      src={selectedImage? data.images[selectedImage] : data.image}
                      objectFit={"cover"}
                      width={"100%"}
                    />
                  </Box>
                </Flex>
              </Grid>
              <Stack spacing={{ base: 6, md: 10 }}>
                <Box as={"header"}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  >
                    {data.title}
                  </Heading>
                  <Text color={colorProd} fontWeight={400} fontSize={"3xl"}>
                    ${data.price}
                  </Text>
                </Box>

                <Stack
                  spacing={{ base: 4, sm: 6 }}
                  direction={"column"}
                  divider={<StackDivider borderColor={"gray"} />}
                >
                  <VStack spacing={{ base: 4, sm: 6 }}>
                    <Text color={"gray"} fontSize={"xl"} fontWeight={"300"}>
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore
                    </Text>
                    <Text fontSize={"5xs"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Ad aliquid amet at delectus doloribus dolorum expedita
                      hic, ipsum maxime modi nam officiis porro, quae, quisquam
                      quos reprehenderit velit? Natus, totam.
                    </Text>
                  </VStack>
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={colorProd}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Features
                    </Text>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                      <List spacing={2}>
                        <ListItem>Size: 6.6 inches</ListItem>
                        <ListItem>
                          Resolution: 2796 x 1290 pixels, 19.5:9 ratio, 460 PPI
                        </ListItem>{" "}
                        <ListItem>Technology: OLED</ListItem>
                      </List>
                      <List spacing={2}>
                        <ListItem>RAM: 6GB</ListItem>
                        <ListItem>GPU: GPU 5-core</ListItem>
                      </List>
                    </SimpleGrid>
                  </Box>
                  <Box>
                    <Text
                      fontSize={{ base: "16px", lg: "18px" }}
                      color={colorProd}
                      fontWeight={"500"}
                      textTransform={"uppercase"}
                      mb={"4"}
                    >
                      Product Details
                    </Text>

                    <List spacing={2}>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          CPU:
                        </Text>{" "}
                        16 Bionic
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          RAM:
                        </Text>{" "}
                        6GB
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          GPU:
                        </Text>{" "}
                        GPU 5-core
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Internal storage:
                        </Text>{" "}
                        128GB, not expandable
                      </ListItem>
                      <ListItem>
                        <Text as={"span"} fontWeight={"bold"}>
                          Refresh rate:
                        </Text>{" "}
                        120Hz
                      </ListItem>
                    </List>
                  </Box>
                </Stack>

                <Button
                  w={"full"}
                  mt={8}
                  size={"lg"}
                  py={"7"}
                  onClick={() => handleAddProduct()}
                  color={"white"}
                  bg={colorProd}
                  textTransform={"uppercase"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                >
                  Add to cart
                </Button>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={"center"}
                >
                  <MdLocalShipping />
                  <Text>2-3 business days delivery</Text>
                </Stack>
              </Stack>
            </>
          )) || <Spinner color="red.500" />}
        </SimpleGrid>
        <Products />
      </Container>
      )}
    </Color>
  );
}
