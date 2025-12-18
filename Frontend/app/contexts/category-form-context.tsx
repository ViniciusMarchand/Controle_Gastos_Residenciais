import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { getCategories } from "~/apis/CategoryApi";

interface ContextProp {
    setCategoryToEdit: Function
    categoryToEdit: null | Category,
    findCategories: Function,
    categories:Category[]
}

export const CategoryFormContext = createContext<ContextProp>({setCategoryToEdit: () => {}, categoryToEdit:null, findCategories: ()=>{}, categories:[]});

export default function CategoryFormProvider ({ children }: { children: ReactNode }) {

    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);

	const findCategories = useCallback(() => {
		(async () => {
			const res = await getCategories();
			setCategories(res?.data ?? []);
		})();
	}, []);

    return (
        <CategoryFormContext value={{setCategoryToEdit, categoryToEdit, categories, findCategories}}>
            {children}
        </CategoryFormContext>
    );
};

export const useCategoryFormContext = () => {
    return useContext(CategoryFormContext);
}