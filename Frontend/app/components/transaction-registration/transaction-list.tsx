import List from "../common/list";
import { useEffect } from "react";
import TransactionCard from "./transaction-card";
import { useTransactionFormContext } from "~/contexts/transaction-form-context";

export default function TransactionList() {
    const { transactions, findTransactions } = useTransactionFormContext();
    
    useEffect(() => {
        (async () => {
            await findTransactions();
        })()
    },[]);
    
    return <div className="flex gap-3.5  w-full flex-wrap flex-row">
		<List items={transactions} itemProp="transaction" compoenent={TransactionCard}></List>
	</div>
}