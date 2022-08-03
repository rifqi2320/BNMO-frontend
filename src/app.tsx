import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages";
import Admin from "./pages/admin";
import Requests from "./pages/admin/requests";
import Users from "./pages/admin/users";
import Login from "./pages/login";
import Register from "./pages/register";
import User from "./pages/user";
import History from "./pages/user/history";
import Request from "./pages/user/request";
import Transfer from "./pages/user/transfer";
import theme from "./styles/chakra";
import { AuthProvider } from "./context/auth";

// Routes in application
export const App = () => (
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="user" element={<User />}>
            <Route path="history" element={<History />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="request" element={<Request />} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="users" element={<Users />} />
            <Route path="requests" element={<Requests />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  </ChakraProvider>
);
