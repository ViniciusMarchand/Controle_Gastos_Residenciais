import { useContext } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label"
import { useCategoryFormContext } from "~/contexts/category-form-context";
import { deleteCategory } from "~/apis/CategoryApi";

interface Props {
    category: Category
}

export default function CategoryCard({ category } : Props) {    
    const {id, description, type} = category;

    const { setCategoryToEdit, findCategories } = useCategoryFormContext();

    const removeCategory = async () => {
        await deleteCategory(id);
        await findCategories();
    }

    const handleCategoryType = (tipo: string | number) => {
        if(typeof(tipo) === 'string') {
            tipo = parseInt(tipo);
        }

        switch(tipo) {
            case 0:
                return "Despesa";
            case 1: 
                return "Renda";
            case 2: 
                return "Ambos";
        }
    }

  return <div className="border shadow-2xl bg-background w-[350px] max-w-[500px] min-h-36 flex flex-col justify-center p-3 gap-4 rounded-md">
    <Label className="text-md break-all whitespace-normal">
      Descrição: {description}
    </Label>
    <Label className="text-md">Tipo: {handleCategoryType(type)}</Label>

        <div>
            <Button variant={'outline'} onClick={() => setCategoryToEdit(category)}>Editar</Button>
            <Button variant={'outline'} onClick={() => removeCategory()}>Deletar</Button>
        </div>
    </div>
}