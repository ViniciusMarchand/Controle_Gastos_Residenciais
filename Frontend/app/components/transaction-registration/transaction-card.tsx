import { useContext } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label"
import { useTransactionFormContext } from "~/contexts/transaction-form-context";
import { deleteTransaction } from "~/apis/TransactionApi copy";

interface Props {
    transaction: Transaction
}

export default function TransactionCard({ transaction } : Props) {    
    const {id, description, type, value, categoryDescription, userName} = transaction;

    const { setTransactionToEdit, findTransactions } = useTransactionFormContext();

    const removeTransaction = async () => {
        await deleteTransaction(id);
        await findTransactions();
    }

    const handleTransactionType = (tipo: string | number) => {
        if(typeof(tipo) === 'string') {
            tipo = parseInt(tipo);
        }

        switch(tipo) {
            case 0:
                return "Despesa";
            case 1: 
                return "Renda";
        }
    }

  return <div className="border shadow-2xl bg-background w-[350px] max-w-[500px] min-h-36 flex flex-col justify-center p-3 gap-4 rounded-md">
    <Label className="text-md break-all whitespace-normal">
      Descrição: {description}
    </Label>
    <Label className="text-md break-all whitespace-normal">
      Valor: R$ {value}
    </Label>
    <Label className="text-md break-all whitespace-normal">
      Usuário: {userName}
    </Label>
    <Label className="text-md break-all whitespace-normal">
      Categoria: {categoryDescription}
    </Label>
    <Label className="text-md">Tipo: {handleTransactionType(type)}</Label>

        <div>
            <Button variant={'outline'} onClick={() => setTransactionToEdit(transaction)}>Editar</Button>
            <Button variant={'outline'} onClick={() => removeTransaction()}>Deletar</Button>
        </div>
    </div>
}