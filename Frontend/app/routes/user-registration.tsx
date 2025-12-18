import { UserForm } from "~/components/user-registration/user-form";
import { useEffect, useState } from "react";
import type { MetaArgs } from "react-router";
import { Button } from "~/components/ui/button";
import { getUsers } from "~/apis/UserApi";
import UserCard from "~/components/user-registration/user-card";
import List from "~/components/common/list";
import UserFormProvider, { UserFormContext } from "~/contexts/user-form-context";
import UserList from "~/components/user-registration/user-list";

export function meta({ }: MetaArgs) {
	return [
		{ title: "Cadastrar Usuários" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function UserRegistration() {
	const [formState, setFormState] = useState<"Add" | "Edit" | "Closed">(
		"Closed"
	);

	return (
		<UserFormProvider>
		<main className="p-10">
			<UserForm state={formState} onClose={() => setFormState("Closed")} />
			<Button className="mb-5" variant={"outline"} onClick={() => setFormState("Add")}>
				Adicionar Usuário
			</Button>
			<UserList/>
		</main>
		</UserFormProvider>
	);
}
