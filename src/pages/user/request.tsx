import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spacer,
  Stack,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TransactionTable from "../../components/tables/transactionTable";
import { useAuth } from "../../context/auth";
import { getCurrencies, requestBalance } from "../../lib/api";
import { UserContext } from "../../types/context";

const Request = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, revalidate } = useOutletContext<UserContext>();
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    amount: 0,
    currency: "",
  });
  const { token } = useAuth();
  const handleSubmitRequest = async () => {
    if (formData.amount > 0) {
      await requestBalance(formData.currency, formData.amount, token)
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
      toast({
        title: "Error",
        description: "Amount must be greater than 0",
        status: "error",
      });
    }
  };

  useState(() => {
    getCurrencies(token)
      .then((res) => {
        if (res.isError || !res.data) {
          throw new Error(res.message);
        }
        setCurrencies(res.data.currencies);
      })
      .catch((err) => {
        navigate("/user/request");
      });
  });
  return (
    <>
      <Stack p={4} direction={["column", "column", "row"]}>
        <VStack p={[0, 0, 4, 6]} w="100%">
          <Flex w="100%">
            <FormControl w="min-content" mr={2}>
              <FormLabel w="100%">Currency</FormLabel>
              <Select
                w={24}
                value={formData.currency}
                onChange={(e) => {
                  setFormData({ ...formData, currency: e.target.value });
                }}
              >
                {currencies.map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel w="100%">Amount</FormLabel>
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
            </FormControl>
          </Flex>
          <FormControl>
            <Flex mt={1}>
              <Spacer />
              <Button onClick={() => handleSubmitRequest()}>Request</Button>
            </Flex>
          </FormControl>
        </VStack>

        <TransactionTable
          transactions={data}
          cols={["createdAt", "amount", "approved"]}
        />
      </Stack>
    </>
  );
};

export default Request;
