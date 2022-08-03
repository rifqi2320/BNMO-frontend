import {
  Center,
  Flex,
  Link,
  Select,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import FullPageLoading from "../../components/layouts/fullPageLoading";
import Navbar from "../../components/layouts/navbar";
import { useAuth } from "../../context/auth";
import { getSelfTransactions } from "../../lib/api";
import { Transaction } from "../../types/models";

const ValidTabs = ["history", "transfer", "request"];

const User = () => {
  const { colorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoading, token } = useAuth();

  const [tab, setTab] = useState(location.pathname.split("/")[2]);
  const [tabColor, setTabColor] = useState({
    history: "",
    transfer: "",
    request: "",
  });
  const [data, setData] = useState<Transaction[] | null>(null);

  useEffect(() => {
    // TODO: Create lib to generate color like this
    const newTabColor = {
      history: colorMode === "dark" ? "gray.500" : "gray.200",
      transfer: colorMode === "dark" ? "gray.500" : "gray.200",
      request: colorMode === "dark" ? "gray.500" : "gray.200",
    };
    if (location.pathname === "/user/history") {
      newTabColor.history = colorMode === "dark" ? "gray.800" : "white";
    } else if (location.pathname === "/user/transfer") {
      newTabColor.transfer = colorMode === "dark" ? "gray.800" : "white";
    } else if (location.pathname === "/user/request") {
      newTabColor.request = colorMode === "dark" ? "gray.800" : "white";
    }
    setTabColor(newTabColor);
  }, [colorMode, location.pathname]);

  useEffect(() => {
    setTab(location.pathname.split("/")[2]);
  }, [location.pathname]);

  useEffect(() => {
    if (!data) {
      revalidate();
    }

    if (!isLoading && user?.role !== "USER") {
      if (user?.role === "ADMIN") {
        navigate("/admin");
        return;
      }
      navigate("/login");
      return;
    }

    if (!ValidTabs.includes(tab)) {
      // navigate("/user/history");
    }
  });

  const [isSmallScreen] = useMediaQuery("(max-width: 768px)");

  const handleChangeSelect = (e: any) => {
    setTab(e.target.value);
    navigate(`/user/${e.target.value}`);
  };

  const revalidate = async () => {
    setData(null);
    const { isError, data: res } = await getSelfTransactions(token);
    if (!isError && res) {
      setData(res.transactions);
    }
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <FullPageLoading />
      </>
    );
  }

  return (
    <>
      <Flex w="100vw" minH="100vh" flexDir={"column"}>
        <Navbar />
        <Center>
          <Flex
            w={["90vw"]}
            maxW="900px"
            bg={colorMode === "dark" ? "teal.800" : "teal.300"}
            pb={[2, 2, 4, 4]}
            my={6}
            mb={24}
            borderRadius={"xl"}
            zIndex={1}
            flexDir="column"
          >
            <Stack direction="row" px={4} gap={0} h="100%" pb={0} pt={2}>
              <Text
                fontSize={"2xl"}
                mr={4}
                color={colorMode === "dark" ? "white" : "black"}
                fontWeight={"bold"}
              >
                User
              </Text>
              {isSmallScreen ? (
                <>
                  <Spacer />
                  <Select
                    variant="flushed"
                    onChange={handleChangeSelect}
                    value={tab}
                    w="10rem"
                  >
                    <option value="history">History</option>
                    <option value="transfer">Transfer</option>
                    <option value="request">Request</option>
                  </Select>
                </>
              ) : (
                <>
                  <Link
                    transitionDuration="0ms"
                    alignSelf={"end"}
                    fontSize={"md"}
                    bg={tabColor.history}
                    borderTopRadius={"xl"}
                    px={2}
                    pt={1}
                    mx={0}
                    href="/user/history"
                  >
                    History
                  </Link>
                  <Link
                    transitionDuration="0ms"
                    alignSelf={"end"}
                    fontSize={"md"}
                    bg={tabColor.transfer}
                    borderTopRadius={"xl"}
                    px={2}
                    pt={1}
                    href="/user/transfer"
                  >
                    Transfer
                  </Link>
                  <Link
                    transitionDuration="0ms"
                    alignSelf={"end"}
                    fontSize={"md"}
                    bg={tabColor.request}
                    borderTopRadius={"xl"}
                    px={2}
                    pt={1}
                    href="/user/request"
                  >
                    Request
                  </Link>
                  <Spacer />
                  <Text fontWeight={"bold"} p={1} color="white">
                    {user?.username}
                  </Text>
                </>
              )}
            </Stack>
            <Flex
              zIndex={2}
              w="100%"
              minH="420px"
              bgColor={colorMode === "dark" ? "gray.800" : "white"}
              flexDir="column"
            >
              <Outlet context={{ data, revalidate }} />
            </Flex>
          </Flex>
        </Center>
      </Flex>
    </>
  );
};

export default User;
