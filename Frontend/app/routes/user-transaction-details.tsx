import { useEffect, useState } from "react";
import type { MetaArgs } from "react-router";
import { getUsersDetails } from "~/apis/UserApi";
import List from "~/components/common/list";
import { Label } from "~/components/ui/label";
import UserDetailsCard from "~/components/user-transaction-details/user-details-card";


export function meta({ }: MetaArgs) {
	return [
		{ title: "Detalhes das transações de usuários" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function UserTransactionDetails() {

    const [userDetails, setUsersDetails] = useState<UserDetailsResponseDTO>();

    useEffect(() => {
        (async () => {
            const res = await getUsersDetails();
            setUsersDetails(res?.data);
        })()
    },[])

	return (
        userDetails ? 
            <main className="px-3.5">
                <div className="flex flex-col w-full items-center py-3.5">
                    <Label className="text-2xl">Total de Despesas: R$ {userDetails.totalExpense}</Label>
                    <Label className="text-2xl">Total de Receita: R$ {userDetails.totalIncome}</Label>
                    <Label className="text-2xl">Total: R$ {userDetails.totalBalance}</Label>
                </div>
                <div className="flex flex-wrap gap-3.5">
                    <List items={userDetails.usersDetails} itemProp="details" compoenent={UserDetailsCard}/>
                </div>
            </main>
            :
            <div>Carregando...</div>
    );
}
