import List from "../common/list";
import { useEffect } from "react";
import CategoryCard from "./category-card";
import { useCategoryFormContext } from "~/contexts/category-form-context";

export default function CategoryList() {
    const { categories, findCategories } = useCategoryFormContext();
    
    useEffect(() => {
        (async () => {
            await findCategories();
        })()
    },[]);
    
    return <div className="flex gap-3.5  w-full flex-wrap flex-row">
		<List items={categories} itemProp="category" compoenent={CategoryCard}></List>
	</div>
}