export type ClerkError = {
  status: number;
  clerkError: boolean;
  errors: {
    code: string;
    message: string;
    longMessage: string;
  }[];
};

export type SignUpForm = {
  email: string;
  password: string;
  code: string;
};

export type SignInForm = {
  email: string;
  password: string;
};

export enum ExpenseType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type Transaction = {
  id: string;
  type: ExpenseType;
  amount: number;
  date: Date;
  category: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TransactionSummary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type CreateTransactionData = {
  amount: number;
  type: ExpenseType;
  category: string;
  date: Date;
  description?: string;
};
