import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Spacer,
  useColorMode,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import ColorModeButton from "../utils/colorModeButton";

const validTabs = ["users", "requests"];

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const [tab, setTab] = useState(location.pathname.split("/")[2]);
  const [tabColor, setTabColor] = useState({
    users: "",
    requests: "",
  });

  useEffect(() => {
    setTab(location.pathname.split("/")[2]);
  }, [location.pathname]);

  useEffect(() => {
    if (!validTabs.includes(tab)) {
      navigate("/admin/users");
    }
  }, [tab, navigate]);

  useEffect(() => {
    const newTabColor = {
      users: colorMode === "dark" ? "teal.800" : "teal.300",
      requests: colorMode === "dark" ? "teal.800" : "teal.300",
    };

    if (location.pathname === "/admin/users") {
      newTabColor.users = colorMode === "dark" ? "gray.800" : "white";
    } else if (location.pathname === "/admin/requests") {
      newTabColor.requests = colorMode === "dark" ? "gray.800" : "white";
    }

    setTabColor(newTabColor);
  }, [colorMode, location.pathname]);

  return (
    <VStack
      h="100vh"
      minW={"15vw"}
      w="15vw"
      bg={colorMode === "dark" ? "teal.800" : "teal.300"}
      py={8}
      gap={2}
    >
      {isSmallScreen ? (
        <StarIcon />
      ) : (
        <Heading size="lg" mb={4} color="white">
          Admin
        </Heading>
      )}
      <Divider />

      <Flex w="100%" py={4} bg={tabColor.users}>
        <Link
          w="100%"
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight="semibold"
          href="/admin/users"
          color={tab === "users" && colorMode === "light" ? "black" : "white"}
        >
          {isSmallScreen ? "U" : "Users"}
        </Link>
        {tab === "users" && !isSmallScreen ? (
          <ChevronRightIcon
            position="fixed"
            w="8"
            h="8"
            left="15vw"
            color="white"
          />
        ) : null}
      </Flex>
      <Divider />
      <Flex w="100%" py={4} bg={tabColor.requests}>
        <Link
          h="100%"
          w="100%"
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight="semibold"
          href="/admin/requests"
          color={
            tab === "requests" && colorMode === "light" ? "black" : "white"
          }
        >
          {isSmallScreen ? "R" : "Requests"}
        </Link>
        {tab === "requests" && !isSmallScreen ? (
          <ChevronRightIcon
            position="fixed"
            w="8"
            h="8"
            left="15vw"
            color="white"
          />
        ) : null}
      </Flex>
      <Divider />
      <Spacer />
      <Divider />
      <ColorModeButton />
      <Button onClick={() => logout()}>
        {isSmallScreen ? <ChevronLeftIcon /> : "Logout"}
      </Button>
    </VStack>
  );
};

export default Sidebar;
