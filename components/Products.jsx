import { useState, useEffect } from "react";
import ProductSimple from "./shared/ProductSimple";
import {
  Heading,
  Center,
  Select,
  Container,
  Box,
  Text,
} from "@chakra-ui/react";

export default function Products() {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  async function fetchData() {
    const res = await fetch(`/api/products?category=${selectedOption}`);
    const data = await res.json();
    setData(data);
  }

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }

  return (
    <Box       bgGradient="linear(to-l, purple.50, whiteAlpha.200)"
    roundedRight={{ base: 150, sm: 50 }}
    marginTop={50}
    padding={8}>
    <Container

      maxW={"container.xl"}
    >
 
        <section id="category">
          <Center>
            <Heading fontSize="5xl" fontWeight="extrabold" textAlign={"center"}>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                fontWeight="extrabold"
                textAlign={"center"}
              >
                Latest Products
              </Text>
            </Heading>
          </Center>
          <Center marginTop={50}>
            <Select
              w="250px"
              variant="filled"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="All">All</option>
              <option value="Special Products">Special Products</option>
              <option value="Featured Products">Featured Products</option>
              <option value="Trending Products">Trending Products</option>
            </Select>
          </Center>
        </section>
        <section id="#category">
          <div className="row">
            {data.map((item) => (
              <div key={item.id} className="col-md-4">
                {<ProductSimple {...item} />}
              </div>
            ))}
          </div>
        </section>
      
    </Container>
    </Box>
  );
}
