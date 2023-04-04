import React from "react";
import {
  Box,
  IconButton,
  useBreakpointValue,
  Heading,
  Text,
  Container,
  Image,
  HStack,
  Button,
  Flex,
} from "@chakra-ui/react";
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
// And react-slick as our Carousel Lib
import Slider from "react-slick";
import Link from "next/link";


// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

function Feature({ title, desc, ...rest }) {
  return (
    <Box
      p={{ base: 2, md: 5 }}
      maxW={{ base: "100%", md: "container.lg" }}
      width={{ base: "70vmin", md: "30vmin", lg: "50vmin" }}
      {...rest}
    >
      <Text fontSize={{ base: "lg", md: "lg" }} mt={{ base: 2, md: 4 }}>
        New Inspiration 2022
      </Text>
      <Heading fontSize={{ base: "3xl", md: "3xl" }}>{title}</Heading>
      <Text fontSize={{ base: "md", md: "2xl" }} mt={{ base: 2, md: 4 }}>
        {desc}
      </Text>
        <Button
          as={"a"}
          display={{ base: "none", md: "inline-flex" }}
          fontSize={{ base: "md", md: "md" }}
          fontWeight={600}
          color={"white"}
          marginTop={{ base: 2, md: 5 }}
          bg={"pink.400"}
          href={"/#category"}
          _hover={{
            bg: "pink.300",
          }}
        >
          Shop Now
        </Button>
    </Box>
  );
}

function StackEx({ imageSrc, title, text }) {
  return (
    <HStack spacing={1} flexDirection={{ base: "column", md: "row" }}>
      <Feature title={title} desc={text} flex={1} />
      <Box marginRight={"0.5rem"} boxSize={["90%", "85%", "350px"]}>
        <Image
          src={imageSrc}
          fallbackSrc="https://via.placeholder.com/150"
          flex={1}
          objectFit={"cover"}
          width={"100%"}
        />
      </Box>
    </HStack>
  );
}

export default function CaptionCarousel() {
  // change the state
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });
  const cards = [
    {
      title: "IPhone 11 Pro Max",
      text: "this phone is awesome",
      image: "/assets/images/products/IPhone/iphone2.jpeg",
    },
    {
      title: "IPhone 11 Pro",
      text: "this phone is awesome",
      image: "/assets/images/products/IPhone/iphone1.jpeg",
    },
    {
      title: "IPhone 11",
      text: "this phone is awesome",
      image: "/assets/images/products/IPhone/iphone3.jpeg",
    },
  ];

  return (
    <Box
      position={"relative"}
      height={{ base: "95vh", md: "95vh" }}
      width={"full"}
      overflow={"hidden"}
      maxW={{ base: "100%", md: "100%", lg: "100%" }}
      margin="auto"
      marginTop={"10rem"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        display={{ base: "none", md: "inline-flex" }}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={"translate(0%, -50%)"}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        display={{ base: "none", md: "inline-flex" }}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      {/* Slider */}

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {cards.map((card, index) => (
          <Box
            key={index}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            width={"full"}
            overflow={"hidden"}
            height={{ base: "91vh", md: "95vh", lg: "75vh" }}
          >
            <Container
              size="container.lg"
              position="relative"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              maxW={{
                base: "container.sm",
                md: "container.lg",
                lg: "container.xl",
              }}
            >
              <StackEx
                imageSrc={card.image}
                title={card.title}
                text={card.text}
              />
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
