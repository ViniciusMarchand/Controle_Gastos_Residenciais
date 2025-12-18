import { useEffect, useState } from "react";
import type { MetaArgs } from "react-router";
import { getCategoriesDetails } from "~/apis/CategoryApi";
import CategoryDetailsCard from "~/components/category-transaction-details/category-details-card";
import List from "~/components/common/list";
import { Label } from "~/components/ui/label";


export function meta({ }: MetaArgs) {
	return [
		{ title: "Detalhes das transações de usuários" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function CategoryTransactionDetails() {

    const [categoryDetails, setCategoriesDetails] = useState<CategoryDetailsResponseDTO>();

    useEffect(() => {
        (async () => {
            const res = await getCategoriesDetails();
            setCategoriesDetails(res?.data);
        })()
    },[])

	return (
        categoryDetails ? 
            <main className="px-3.5">
                <div className="flex flex-col w-full items-center py-3.5">
                    <Label className="text-2xl">Total de Despesas: R$ {categoryDetails.totalExpense}</Label>
                    <Label className="text-2xl">Total de Receita: R$ {categoryDetails.totalIncome}</Label>
                    <Label className="text-2xl">Total: R$ {categoryDetails.totalBalance}</Label>
                </div>
                <div className="flex flex-wrap gap-3.5">
                    <List items={categoryDetails.categoriesDetails} itemProp="details" compoenent={CategoryDetailsCard}/>
                </div>
            </main>
            :
            <div>Carregando...</div>
    );
}
