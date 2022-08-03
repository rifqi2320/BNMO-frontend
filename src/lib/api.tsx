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

export const register = async (
  username: string,
  password: string,
  photoID: File | null
): Promise<Res<RegisterRes>> => {
  let res: Res<RegisterRes>;
  res = {
    isError: false,
    message: "Register Success",
    data: {
      user: {
        id: "cl67lnui200069jpl73ij4jfs",
        username: "naufal",
      },
    },
  };
  return res;
};

export const login = async (
  username: string,
  password: string
): Promise<Res<LoginRes>> => {
  let res: Res<LoginRes>;
  if (username === "admin" && password === "admin") {
    res = {
      isError: false,
      message: "Login Successful",
      data: {
        token: "admin-token",
        user: {
          id: "admin",
          username: "admin",
          photoID: "",
          balance: 0,
          isVerified: true,
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };
  } else if (username === "user" && password === "user") {
    res = {
      isError: false,
      message: "Login Successful",
      data: {
        token: "user-token",
        user: {
          id: "user",
          username: "user",
          photoID: "",
          balance: 0,
          isVerified: true,
          role: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };
  } else {
    res = {
      isError: true,
      message: "Login Failed",
      data: null,
    };
  }
  return res;
};

export const getSelfData = async (
  token: string | null
): Promise<Res<SelfDataRes>> => {
  let res: Res<SelfDataRes>;
  if (token === "admin-token") {
    res = {
      isError: false,
      message: "Get Self Data Successful",
      data: {
        user: {
          id: "admin",
          username: "admin",
          photoID: "",
          balance: 0,
          isVerified: true,
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };
  } else {
    res = {
      isError: false,
      message: "Get Self Data Successful",
      data: {
        user: {
          id: "user",
          username: "user",
          photoID: "",
          balance: 0,
          isVerified: true,
          role: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    };
  }
  return res;
};

export const getSelfTransactions = async (
  token: string | null
): Promise<Res<TransactionsRes>> => {
  let res: Res<TransactionsRes>;
  res = {
    isError: false,
    message: "Get Self Transactions Successful",
    data: {
      transactions: TransactionData,
    },
  };
  return res;
};

export const transfer = async (
  to: string,
  description: string,
  amount: number,
  token: string | null
): Promise<Res<TransactionRes>> => {
  let res: Res<TransactionRes>;
  res = {
    isError: false,
    message: "Transfer Success",
    data: {
      transaction: {
        id: "cl67m3kyi0152cxn68a4b6yof",
        from: "cl67f3g6x0005awpvkigw9xqo",
        to: "naufal",
        description: null,
        amount: 1,
        approved: true,
        approvedAt: null,
        createdAt: new Date(),
      },
    },
  };
  return res;
};

export const requestBalance = async (
  currency: string,
  amount: number,
  token: string | null
): Promise<Res<TransactionRes>> => {
  let res: Res<TransactionRes>;
  res = {
    isError: false,
    message: "Request Balance Success",
    data: {
      transaction: {
        id: "cl67lxhg80053cxn68q7drfst",
        from: null,
        to: "cl67f3g6x0005awpvkigw9xqo",
        description: "Request Balance 15 USD",
        amount: 222230.9995236256,
        approved: false,
        approvedAt: null,
        createdAt: new Date(),
      },
    },
  };
  return res;
};

export const getCurrencies = async (
  token: string | null
): Promise<Res<CurrenciesRes>> => {
  let res: Res<CurrenciesRes>;
  res = {
    isError: false,
    message: "Get Currencies Success",
    data: {
      currencies: currency,
    },
  };
  return res;
};

export const getUsers = async (
  token: string | null
): Promise<Res<UsersRes>> => {
  let res: Res<UsersRes>;
  res = {
    isError: false,
    message: "Get Users Success",
    data: {
      users: [
        {
          id: "cl67f3g6x0005awpvkigw9xqo",
          username: "iqi",
          role: "USER",
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "cl67lnui200069jpl73ij4jfs",
          username: "naufal",
          role: "USER",
          isVerified: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    },
  };
  return res;
};

export const verifyUser = async (
  userId: string,
  token: string | null
): Promise<Res<VerifyRes>> => {
  let res: Res<VerifyRes>;
  res = {
    isError: false,
    message: "Verify User Success",
    data: {
      user: {
        id: "cl67f3g6x0005awpvkigw9xqo",
        username: "iqi",
        role: "USER",
        isVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  };
  return res;
};

export const getRequests = async (
  token: string | null
): Promise<Res<TransactionsRes>> => {
  let res: Res<TransactionsRes>;
  res = {
    isError: false,
    message: "Get Transactions Success",
    data: {
      transactions: [
        {
          id: "cl67lxhg80053cxn68q7drfst",
          from: null,
          to: "rifqi2320",
          description: "Request Balance 15 USD",
          amount: 222230.9995236256,
          approved: false,
          approvedAt: null,
          createdAt: new Date(),
        },
      ],
    },
  };
  return res;
};

export const approveRequest = async (
  id: string,
  token: string | null
): Promise<Res<ApproveRequestRes>> => {
  let res: Res<ApproveRequestRes>;
  res = {
    isError: false,
    message: "Approve Request Balance Success",
    data: {
      transactionApproved: {
        id: "cl67lxhg80053cxn68q7drfst",
        from: null,
        to: "rifqi2320",
        description: "Request Balance 15 USD",
        amount: 222230.9995236256,
        approved: true,
        approvedAt: new Date(),
        createdAt: new Date(),
      },
    },
  };
  return res;
};

export const rejectRequest = async (
  id: string,
  token: string | null
): Promise<Res<RejectRequestRes>> => {
  let res: Res<RejectRequestRes>;
  res = {
    isError: false,
    message: "Delete Transaction Success",
    data: {
      deletedTransaction: {
        id: "cl67m0sfr0112cxn6nx4rxxtv",
        from: null,
        to: "rifqi2320",
        description: "Request Balance -1 USD",
        amount: -14815.39996824171,
        approved: false,
        approvedAt: null,
        createdAt: new Date(),
      },
    },
  };
  return res;
};

export const rejectStub = async (): Promise<any> => {
  return Promise.reject({
    isError: true,
    message: "Reject Stub",
  });
};
