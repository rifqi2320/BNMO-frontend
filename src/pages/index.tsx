import { Flex, useColorMode } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Index = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Flex
        bgImage={process.env.PUBLIC_URL + `/bg/${colorMode}-bg.jpg`}
        bgSize="fill"
        backgroundPosition={"center"}
        filter="blur(8px)"
        w="100vw"
        h="100vh"
        zIndex={-1}
        position="absolute"
      />
      <Outlet />
    </>
  );
};

export default Index;
