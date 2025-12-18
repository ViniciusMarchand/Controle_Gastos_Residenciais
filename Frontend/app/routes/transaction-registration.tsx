import {  useState } from "react";
import type { MetaArgs } from "react-router";
import { TransactionForm } from "~/components/transaction-registration/transaction-form";
import TransactionList from "~/components/transaction-registration/transaction-list";
import { Button } from "~/components/ui/button";
import TransactionFormProvider from "~/contexts/transaction-form-context";

export function meta({ }: MetaArgs) {
	return [
		{ title: "Cadastrar Transação" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function CategoryRegistration() {
	const [formState, setFormState] = useState<"Add" | "Edit" | "Closed">(
		"Closed"
	);

	return (
		<TransactionFormProvider>
			<main className="p-10 w-full">
				<TransactionForm state={formState} onClose={() => setFormState("Closed")} />
				<Button className="mb-5" variant={"outline"} onClick={() => setFormState("Add")}>
					Adicionar Transação
				</Button>
				<TransactionList/>
			</main>
		</TransactionFormProvider>
	);
}
