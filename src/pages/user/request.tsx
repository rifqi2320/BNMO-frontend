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
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TransactionTable from "../../components/tables/transactionTable";
import { useAuth } from "../../context/auth";
import { getCurrencies, requestBalance } from "../../lib/api";
import { UserContext } from "../../types/context";
import { Transaction } from "../../types/models";

const Request = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { data, revalidate } = useOutletContext<UserContext>();
  const { revalidateUser } = useAuth();
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    amount: "",
    currency: "",
  });
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const { token } = useAuth();
  const handleSubmitRequesta = async () => {
    revalidateUser();
    revalidate();
  };
  const handleSubmitRequest = async () => {
    if (isNaN(parseInt(formData.amount))) {
      toast({
        title: "Error",
        description: "Amount must be a number",
        status: "error",
      });
      return;
    }

    if (parseInt(formData.amount) !== 0) {
      await requestBalance(formData.currency, parseInt(formData.amount), token)
        .then((res) => {
          if (!res.isError && res.data) {
            revalidate();
            toast({
              title: "Success",
              description: res.message,
              status: "success",
            });
            setFormData({ ...formData, amount: "" });
          }
        })
        .catch((err) => {
          if (err.response.data.message) {
            toast({
              title: "Error",
              description: err.response.data.message,
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

  useEffect(() => {
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

    if (data) {
      setFilteredData(data.filter((item) => !item.from));
    }
  }, [data, navigate, token]);

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
                value={formData.amount}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    amount: e.target.value,
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
          transactions={filteredData}
          cols={["createdAt", "amount", "approved"]}
        />
      </Stack>
    </>
  );
};

export default Request;
