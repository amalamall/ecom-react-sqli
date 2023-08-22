import {
  Box,
  Center,
  useColorModeValue,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/slices/productsSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ProductSimple({ title, price, image, id }) {
  const dispatch = useDispatch();
  const handleAddProduct = () => {
    const newProduct = { title, price, image, id };
    dispatch(addProduct(newProduct));
  };
  const router = useRouter();
  return (
    <Center py={6}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          pos={"relative"}
          height={"230px"}
          // _after={{
          //   transition: "all .3s ease",
          //   content: '""',
          //   w: "full",
          //   h: "full",
          //   pos: "absolute",
          //   top: 0,
          //   left: 0,
          //   backgroundImage: `url(${image})`,
          //   backgroundPosition: "cover",
          //   filter: "blur(100px)",
          //   zIndex: -1,
          // }}
          // _groupHover={{
          //   _after: {
          //     filter: "blur(20px)",
          //   },
          // }}
        >
          <Link href={`${router.basePath}/products/${id}`} passHref>
            <Image
              rounded={"lg"}
              maxHeight={"150%"}
              width={200}
              objectFit={"fill"}
              src={image}
              position="absolute"
              top="80%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
          </Link>
        </Box>
        <Stack pt={150} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {title}
          </Text>
          <Stack direction={"row"} align={"center"}>
            <Text fontWeight={800} fontSize={"xl"}>
              ${price}
            </Text>
            <Button
              onClick={() => handleAddProduct()}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"purple.400"}
              _hover={{
                bg: "purple.300",
              }}
            >
              Add To Cart
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
