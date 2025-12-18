import { Label } from "../ui/label"

interface Props {
    details: CategoryResponseDTO
}

export default function CategoryDetailsCard({ details } : Props) {
    const { balance, income, category, expense } = details;
    const { description } = category;

  return <div className="border shadow-2xl bg-background w-[350px] max-w-[500px] min-h-36 flex flex-col justify-center p-3 gap-4 rounded-md">
        <Label className="text-md break-all whitespace-normal">
            Descrição: {description}</Label>
        <Label className="text-md">Despesas: R$ {expense}</Label>
        <Label className="text-md">Renda: R$ {income}</Label>
        <Label className="text-md">Total: R$ {balance}</Label>
    </div>
}