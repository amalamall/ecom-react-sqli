import {
  Box,
  IconButton,
  Divider,
  Heading,
  Stack,
  Text,
  Flex,
  Image,
  Center,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../store/slices/productsSlice";
import Link from "next/link";
import { useRouter } from "next/router";



const PackageTier = ({ title, price, image, id,quantity }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ id: productId }));
  };
  return (
    <Stack
      p={3}
      py={3}
      justifyContent={{
        base: "flex-starts",
        md: "space-around",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Flex justifyContent={"center"} maxW={["100%", "100%", "40vmin"]}>
        <Box boxSize={["100%", "100%", "200px"]}>
          <Link href={`${router.basePath}/products/${id}`} passHref>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={image}
              objectFit={"cover"}
              width={"100%"}
            />
          </Link>
        </Box>
        <Stack spacing={1} pl={[0, 0, 3]} pt={[2, 2, 0]} width={"40vmin"}>
          <Heading width={"100%"} size={"md"}>{title}</Heading>
          <Heading color={"#ed64a6"} size={"md"}><small style={{color:"black"}}><b>Price :  </b></small>${price * quantity}</Heading>
          <Heading color={"#ed64a6"} size={"md"}><small style={{color:"black"}}><b>Quantity :  </b></small>{quantity}</Heading>
        </Stack>
      </Flex>
      <Stack>
        <IconButton
          aria-label="Remove from checkout"
          onClick={() => handleRemoveProduct(id)}
          size={"xs"}
          margin={["10px", "10px", "50px"]}
          minH="50px"
          minW="50px"
          icon={<CloseIcon />}
        />
      </Stack>
    </Stack>
  );
};
const ThreeTierPricingHorizontal = () => {
  const productList = useSelector((state) => state.products).products;
  const totalPrice = useSelector((state) => state.products).totalPrice;
  const navbarSize = useBreakpointValue({ base: "sm", md: "md" });
  return (
    <Box
      py={6}
      px={5}
      marginTop={navbarSize === "sm" ? "30vmin" : "6rem"}
      marginBottom={"10vmin"}
    >
      <Stack spacing={4} width={"100%"} direction={"column"}>
        <Stack
          p={5}
          alignItems={"center"}
          justifyContent={{
            base: "flex-start",
            md: "space-around",
          }}
          direction={{
            base: "column",
            md: "row",
          }}
        >
          <Stack
            width={{
              base: "100%",
              md: "40%",
            }}
            textAlign={"center"}
          >
            <Heading size={"xl"}>
              <Text>Your Shopping Cart</Text>
            </Heading>
          </Stack>
        </Stack>
        {(productList.length > 0 &&
          productList.map((product,index) => {
            return (
              <div key={product.id} id={product.id}>
                <PackageTier {...product} />
                <Divider />
              </div>
            );
          })) || (
          <Heading
            size={"md"}
            textAlign="center"
            color="pink.600"
            padding={"50"}
          >
            No Products Added Yet...
          </Heading>
        )}
      </Stack>
      {productList.length > 0 && (
        <Flex justifyContent={"end"} padding={10}>
          <Heading size={"lg"}>
            <Text>
              Total:{" "}
              <strong>
                ${totalPrice}
                {/* {productList
                  .map((p) => p.price * p.quantity)
                  .reduce((partialSum, a) => partialSum + a, 0)} */}
              </strong>
            </Text>
            <Button margin={3}>Pay Now</Button>
          </Heading>
        </Flex>
      )}
    </Box>
  );
};

export default ThreeTierPricingHorizontal;
