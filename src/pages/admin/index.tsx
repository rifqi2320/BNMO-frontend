import { Flex, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layouts/sidebar";
import { useAuth } from "../../context/auth";
import { getRequests, getUsers } from "../../lib/api";
import { Transaction, User } from "../../types/models";

const Admin = () => {
  const { isLoading, user, token } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [requests, setRequests] = useState<Transaction[] | null>(null);
  const revalidateRequests = async () => {
    setRequests(null);
    await getRequests(token).then((res) => {
      if (!res.isError && res.data) {
        setRequests(res.data.transactions);
      }
    });
  };

  const [users, setUsers] = useState<User[] | null>(null);
  const revalidateUsers = async () => {
    setUsers(null);
    await getUsers(token).then((res) => {
      if (!res.isError && res.data) {
        setUsers(res.data.users);
      }
    });
  };

  useEffect(() => {
    if (!users) {
      revalidateUsers();
    }
    if (!requests) {
      revalidateRequests();
    }

    if (!isLoading && user?.role !== "ADMIN") {
      if (user?.role === "USER") {
        navigate("/user");
        return;
      }
      navigate("/login");
      return;
    }
  });

  return (
    <Flex flexDir={"row"}>
      <Sidebar />
      <Outlet
        context={{ requests, revalidateRequests, users, revalidateUsers }}
      />
    </Flex>
  );
};

export default Admin;
