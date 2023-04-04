import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  SimpleGrid,
  Image,
  Heading,
  Flex,
} from "@chakra-ui/react";
import ProductSimple from "../../components/shared/ProductSimple";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  async function fetchData() {
    const res = await fetch(`/api/products?search=${searchTerm}`);
    const data = await res.json();
    setResults(data);
  }

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <Box width={"95vmin"} mx="auto" marginTop={"6rem"} >
      <Flex justifyItems={"center"} flexDirection={"column"}>
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          marginTop={"2rem"}
        //   width={"80vmin"}
        />
        {results.length > 0 ? (
          <SimpleGrid columns={[1, 2, 3]} gap={"0rem"} columnGap={"1rem"}>
            {results.map((result) => (
              <Box key={result.id} w="100%">
                <ProductSimple {...result} />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <p>No results found.</p>
        )}
      </Flex>
    </Box>
  );
}
