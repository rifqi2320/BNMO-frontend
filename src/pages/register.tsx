import {
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InputFile from "../components/utils/inputFile";
import { RegisterReq } from "../types/api";
import ColorModeButton from "./../components/utils/colorModeButton";

const Register = () => {
  const { colorMode } = useColorMode();
  const [formData, setFormData] = useState<RegisterReq>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [file, setFile] = useState<File>();
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  // Form Validation
  useEffect(() => {
    if (formData.confirmPassword !== formData.password) {
      setError((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
    } else {
      setError((e) => ({ ...e, confirmPassword: "" }));
    }
  }, [formData]);

  // TODO: add api calls then redirect to login page
  const handleSubmit = () => {
    console.log({ formData, file });
  };

  return (
    <Center minH="100vh" w="100%">
      <ColorModeButton position="absolute" top="1rem" right="1rem" />
      <VStack
        p={8}
        gap={2}
        borderRadius="3xl"
        bg={colorMode === "dark" ? "teal.800" : "teal.300"}
      >
        <Heading>Register</Heading>
        <FormControl isInvalid={!!error.username}>
          <FormLabel>Username</FormLabel>
          <Input
            bg="white"
            color="black"
            onChange={(e) => {
              setFormData((formData) => ({
                ...formData,
                username: e.target.value,
              }));
            }}
          />
        </FormControl>
        <FormControl isInvalid={!!error.password}>
          <FormLabel>Password</FormLabel>
          <Input
            bg="white"
            color="black"
            onChange={(e) => {
              setFormData((formData) => ({
                ...formData,
                password: e.target.value,
              }));
            }}
            type="password"
          />
        </FormControl>
        <FormControl isInvalid={!!error.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            bg="white"
            color="black"
            onChange={(e) => {
              setFormData((formData) => ({
                ...formData,
                confirmPassword: e.target.value,
              }));
            }}
            type="password"
          />
          {error.confirmPassword && (
            <FormHelperText color={colorMode === "dark" ? "white" : "red"}>
              {error.confirmPassword}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl>
          <FormLabel mr={0} textAlign={"center"}>
            {"ID Card (KTP)"}
          </FormLabel>
          <InputFile
            accept="image/*"
            w="100%"
            onChange={(e: any) => {
              setFile(e.target.files[0]);
            }}
          />
        </FormControl>
        <Flex w="100%">
          <FormControl w="min-content">
            <Button
              colorScheme={colorMode === "dark" ? "yellow" : "red"}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </FormControl>
          <Flex flexDir={"column"} ml={8}>
            <Text my={-1}>Or you can</Text>
            <Link fontWeight={"bold"} href={"/login"}>
              Login
            </Link>
          </Flex>
        </Flex>
      </VStack>
    </Center>
  );
};

export default Register;
