import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Spacer,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import TransactionTable from "../../components/tables/transactionTable";
import { useAuth } from "../../context/auth";
import { transfer } from "../../lib/api";
import { UserContext } from "../../types/context";

const Transfer = () => {
  const { data, revalidate } = useOutletContext<UserContext>();
  const toast = useToast();
  const [formData, setFormData] = useState({
    amount: 0,
    to: "",
    description: "",
  });
  const { token } = useAuth();
  const handleSubmitTransfer = async () => {
    if (formData.amount > 0 && formData.to) {
      await transfer(formData.to, formData.description, formData.amount, token)
        .then((res) => {
          if (!res.isError && res.data) {
            revalidate();
            toast({
              title: "Success",
              description: res.message,
              status: "success",
            });
            setFormData({ ...formData, amount: 0 });
          }
        })
        .catch((err) => {
          if (err.message) {
            toast({
              title: "Error",
              description: err.message,
              status: "error",
            });
          } else {
            toast({
              title: "Error",
              description: "Something went wrong",
              status: "error",
            });
          }
        });
    } else {
      if (!formData.to) {
        toast({
          title: "Error",
          description: "Please enter a valid recipient",
          status: "error",
        });
      } else if (formData.amount <= 0) {
        toast({
          title: "Error",
          description: "Amount must be greater than 0",
          status: "error",
        });
      }
    }
  };

  return (
    <>
      <Stack p={4} direction={["column", "column", "row"]}>
        <VStack p={[0, 0, 4, 6]} w="100%">
          <FormControl>
            <FormLabel w="100%">Amount</FormLabel>
            <InputGroup>
              <InputLeftAddon children="Rp." />
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    amount: parseInt(e.target.value),
                  });
                }}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel w="100%">To</FormLabel>
            <Input
              value={formData.to}
              onChange={(e) => {
                setFormData({ ...formData, to: e.target.value });
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel w="100%">Description</FormLabel>
            <Input
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </FormControl>
          <FormControl>
            <Flex mt={1}>
              <Spacer />
              <Button onClick={() => handleSubmitTransfer()}>Transfer</Button>
            </Flex>
          </FormControl>
        </VStack>
        <TransactionTable
          transactions={data}
          cols={["createdAt", "amount", "to"]}
        />
      </Stack>
    </>
  );
};

export default Transfer;
