import { CategoryForm } from "~/components/category-registration/category-form";
import {  useState } from "react";
import type { MetaArgs } from "react-router";
import { Button } from "~/components/ui/button";
import CategoryFormProvider from "~/contexts/category-form-context";
import CategoryList from "~/components/category-registration/category-list";

export function meta({ }: MetaArgs) {
	return [
		{ title: "Cadastrar Categoria" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function CategoryRegistration() {
	const [formState, setFormState] = useState<"Add" | "Edit" | "Closed">(
		"Closed"
	);

	return (
		<CategoryFormProvider>
			<main className="p-10 w-full">
				<CategoryForm state={formState} onClose={() => setFormState("Closed")} />
				<Button className="mb-5" variant={"outline"} onClick={() => setFormState("Add")}>
					Adicionar Categoria
				</Button>
				<CategoryList/>
			</main>
		</CategoryFormProvider>
	);
}
