import {
  ApproveRequestRes,
  CurrenciesRes,
  LoginRes,
  RegisterRes,
  RejectRequestRes,
  Res,
  SelfDataRes,
  TransactionRes,
  TransactionsRes,
  UsersRes,
  VerifyRes,
} from "../types/api";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const register = async (
  username: string,
  password: string,
  photoID: File | undefined
): Promise<Res<RegisterRes>> => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  if (photoID) {
    formData.append("photoid", photoID);
  }
  const res: Res<RegisterRes> = await api.post("/auth/register", formData);
  return res;
};

export const login = async (
  username: string,
  password: string
): Promise<Res<LoginRes>> => {
  const res: Res<LoginRes> = await api
    .post("/auth/login", {
      username,
      password,
    })
    .then((response) => response.data);
  return res;
};

export const getSelfData = async (
  token: string | null
): Promise<Res<SelfDataRes>> => {
  const res: Res<SelfDataRes> = await api
    .get("/self", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const getSelfTransactions = async (
  token: string | null
): Promise<Res<TransactionsRes>> => {
  const res: Res<TransactionsRes> = await api
    .get("/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const transfer = async (
  to: string,
  description: string,
  amount: number,
  token: string | null
): Promise<Res<TransactionRes>> => {
  const res: Res<TransactionRes> = await api
    .post(
      "/transaction/transfer",
      {
        to,
        description,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
  return res;
};

export const requestBalance = async (
  currency: string,
  amount: number,
  token: string | null
): Promise<Res<TransactionRes>> => {
  const res: Res<TransactionRes> = await api
    .post(
      "/transaction/request-balance",
      {
        currency,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
  return res;
};

export const getCurrencies = async (
  token: string | null
): Promise<Res<CurrenciesRes>> => {
  const res: Res<CurrenciesRes> = await api
    .get("/transaction/currency", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const getUsers = async (
  token: string | null
): Promise<Res<UsersRes>> => {
  const res: Res<UsersRes> = await api
    .get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const verifyUser = async (
  userId: string,
  token: string | null
): Promise<Res<VerifyRes>> => {
  const res: Res<VerifyRes> = await api
    .put(
      `/admin/users/${userId}/verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
  return res;
};

export const getRequests = async (
  token: string | null
): Promise<Res<TransactionsRes>> => {
  const res: Res<TransactionsRes> = await api
    .get("/admin/transaction", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return res;
};

export const approveRequest = async (
  id: string,
  token: string | null
): Promise<Res<ApproveRequestRes>> => {
  const res: Res<ApproveRequestRes> = await api
    .post(
      `/admin/transaction/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);
  return res;
};

export const rejectRequest = async (
  id: string,
  token: string | null
): Promise<Res<RejectRequestRes>> => {
  const res: Res<RejectRequestRes> = await api
    .post(
      `/admin/transaction/${id}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => response.data);

  return res;
};

export const rejectStub = async (): Promise<any> => {
  return Promise.reject({
    isError: true,
    message: "Reject Stub",
  });
};

const currency = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTC",
  "BTN",
  "BWP",
  "BYN",
  "BYR",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KMF",
  "KPW",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LTL",
  "LVL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRO",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLL",
  "SOS",
  "SRD",
  "STD",
  "SVC",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XAG",
  "XAU",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMK",
  "ZMW",
  "ZWL",
];
const TransactionData = [
  {
    id: "1",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "2",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "3",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "4",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "5",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "6",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "7",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
  {
    id: "8",
    from: "rifqi2320",
    to: "rifqinaufal20",
    description: "Transfer to rifqinaufal20",
    amount: 1,
    approved: false,
    approvedAt: null,
    createdAt: new Date(),
  },
];
