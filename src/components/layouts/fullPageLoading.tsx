import { Center, Spinner, useColorMode } from "@chakra-ui/react";

const FullPageLoading = () => {
  const { colorMode } = useColorMode();
  return (
    <Center w="100vw" h="100vh" color="">
      <Spinner color={colorMode === "dark" ? "black" : "white"} size={"xl"} />
    </Center>
  );
};

export default FullPageLoading;
