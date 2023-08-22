import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Portal,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  Image,
  Center,
  Input,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DeleteIcon
} from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../store/slices/productsSlice";
import Link from "next/link";

const CheckoutElement = ({ image, id, title, price }) => {
  const dispatch = useDispatch();
  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ id: productId }));
  };
  return (
    <Stack
      spacing={5}
      direction="row"
      display={"flex"}
      alignItems={"center"}
      marginTop={"2rem"}
    >
      <Image rounded={"lg"} width={20} src={image} />
      <Center>
        <Text fontSize="md">
          {title} <strong>${price}</strong>{" "}
        </Text>
      </Center>
      <IconButton
        aria-label="Remove from checkout"
        onClick={() => handleRemoveProduct(id)}
        size={"xs"}
        margin={"50px"}
        icon={<DeleteIcon boxSize={6} color="red.500" />}
      />
    </Stack>
  );
};

const PopOverElement = ({ trigger, header, footer, body,id }) => {
  return (
    <Popover closeOnBlur={false} id={id}>
      <PopoverTrigger>
        <Button>{trigger}</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>{body}</PopoverBody>
          {footer && <PopoverFooter>{footer}</PopoverFooter>}
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const productList = useSelector((state) => state.products).products;
  const totalPrice = useSelector((state) => state.products).totalPrice;

  const navbarSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="999"
        backdropFilter="blur(10px)" 
        bg="rgba(255, 255, 255, 0.8)" 
        boxShadow="md"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            fontWeight={"bold"}
          >
            PhoneStore
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={{ base: "center", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          spacing={6}
          align={{ base: "center", md: "flex-start" }}
          padding={{ base: 2, md: 0 }}
          fontSize={{ base: "sm", md: "md" }}
        >
          <PopOverElement
            trigger={"Sign-In"}
            header={"sign in or sign up"}
            body={
              <Box padding={5} marginTop={navbarSize === 'sm' && "4rem"}>
                <Heading
                  size={"md"}
                  color={"purple.400"}
                  textAlign="center"
                  margin={3}
                >
                  Login
                </Heading>
                <Input margin={1} type="text" placeholder="email" />
                <Input margin={1} type="text" placeholder="password" />
                <Flex justifyContent={"center"} margin={3}>
                  <Button>Login Now</Button>
                </Flex>
              </Box>
            }
            footer={
              <Link href="#">
                <Text color={"purple.400"}>Forgot Password ?</Text>
              </Link>
            }
            id={"l"}

          />
          {navbarSize === "md" && (
          <PopOverElement
            trigger={"Checkout"}
            body={
              <Box paddingTop={10} paddingBottom={10} overflowY="auto" maxHeight="20rem" marginTop={navbarSize === 'sm'?  "3rem" : "0rem"}>
                {(productList.length > 0 &&
                  productList.map((product) => {
                    return (
                      <div key={product.id}>
                        <CheckoutElement {...product} />
                      </div>
                    );
                  })) || (
                  <Heading
                    size={"md"}
                    color={"purple.400"}
                    textAlign="center"
                    margin={3}
                  >
                    No Products Added Yet...{" "}
                  </Heading>
                )}
              </Box>
            }
            footer={
              <>
                <Box display={"flex"} justifyContent={"center"}>
                  <Text>
                    Total:{" "}
                    <strong>
                      ${totalPrice}
                      {/* {(productList.length > 0 &&
                        productList
                          .map((p) => p.price)
                          .reduce((partialSum, a) => partialSum + a, 0)) ||
                        0} */}
                    </strong>
                  </Text>
                </Box>
                <Box display={"flex"} justifyContent={"center"} marginTop={3}>
                  <Link href="/products/checkout">
                    <Button>Checkout</Button>
                  </Link>
                </Box>
              </>
            }
            id={"c"}
          />          )}

          {navbarSize === "md" && (
            <Link
              href="/products/search"
              passHref
              style={{ textDecoration: "none" }}
            >
              <Button>
                <Text>Search</Text>
              </Button>
            </Link>
          )}
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem,index) => (
        navItem.label !== "Checkout" && (
        <Box key={navItem.label} id={index}>
          <Popover trigger={"hover"} placement={"bottom-start"} id={index}>
            <PopoverTrigger id={index}>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>)
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("purple.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "purple.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"purple.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
      marginTop={"8rem"}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Category",
    href: "/#category",
  },
  {
    label: "Blog",
    href: "/#blog",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
  {
    label: "Checkout",
    href: "/products/checkout",
  },
];
