import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { getTransactions } from "~/apis/TransactionApi copy";

interface ContextProp {
    setTransactionToEdit: Function
    transactionToEdit: null | Transaction,
    findTransactions: Function,
    transactions:Transaction[]
}

export const TransactionFormContext = createContext<ContextProp>({setTransactionToEdit: () => {}, transactionToEdit:null, findTransactions: ()=>{}, transactions:[]});

export default function TransactionFormProvider ({ children }: { children: ReactNode }) {

    const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);

    const [transactions, setTransactions] = useState<Transaction[]>([]);

	const findTransactions = useCallback(() => {
		(async () => {
			const res = await getTransactions();
			setTransactions(res?.data ?? []);
		})();
	}, []);

    return (
        <TransactionFormContext value={{setTransactionToEdit, transactionToEdit, transactions, findTransactions}}>
            {children}
        </TransactionFormContext>
    );
};

export const useTransactionFormContext = () => {
    return useContext(TransactionFormContext);
}