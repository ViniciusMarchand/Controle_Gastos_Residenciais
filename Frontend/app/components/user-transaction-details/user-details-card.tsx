import { Label } from "../ui/label"

interface Props {
    details: UserResponseDTO
}

export default function UserDetailsCard({ details } : Props) {
    const { balance, income, user, expense } = details;
    const { name, age } = user;

  return <div className="border shadow-2xl bg-background w-[350px] max-w-[500px] min-h-36 flex flex-col justify-center p-3 gap-4 rounded-md">
        <Label className="text-md break-all whitespace-normal">
            Nome: {name}
        </Label>
        <Label className="text-md">idade: {age}</Label>
        <Label className="text-md">Despesas: R$ {expense}</Label>
        <Label className="text-md">Renda: R$ {income}</Label>
        <Label className="text-md">Total: R$ {balance}</Label>
    </div>
}